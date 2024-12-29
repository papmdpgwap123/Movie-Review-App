using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieReviewApp.Models
{
    public class MovieReview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Specifies auto-increment
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string MovieName { get; set; }

        [Required]
        public string ReviewComments { get; set; }
    }
}
