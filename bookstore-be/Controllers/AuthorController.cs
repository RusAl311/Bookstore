using bookstore_be.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookstore_be.Controllers;

[ApiController]
public class AuthorController: ControllerBase
{
    private readonly DatabaseContext _databaseContext;
    public AuthorController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext; 
    }
    
    // Gel all authors
    [EnableCors]
    [HttpGet]
    [Route("/api/author/all")]
    public async Task<IActionResult> GetAsync()
    {

        var authors = await _databaseContext.Authors.ToListAsync();
        if (authors == null)
        {
            return NotFound();
        }
        else return Ok(authors);
    
    }

    // Get a author by id
    [EnableCors]
    [HttpGet]
    [Route("/api/author/{id}")]
    public async Task<IActionResult> GetAuthorById(int id)
    {
        var author = await _databaseContext.Authors.FindAsync(id);
        if (author == null)
        {
            return NotFound();
        }
        return Ok(author);
    }

    // Create a new author
    [EnableCors]
    [HttpPost]
    [Route("/api/author/add")]
    public async Task<IActionResult> PostAuthorAsync(Author author)
    {
        _databaseContext.Authors.Add(author);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }

    // Update the author 
    [EnableCors]
    [HttpPut]
    [Route("/api/author/update/{id}")]
    public async Task<IActionResult> PutAuthorAsync(Author authorToUpdate)
    {
        _databaseContext.Authors.Update(authorToUpdate);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }

    // Delete the author
    [EnableCors]
    [HttpDelete]
    [Route("/api/author/delete/{id}")]
    public async Task<IActionResult> DeleteAuthorAsync(int id)
    {
        var authorToDelete = await _databaseContext.Authors.FindAsync(id);
        if (authorToDelete == null)
        {
            return NotFound();
        }
        _databaseContext.Authors.Remove(authorToDelete);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }


}