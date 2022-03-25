using bookstore_be.Data;
using bookstore_be.Handlers.Genres;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace bookstore_be.Controllers;

[ApiController]
public class GenreController: ControllerBase
{
    private readonly DatabaseContext _databaseContext;

    private readonly IMediator _mediator;
    public GenreController(DatabaseContext databaseContext, IMediator mediator)
    {
        _databaseContext = databaseContext; 
        _mediator = mediator;
    }

    // Gel all genres
    [HttpGet]
    [Route("/api/genre/all")]
    public async Task<IActionResult> GetGenres() 
    {
        var genres = await _mediator.Send(new GetGenres.Query());
        return Ok(genres);
    }
    

    // Get a genre by id
    [HttpGet]
    [Route("/api/genre/{id}")]
    public async Task<IActionResult> GetGenreById(int id) 
    {
        var genre = await _mediator.Send(new GetGenreById.Query { GenreId = id });
        return genre == null ? NotFound() : Ok(genre);
    } 

    // Create a new genre
    [HttpPost]
    [Route("/api/genre/add")]
    public async Task<IActionResult> AddNewGenre([FromBody] AddNewGenre.Command command)
    {
        // _databaseContext.Genres.Add(genre);
        // await _databaseContext.SaveChangesAsync();
        // return Ok();
        var createdGenreId = await _mediator.Send(command);
        return Ok();
        // return Ok(CreatedAtAction(nameof(GetGenreById), new { id = createdGenreId }, null));
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