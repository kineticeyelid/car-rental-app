using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using System.Collections.Generic;

namespace Core.Interfaces
{
    public interface ICarRepository
    {
        Task<Car> GetCarByIdAsyn(int id);
        Task<IReadOnlyList<Car>> GetCarsAsync();
        Task<IReadOnlyList<CarMaker>> GetCarMakersAsync();
        Task<IReadOnlyList<CarModel>> GetCarModelsAsync();
    }
}