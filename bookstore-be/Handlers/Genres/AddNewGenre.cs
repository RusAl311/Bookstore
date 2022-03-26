using bookstore_be.Data;
using MediatR;

namespace bookstore_be.Handlers.Genres
{
    public class AddNewGenre
    {
        public class Command : IRequest<int>
        {
            public string Name { get; set; }
            public string Description { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command, int>
        {
            private readonly DatabaseContext _databaseContext;
            public CommandHandler(DatabaseContext databaseContext)
            {
                _databaseContext = databaseContext;
            }
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var newGenre = new Genre
                {
                    Name = request.Name,
                    Description = request.Description
                };

                await _databaseContext.Genres.AddAsync(newGenre, cancellationToken);
                await _databaseContext.SaveChangesAsync(cancellationToken);

                return newGenre.GenreId;
            }
        }
    }
}