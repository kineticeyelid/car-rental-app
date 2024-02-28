using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class CarConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder.Property(p => p.id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(20);
            builder.Property(p => p.IsAvailable).IsRequired().HasMaxLength(20);
            builder.Property(p => p.RentalPrice).HasColumnType("decimal(18,2)");
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.HasOne(b=>b.CarMaker).WithMany().HasForeignKey(p=>p.CarMakerId);
            builder.HasOne(t=>t.CarModel).WithMany().HasForeignKey(p=>p.CarModelId);
            
        }
    }
} 