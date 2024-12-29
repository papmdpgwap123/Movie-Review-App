using System.Collections.Generic;
using System.Threading.Tasks;
using MovieReviewApp.Models;

namespace MovieReviewApp.Services
{
    public interface IMovieReviewService
    {
        Task<IEnumerable<MovieReview>> GetAllReviewsAsync();
        Task<MovieReview> GetReviewByIdAsync(int id);
        Task AddReviewAsync(MovieReview review);
        Task UpdateReviewAsync(int id, string comments);
        Task DeleteReviewAsync(int id);
    }
}
