using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LoanCar.Data;
using LoanCar.Data.Dtos;
using LoanCar.Services;
using Microsoft.AspNetCore.Authorization;

namespace LoanCar.Api.Controllers
{
    [Route("api/auth")]
    public class AuthController : BaseController<User>
    {
        private new readonly IAuthService _service;
        private readonly IConfiguration _config;
        //private readonly IMapper _mapper;
        public AuthController(IAuthService authService, IConfiguration config) : base(authService)
        {
            _service = authService;
            _config = config;
        }

        [HttpPost("register")]
        [AllowAnonymous]

        public async Task<IActionResult> Register(UserForRegisterDto userDTO)
        {
            string msg = "Registeration successfully!...";
            string error = "Registeration Faild!...";
            userDTO.Username = userDTO.Username.ToLower();
            try
            {
                if (await _service.UserExist(userDTO.Username, true))
                {
                    return BadRequest("Username already exist");
                }
                var user = new User() { FirstName = userDTO.FirstName, LastName = userDTO.LastName, Username = userDTO.Username };
                //var createdUser = _service.Register(user, userDTO.Password);
                await _service.Register(user, userDTO.Password);
                return Ok(new { msg });

            }
            catch (Exception)
            {
                return Ok(new { error });
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]

        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _service.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = new UserForListDto

            {
                FirstName = userFromRepo.FirstName,
                LastName = userFromRepo.LastName,
                Username = userFromRepo.Username
            };
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

    }
}
