using bookstore_be.Common.Exceptions;
using bookstore_be.Data;
using MediatR;

namespace bookstore_be.Handlers.Genres
{
    public class DeleteGenre 
    {
        public class Command : IRequest
        {
            public int GenreId { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command>
        {
            private readonly DatabaseContext _databaseContext;
            public CommandHandler (DatabaseContext databaseContext)
            {
                _databaseContext = databaseContext;
            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var entity = await _databaseContext.Genres.FindAsync(new object[] {request.GenreId}, cancellationToken);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(Genre), request.GenreId);
                }

                _databaseContext.Genres.Remove(entity);
                await _databaseContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}