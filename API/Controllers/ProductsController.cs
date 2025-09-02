using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController(StoreContext context) : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts(
        [FromQuery] ProductParams product
    )
    {
        var query = context.Products
        .Sort(product.OrderBy)
        .Search(product.SearchTerm)
        .Filter(product.Brands, product.Types)
        .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query, product.PageNumber, product.PageSize);

        Response.AddPaginationHeader(products.MetaData);

        return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id) //api/products/1
    {
        var product = await context.Products.FindAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();    

        return Ok(new {brands, types});
    }


}

