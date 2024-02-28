using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Vaibhav",
                        Email = "vaibhav@test.com",
                        UserName = "vaibhav@test.com",
                        Address = new Address
                        {
                            FirstName = "Vaibhav",
                            LastName = "Pathak",
                            Street = "1/49 A-14",
                            City = "Varanasi",
                            State = "UP",
                            Zipcode = "221003"
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com"
                    }
                };

                var roles = new List<AppRole>
                {
                    new AppRole {Name = "Admin"},
                    new AppRole {Name = "Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                    if (user.Email == "admin@test.com") await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}