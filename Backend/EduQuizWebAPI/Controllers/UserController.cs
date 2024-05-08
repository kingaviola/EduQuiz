using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduQuizWebAPI.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller {
        
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsersAutocomplete([FromQuery] string prefix)
        {
            var result = await _userService.GetUsersForAutocomplete(prefix);

            if (result == null)
            {
                return NotFound("There is no user found");
            }

            return Ok(result);
        }
    }
}
