using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class CarRepository : ICarRepository
    {
        private readonly StoreContext _context;
        public CarRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Car> GetCarByIdAsyn(int id)
        {
            return await _context.Cars
              .Include(p=>p.CarMaker)
              .Include(p=>p.CarModel)
              .FirstOrDefaultAsync(p=>p.id == id);
        }

        public async Task<IReadOnlyList<CarMaker>> GetCarMakersAsync()
        {
            return await _context.CarMakers.ToListAsync();
        }

        public async Task<IReadOnlyList<CarModel>> GetCarModelsAsync()
        {
            return await _context.CarModels.ToListAsync();
        }

        public async Task<IReadOnlyList<Car>> GetCarsAsync()
        {
            return await _context.Cars
               .Include(p=>p.CarMaker)
               .Include(p=>p.CarModel)
               .ToListAsync();
        }
    }
}