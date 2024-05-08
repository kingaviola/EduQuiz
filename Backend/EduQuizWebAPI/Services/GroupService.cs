using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace EduQuizWebAPI.Services {
    public class GroupService {

        private readonly EduQuizContext _context;

        public GroupService(EduQuizContext context)
        {
            _context = context;
        }

        public async Task<int> CreateGroup(GroupModel data)
        {
            Group newGroup = new Group();
            newGroup.Name = data.Name;
            newGroup.Description = data.Description;
            newGroup.CreatorName = data.CreatorName;
            newGroup.CreatorId = data.CreatorId;
            newGroup.JoinCode = data.JoinCode;
            newGroup.SharedQuizzes = null;

            _context.Groups.Add(newGroup);

            List<User> users = new List<User>();

            if (data.MemberIds != null)
            {
                foreach(var member in data.MemberIds)
                {
                    var user = await _context.Users.FindAsync(member);
                    if (user != null)
                    {
                        users.Add(user);
                    }
                }

                foreach (var user in users)
                {
                    user.Groups = user.Groups ?? new List<Group>();
                    user.Groups.Add(newGroup);
                }
            }

            await _context.SaveChangesAsync();

            return newGroup.Id;
        }

        public async Task<string> GetCreatedGroups(int userId)
        {
            var groups = await _context.Groups
                 .Where(g => g.CreatorId == userId)
                 .ToListAsync();

            string json = JsonConvert.SerializeObject(groups);

            return json;
        }

        public async Task<string> GetJoinedGroups(int userId)
        {
            var groups = await _context.Groups
                .Where(g => g.Members.Any(m => m.Id == userId))
                .ToListAsync();

            string json = JsonConvert.SerializeObject(groups);

            return json;
        }

        public async Task JoinGroup(string code, int userId)
        {
            var group = await _context.Groups.FirstOrDefaultAsync(g => g.JoinCode == code);

            if (group == null)
            {
                throw new Exception("Group is not found");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new Exception("User is not found");
            }

            bool isMember = false;

            if (group.Members != null)
            {
                isMember = group.Members.Any(m => m.Id ==  user.Id);

                if (isMember)
                {
                    throw new Exception("User is already a member");
                }
            }

            group.Members = group.Members ?? new List<User>();
            group.Members.Add(user);
            user.Groups = user.Groups ?? new List<Group>();
            user.Groups.Add(group);

            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<GroupModel>> GetGroupById(int id)
        {
            var group = await _context.Groups
                .Include(q => q.SharedQuizzes)
                .Include(q => q.Members)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (group == null)
            {
                return new NotFoundResult();
            }

            var groupModel = new GroupModel
            {
                Id = group.Id,
                Name = group.Name,
                Description = group.Description,
                CreatorId = group.CreatorId,
                CreatorName = group.CreatorName,
                JoinCode = group.JoinCode,
                MemberIds = group.Members?.Select(m => m.Id).ToList(),
                SharedQuizIds = group.SharedQuizzes?.Select(q => q.Id).ToList()
            };

            return groupModel;
        }
    }
}
