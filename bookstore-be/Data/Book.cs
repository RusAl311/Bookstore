using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bookstore_be.Data;

public class Book 
{
    [Key]
    public int BookId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Pages { get; set; }
    
    public Author Author { get; set; }

    public ICollection<Genre> Genres { get; set; }

}