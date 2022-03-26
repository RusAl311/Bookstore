using bookstore_be.Data;
using bookstore_be.Handlers.Genres;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static bookstore_be.Handlers.Genres.DeleteGenre;

namespace bookstore_be.Controllers;

[ApiController]
public class GenreController : BaseController
{
    private readonly DatabaseContext _databaseContext;

    public GenreController(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext; 
    }

    // Gel all genres
    [HttpGet]
    [Route("genre/all")]
    public async Task<IActionResult> GetGenres() 
    {
        var genres = await Mediator.Send(new GetGenres.Query());
        return Ok(genres);
    }
    

    // Get a genre by id
    [HttpGet]
    [Route("genre/{id}")]
    public async Task<IActionResult> GetGenreById(int id) 
    {
        var query = new GetGenreById.Query
        {
            GenreId = id
        };
        var genre = await Mediator.Send(query);
        return Ok(genre);
    } 

    // Create a new genre
    [HttpPost]
    [Route("genre/add")]    
    public async Task<IActionResult> AddNewGenre([FromBody] AddNewGenre.Command command)
    {
        var createdGenreId = await Mediator.Send(command);
        return Ok(createdGenreId);
    }

    // Update the genre 
    [HttpPut]
    [Route("genre/update/{id}")]
    public async Task<IActionResult> UpdateGenre([FromBody] UpdateGenre.Command command)
    {
        await Mediator.Send(command);
        return NoContent();
    }

    // Delete the genre
    [HttpDelete]
    [Route("genre/delete/{id}")]
    public async Task<IActionResult> DeleteGenre(int id)
    {
        var command = new Command
        {
            GenreId = id
        };
        await Mediator.Send(command);
        return NoContent();
    }


}