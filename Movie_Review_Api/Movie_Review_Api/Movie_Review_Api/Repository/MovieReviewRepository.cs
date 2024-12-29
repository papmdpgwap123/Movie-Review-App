using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieReviewApp.Data;
using MovieReviewApp.Models;

namespace MovieReviewApp.Repositories
{
    public class MovieReviewRepository : IMovieReviewRepository
    {
        private readonly MovieReviewContext _context;

        public MovieReviewRepository(MovieReviewContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MovieReview>> GetAllAsync()
        {
            return await _context.MovieReviews.ToListAsync();
        }

        public async Task<MovieReview> GetByIdAsync(int id)
        {
            return await _context.MovieReviews.FindAsync(id);
        }

        public async Task AddAsync(MovieReview review)
        {
            await _context.MovieReviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(MovieReview review)
        {
            _context.MovieReviews.Update(review);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var review = await _context.MovieReviews.FindAsync(id);
            if (review != null)
            {
                _context.MovieReviews.Remove(review);
                await _context.SaveChangesAsync();
            }
        }
    }
}
