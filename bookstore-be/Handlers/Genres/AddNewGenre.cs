using bookstore_be.Data;
using MediatR;

namespace bookstore_be.Handlers.Genres
{
    public class AddNewGenre
    {
        public class Command : IRequest<string>
        {
            public string Name { get; set; }
            public string Description { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command, string>
        {
            private readonly DatabaseContext _databaseContext;
            public CommandHandler(DatabaseContext databaseContext)
            {
                _databaseContext = databaseContext;
            }
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var newGenre = new Genre
                {
                    Name = request.Name,
                    Description = request.Description
                };

                await _databaseContext.Genres.AddAsync(newGenre, cancellationToken);
                await _databaseContext.SaveChangesAsync(cancellationToken);

                return await Task.FromResult("sds");
            }
        }
    }
}