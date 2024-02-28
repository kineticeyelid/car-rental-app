using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string CarName { get; set; }

        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
        public decimal RentalPrice { get; set; }

        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int RentDays { get; set; }

        [Required]
        public string PictureUrl { get; set; }

        [Required]
        public string Maker { get; set; }

        [Required]
        public string Model { get; set; }
    }
}