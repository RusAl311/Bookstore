using bookstore_be.Common.Exceptions;
using bookstore_be.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace bookstore_be.Handlers.Genres
{
    public class UpdateGenre
    {
        public class Command : IRequest
        {
            public int GenreId { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command>
        {
            private readonly DatabaseContext _databaseContext;
            public CommandHandler(DatabaseContext databaseContext)
            {
                _databaseContext = databaseContext;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var entity = await _databaseContext.Genres.FirstOrDefaultAsync(g => 
                                    g.GenreId == request.GenreId, cancellationToken);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(Genre), request.GenreId);
                }

                entity.Name = request.Name;
                entity.Description = request.Description;

                await _databaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}