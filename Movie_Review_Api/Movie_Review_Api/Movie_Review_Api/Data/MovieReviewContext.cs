using Microsoft.EntityFrameworkCore;
using MovieReviewApp.Models;

namespace MovieReviewApp.Data
{
    public class MovieReviewContext : DbContext
    {
        public MovieReviewContext(DbContextOptions<MovieReviewContext> options) : base(options) { }

        public DbSet<MovieReview> MovieReviews { get; set; }
    }
}
