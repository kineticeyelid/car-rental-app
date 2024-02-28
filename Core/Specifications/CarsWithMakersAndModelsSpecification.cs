using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class CarsWithMakersAndModelsSpecification : BaseSpecification<Car>
    {
        public CarsWithMakersAndModelsSpecification(CarSpecParams carParams)
            : base(x =>
                 (string.IsNullOrEmpty(carParams.Search) || x.Name.ToLower().Contains(carParams.Search))&&
                 (!carParams.MakerId.HasValue || x.CarMakerId == carParams.MakerId)&&
                 (!carParams.Modeld.HasValue || x.CarModelId == carParams.Modeld)       
            )
        {
            AddInclude(x => x.CarMaker);
            AddInclude(x => x.CarModel);
            AddOrderBy(x => x.Name);
            ApplyPaging(carParams.PageSize * (carParams.PageIndex - 1),
                carParams.PageSize);

            if (!string.IsNullOrEmpty(carParams.Sort))
            {
                switch (carParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.RentalPrice);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.RentalPrice);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public CarsWithMakersAndModelsSpecification(int id) : base(x => x.id == id)
        {
            AddInclude(x => x.CarMaker);
            AddInclude(x => x.CarModel);
        }
    }
}