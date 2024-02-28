using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CarCreateDto
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string IsAvailable { get; set; }
        
        [Required]
        [RegularExpression(@"^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$", 
            ErrorMessage = "Price must be a decimal (e.g 20.30)")]
        public decimal RentalPrice { get; set; }
        
        public string PictureUrl { get; set; }
        
        [Required]
        public int CarMakerId { get; set; }
        
        [Required]
        public int CarModelId { get; set; }
    }
}