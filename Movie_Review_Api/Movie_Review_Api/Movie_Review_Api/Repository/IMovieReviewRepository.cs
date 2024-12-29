using System.Collections.Generic;
using System.Threading.Tasks;
using MovieReviewApp.Models;

namespace MovieReviewApp.Repositories
{
    public interface IMovieReviewRepository
    {
        Task<IEnumerable<MovieReview>> GetAllAsync();
        Task<MovieReview> GetByIdAsync(int id);
        Task AddAsync(MovieReview review);
        Task UpdateAsync(MovieReview review);
        Task DeleteAsync(int id);
    }
}
