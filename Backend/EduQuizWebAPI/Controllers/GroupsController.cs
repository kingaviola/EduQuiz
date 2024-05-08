using EduQuizWebAPI.Models;
using EduQuizWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduQuizWebAPI.Controllers {

    [ApiController]
    [Route("[controller]")]
    public class GroupsController : ControllerBase {
        
        private readonly GroupService _groupService;

        public GroupsController(GroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateGroup(GroupModel data)
        {
            int newId = await _groupService.CreateGroup(data);

            return CreatedAtAction(nameof(CreateGroup), newId);
        }

        [HttpGet("created-by/{userId}")]
        public async Task<ActionResult> GetCreatedGroups(int userId)
        {
            if (userId == 0)
            {
                return BadRequest("User ID is null");
            }

            string result = await _groupService.GetCreatedGroups(userId);

            if (result == null)
            {
                return NotFound("There is no group founded");
            }

            return Ok(result);
        }

        [HttpGet("joined-by/{userId}")]
        public async Task<ActionResult> GetJoinedGroups(int userId)
        {
            if (userId == 0)
            {
                return BadRequest("User ID is null");
            }

            string result = await _groupService.GetJoinedGroups(userId);

            if (result == null)
            {
                return NotFound("There is no group founded");
            }

            return Ok(result);
        }
    }
}
