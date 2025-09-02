using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();

  
        return Ok(basket.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket([FromQuery] int productId, [FromQuery] int quantity)
    {
        var basket = await RetrieveBasket();

        basket ??= CreateBasket();

        var product = await context.Products.FindAsync(productId);

        if(product == null) return BadRequest(new ProblemDetails { Title = "Problem adding item to basket" });

        basket.AddItem(product, quantity);
        
        var result = await context.SaveChangesAsync();

        if(result <= 0) return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });

        return CreatedAtAction(nameof(GetBasket), basket.ToDto());      
    }

    [HttpDelete]
    public async Task<ActionResult<Basket>> RemoveItemFromBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if(basket == null) return BadRequest(new ProblemDetails { Title = "Basket not found" });

        basket.RemoveItem(productId, quantity);

        var result = await context.SaveChangesAsync();

        if(result <= 0) return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });

        return Ok();
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(30) };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
        .Include(b => b.Items)
        .ThenInclude(i => i.Product)
        .FirstOrDefaultAsync(b => b.BasketId == Request.Cookies["basketId"]);
    }
}
