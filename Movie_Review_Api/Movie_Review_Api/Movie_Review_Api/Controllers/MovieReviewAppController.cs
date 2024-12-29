using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MovieReviewApp.Models;
using MovieReviewApp.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieReviewApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MovieReviewAppPolicy")]
    public class MovieReviewAppController : ControllerBase
    {
        private readonly IMovieReviewService _service;

        public MovieReviewAppController(IMovieReviewService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieReview>>> GetAllReviews()
        {
            var reviews = await _service.GetAllReviewsAsync();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieReview>> GetReviewById(int id)
        {
            var review = await _service.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] MovieReview review)
        {
            try
            {
                await _service.AddReviewAsync(review);
                return CreatedAtAction(nameof(GetReviewById), new { id = review.Id }, review);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] string comments)
        {
            try
            {
                await _service.UpdateReviewAsync(id, comments);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            try
            {
                await _service.DeleteReviewAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
