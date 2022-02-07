using bookstore_be.Data;
namespace bookstore_be.DTOs;

public class BookPostDto 
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int Pages { get; set; }
    public Author Author { get; set; }
    public ICollection<Genre> Genres { get; set; }
}