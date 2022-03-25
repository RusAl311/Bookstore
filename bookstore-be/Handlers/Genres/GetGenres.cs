using bookstore_be.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace bookstore_be.Handlers.Genres
{
    public class GetGenres
    {
        public class Query : IRequest<IEnumerable<Genre>> {}

        public class QueryHandler : IRequestHandler<Query, IEnumerable<Genre>>
        {
            private readonly DatabaseContext _databaseContext;
            public QueryHandler(DatabaseContext databaseContext)
            {
                 _databaseContext = databaseContext;
            }
            public async Task<IEnumerable<Genre>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _databaseContext.Genres.ToListAsync(cancellationToken);
            }
        }
    }
}