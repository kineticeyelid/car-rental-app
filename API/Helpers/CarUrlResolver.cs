using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class CarUrlResolver : IValueResolver<Car, CarToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public CarUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Car source, CarToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }
            return null;
        }
    }
}