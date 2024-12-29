using System.Collections.Generic;
using System.Threading.Tasks;
using MovieReviewApp.Models;
using MovieReviewApp.Repositories;

namespace MovieReviewApp.Services
{
    public class MovieReviewService : IMovieReviewService
    {
        private readonly IMovieReviewRepository _repository;

        public MovieReviewService(IMovieReviewRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MovieReview>> GetAllReviewsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<MovieReview> GetReviewByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddReviewAsync(MovieReview review)
        {
            if (string.IsNullOrWhiteSpace(review.MovieName) || string.IsNullOrWhiteSpace(review.ReviewComments))
            {
                throw new ArgumentException("Movie name and review comments are required.");
            }
            await _repository.AddAsync(review);
        }

        public async Task UpdateReviewAsync(int id, string comments)
        {
            var review = await _repository.GetByIdAsync(id);
            if (review == null)
            {
                throw new KeyNotFoundException("Review not found.");
            }

            review.ReviewComments = comments;
            await _repository.UpdateAsync(review);
        }

        public async Task DeleteReviewAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
