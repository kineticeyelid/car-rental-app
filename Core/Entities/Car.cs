using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Car : BaseEntity
    {
        public string Name { get; set; }
        public string IsAvailable { get; set; }
        public decimal RentalPrice { get; set; }
        public string PictureUrl { get; set; }
        public CarMaker CarMaker { get; set; }
        public int CarMakerId { get; set; }
        public CarModel CarModel { get; set; }
        public int CarModelId { get; set; }
    }
}