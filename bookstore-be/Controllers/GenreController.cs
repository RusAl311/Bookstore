using bookstore_be.Data;
using bookstore_be.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookstore_be.Controllers;

[ApiController]
public class GenreController: ControllerBase
{
    private readonly DatabaseContext _databaseContext;
    public GenreController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext; 
    }
    
    // Gel all genres
    [HttpGet]
    [Route("/api/genre/all")]
    public async Task<IActionResult> GetAsync()
    {

        var genres = await _databaseContext.Genres.ToListAsync();
        if (genres == null)
        {
            return NotFound();
        }
        else return Ok(genres);
    
    }

    // Get a genre by id
    [HttpGet]
    [Route("/api/genre/{id}")]
    public async Task<IActionResult> GetGenreById(int id)
    {
        var genre = await _databaseContext.Genres.FindAsync(id);
        if (genre == null)
        {
            return NotFound();
        }
        return Ok(genre);
    }

    // Create a new genre
    [HttpPost]
    [Route("/api/genre/add")]
    public async Task<IActionResult> PostGenreAsync(Genre genre)
    {
        _databaseContext.Genres.Add(genre);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }

    // Update the genre 
    [HttpPut]
    [Route("/api/genre/update/{id}")]
    public async Task<IActionResult> PutGenreAsync(Genre genreToUpdate)
    {
        _databaseContext.Genres.Update(genreToUpdate);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }

    // Delete the genre
    [HttpDelete]
    [Route("/api/genre/delete/{id}")]
    public async Task<IActionResult> DeleteGenreAsync(int id)
    {
        var genreToDelete = await _databaseContext.Genres.FindAsync(id);
        if (genreToDelete == null)
        {
            return NotFound();
        }
        _databaseContext.Genres.Remove(genreToDelete);
        await _databaseContext.SaveChangesAsync();
        return Ok();
    }


}