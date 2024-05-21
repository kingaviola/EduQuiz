using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EduQuizWebAPI.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<AccountController> _logger;
        private readonly EduQuizContext _context;

        public AccountController(UserManager<User> userManagerm, SignInManager<User> signInManager, ILogger<AccountController> logger, EduQuizContext context)
        {
            _userManager = userManagerm;
            _signInManager = signInManager;
            _logger = logger;
            _context = context;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = new User { Name = model.Name, UserName = model.UserName, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok(user.Id);
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during user registration.");
                return StatusCode(500, "An error occurred during user registration.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, isPersistent: false, lockoutOnFailure: false);
            Console.WriteLine("result: " + result);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    return Ok(user.Id);
                }
                else
                {
                    return NotFound();
                }
            }
            if (result.IsLockedOut)
            {
                return Forbid();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfileData()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(userId);
       
            if (user == null)
            {
                return NotFound();
            }

            var userWithImage = await _userManager.Users
                .Include(u => u.Image)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            var userData = new UserProfileModel
            {
                Name = user.Name,
                UserName = user.UserName,
                Email = user.Email,
                UserImage = userWithImage.Image
            };

            return Ok(userData);
        }

        [HttpPost("profile/image")]
        public async Task<IActionResult> ChangeProfilePicture([FromBody] ImageModel newImage)
        {
            Console.WriteLine("itteni service-be eljut");
            Console.WriteLine("image: " + newImage);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            byte[] bytes = Convert.FromBase64String(newImage.Data);

            user.Image = new Image
            {
                Name = newImage.Name,
                Data = bytes,
                Type = newImage.Type
            };

            await _userManager.UpdateAsync(user);

            return Ok();
        }
    }
}
