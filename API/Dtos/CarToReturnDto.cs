using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace API.Dtos
{
    public class CarToReturnDto
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string IsAvailable { get; set; }
        public decimal RentalPrice { get; set; }
        public string PictureUrl { get; set; }
        public string CarMaker { get; set; }
        public string CarModel { get; set; }
        
    }
}