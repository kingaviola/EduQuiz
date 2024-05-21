using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EduQuizWebAPI.Controllers {
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UsersController : Controller {
        
        private readonly UserService _userService;

        public UsersController(UserService userService)
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

        [HttpGet("group/{groupId}")]
        public async Task<ActionResult> GetGroupUsers(int groupId)
        {
            var result = await _userService.GetGroupUsers(groupId);

            return Ok(result);
        }
    }
}
