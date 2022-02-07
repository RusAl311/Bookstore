using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bookstore_be.Data;

public class User 
{
    [Key]
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }

}