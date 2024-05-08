using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
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
    }
}
