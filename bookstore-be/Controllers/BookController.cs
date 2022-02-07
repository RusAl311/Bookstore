using bookstore_be.Data;
using bookstore_be.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookstore_be.Controllers;

[ApiController]
public class BookController: ControllerBase
{
    private readonly DatabaseContext _databaseContext;
    public BookController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext; 
    }
    
    // Gel all books
    [HttpGet]
    [Route("/api/book/all")]
    public async Task<IActionResult> GetAsync()
    {

        var books = await _databaseContext.Books.Include(b => b.Author).ToListAsync();
        if (books == null)
        {
            return NotFound();
        }
        return Ok(books);
    
    }

    // Get a book by id
    [HttpGet]
    [Route("/api/book/{id}")]
    public async Task<IActionResult> GetBookById(int id)
    {
        var book = await _databaseContext.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }

    // Create a new book
    [HttpPost]
    [Route("/api/book/add")]
    public async Task<IActionResult> PostBookAsync(BookPostDto request)
    {
        var author = await _databaseContext.Authors.FindAsync(request.Author.AuthorId);
        if (author == null)
        {
            return NotFound();
        }

        var newBook = new Book
        {
            Name = request.Name,
            Description = request.Description,
            Pages = request.Pages,
            Author = author,
            Genres = new List<Genre>()
        };
        foreach (var genre in request.Genres)
        {
            newBook.Genres.FirstOrDefault(genre);
        }
        _databaseContext.Books.Add(newBook);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }

    // Update the book 
    [HttpPut]
    [Route("/api/book/update/{id}")]
    public async Task<IActionResult> PutBookAsync(Book bookToUpdate)
    {

        _databaseContext.Books.Update(bookToUpdate);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }

    // Delete the book
    [HttpDelete]
    [Route("/api/book/delete/{id}")]
    public async Task<IActionResult> DeleteBookAsync(int id)
    {
        var bookToDelete = await _databaseContext.Books.FindAsync(id);
        if (bookToDelete == null)
        {
            return NotFound();
        }
        _databaseContext.Books.Remove(bookToDelete);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }


}