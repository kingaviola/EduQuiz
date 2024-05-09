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

        [HttpGet("created/{userId}")]
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

        [HttpGet("joined/{userId}")]
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

        [HttpPost("join/{code}/user/{userId}")]
        public async Task<ActionResult> JoinGroup(string code, int userId)
        {
            try
            {
                await _groupService.JoinGroup(code, userId);
            }
            catch (Exception ex)
            {
                return Conflict(ex);
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetGroupById(int id)
        {
            var quiz = await _groupService.GetGroupById(id);

            return Ok(quiz);
        }
    }
}
