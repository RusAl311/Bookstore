using System;
using bookstore_be.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace bookstore_be.Handlers.Genres
{
    public class GetGenreById
    {
        public class Query : IRequest<Genre> 
        {
            public int GenreId { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, Genre>
        {
            private readonly DatabaseContext _databaseContext;
            public QueryHandler(DatabaseContext databaseContext)
            {
                 _databaseContext = databaseContext;
            }
            public async Task<Genre> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _databaseContext.Genres.FindAsync(request.GenreId);
            }
        }
    }
}
