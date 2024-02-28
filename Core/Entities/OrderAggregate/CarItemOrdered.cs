using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class CarItemOrdered
    {
        public CarItemOrdered()
        {
        }

        public CarItemOrdered(int cartItemId, string carName, string pictureUrl)
        {
            CarItemId = cartItemId;
            CarName = carName;
            PictureUrl = pictureUrl;
        }

        public int CarItemId { get; set; }
        public string CarName { get; set; }
        public string PictureUrl { get; set; }
    }
}