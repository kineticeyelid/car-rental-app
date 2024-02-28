using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class CarWithFiltersForCountSpecification : BaseSpecification<Car>
    {
        public CarWithFiltersForCountSpecification(CarSpecParams carParams)
          : base(x =>
                 (string.IsNullOrEmpty(carParams.Search) || x.Name.ToLower().Contains(carParams.Search))&&
                 (!carParams.MakerId.HasValue || x.CarMakerId == carParams.MakerId)&&
                 (!carParams.Modeld.HasValue || x.CarModelId == carParams.Modeld)       
            )
        {
            
        }
    }
}