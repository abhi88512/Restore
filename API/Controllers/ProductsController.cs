using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController(StoreContext context) : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return await context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id) //api/products/1
    {
        var product = await context.Products.FindAsync(id);

        if (product == null) return NotFound();

        return product;
    }
}

