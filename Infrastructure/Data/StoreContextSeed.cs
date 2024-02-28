using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Infrastructure.Data;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.CarMakers.Any())
            {
                var makersData = File.ReadAllText("../Infrastructure/Data/SeedData/makers.json");
                var makers = JsonSerializer.Deserialize<List<CarMaker>>(makersData);
                context.CarMakers.AddRange(makers);
            }

            if (!context.CarModels.Any())
            {
                var modelsData = File.ReadAllText("../Infrastructure/Data/SeedData/models.json");
                var models = JsonSerializer.Deserialize<List<CarModel>>(modelsData);
                context.CarModels.AddRange(models);
            }

            if (!context.Cars.Any())
            {
                var carsData = File.ReadAllText("../Infrastructure/Data/SeedData/cars.json");
                var cars = JsonSerializer.Deserialize<List<Car>>(carsData);
                context.Cars.AddRange(cars);
            }

             if (!context.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                context.DeliveryMethods.AddRange(methods);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}