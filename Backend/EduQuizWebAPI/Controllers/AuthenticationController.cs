using EduQuizWebAPI.Models;
using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduQuizWebAPI.Controllers {
    [Route("/auth")]
    public class AuthenticationController : ControllerBase {

        private readonly AuthService _authService;
        public AuthenticationController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerData)
        {
            try
            {
                await _authService.Register(registerData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            return Ok();
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginData)
        {
            int id = 0;

            try
            {
               id = await _authService.Login(loginData);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            return Ok(id);
        }

    }
}
