using System.ComponentModel.DataAnnotations;

namespace bookstore_be.Data;

public class Author 
{
    [Key]
    public int AuthorId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }

}