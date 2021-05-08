
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using LoanCar.Data;
using LoanCar.Services;
using Microsoft.AspNetCore.Identity;
using System;
using LoanCar.Api.Factory;
using LoanCar.Api.Helpers;

namespace LoanCar.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CrudApiDbContext>(
              x => x.UseSqlServer(Configuration.GetConnectionString("CrudApiDbContext"))
          );
            services.AddScoped<ILoanService, LoanService>();
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(options =>
              {
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                          .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                      ValidateIssuer = false,
                      ValidateAudience = false
                  };
              });

            //   services.AddIdentity<User, IdentityRole>(opt =>
            //   {
            //       opt.Password.RequireDigit = false;
            //       opt.Password.RequireUppercase = false;
            //       opt.User.RequireUniqueEmail = true;
            //   })
            //.AddEntityFrameworkStores<CrudApiDbContext>()
            //.AddDefaultTokenProviders();

            //   services.Configure<DataProtectionTokenProviderOptions>(opt =>
            //      opt.TokenLifespan = TimeSpan.FromHours(2));

            //   services.AddScoped<IUserClaimsPrincipalFactory<User>, CustomClaimsFactory>();

            //   services.AddAutoMapper(typeof(Startup));



            services.AddCors(options =>
            {
                options.AddPolicy("loanPolicy",
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
            // Fixing JSON Self Referencing Loop Exceptions
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            //  turn off or handle camelCasing 
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ContractResolver = new DefaultContractResolver());

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("loanPolicy");
            app.UseAuthentication();
            //app.UseAuthorization();
            app.UseMiddleware<JwtMiddleware>();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
