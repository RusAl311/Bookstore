using System.Collections.Generic;
using System.Linq;

namespace bookstore_be.Data
{
    public class DataSeeder
    {
        private readonly DatabaseContext databaseContext;

        public DataSeeder(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public void Seed()
        {
            if(!databaseContext.Users.Any())
            {
                var users = new List<User>()
                {
                        new User()
                        {
                            UserName = "bookstore_user",
                            Password = "BookSt0re9876"
                        },
                        new User()
                        {
                            UserName = "admin",
                            Password = "admin"
                        }
                };

                databaseContext.Users.AddRange(users);
                databaseContext.SaveChanges();
            }
        }
    }
}