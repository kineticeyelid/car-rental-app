using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class CarsController : BaseApiController
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CarsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<CarToReturnDto>>> GetCars(
            [FromQuery]CarSpecParams carParams)
        {
            var spec = new CarsWithMakersAndModelsSpecification(carParams);

            var countSpec = new CarWithFiltersForCountSpecification(carParams);

            var totalItems = await _unitOfWork.Repository<Car>().CountAsync(countSpec);

            var cars = await _unitOfWork.Repository<Car>().ListAsync(spec);

            var data = _mapper
                .Map<IReadOnlyList<Car>, IReadOnlyList<CarToReturnDto>>(cars);

            return Ok(new Pagination<CarToReturnDto>(carParams.PageIndex, carParams.PageSize, totalItems, data));
        }


        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CarToReturnDto>> GetCar(int id)
        {
            var spec = new CarsWithMakersAndModelsSpecification(id);

            var car = await _unitOfWork.Repository<Car>().GetEntityWithSpec(spec);

            if (car == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Car, CarToReturnDto>(car);
        }

        [HttpGet("makers")]
        public async Task<ActionResult<IReadOnlyList<CarMaker>>> GetCarMakers()
        {
            return Ok(await _unitOfWork.Repository<CarMaker>().ListAllAsync());
        }

        [Cached(1000)]
        [HttpGet("models")]
        public async Task<ActionResult<IReadOnlyList<CarModel>>> GetCarModels()
        {
            return Ok(await _unitOfWork.Repository<CarModel>().ListAllAsync());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Car>> CreateCar(CarCreateDto carToCreate)
        {
            var car = _mapper.Map<CarCreateDto, Car>(carToCreate);
            car.PictureUrl = "images/cars/placeholder.png";

            _unitOfWork.Repository<Car>().Add(car);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating car"));

            return Ok(car);
        }
    
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Car>> UpdateCar(int id, CarCreateDto carToUpdate)
        {
            var car = await _unitOfWork.Repository<Car>().GetByIdAsync(id);

            _mapper.Map(carToUpdate, car);

            _unitOfWork.Repository<Car>().Update(car);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating car"));

            return Ok(car);
        }

        [Authorize(Roles = "Admin")]      
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCar(int id)
        {
            var car = await _unitOfWork.Repository<Car>().GetByIdAsync(id);
            
            _unitOfWork.Repository<Car>().Delete(car);

            var result = await _unitOfWork.Complete();
            
            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting Car"));

            return Ok();
        }
    }
}