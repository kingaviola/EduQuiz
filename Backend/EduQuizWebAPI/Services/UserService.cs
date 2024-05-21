using EduQuizDBAccess.Data;
using EduQuizDBAccess.Entities;
using EduQuizWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace EduQuizWebAPI.Services {
    public class UserService {

        private readonly EduQuizContext _context;

        public UserService(EduQuizContext context)
        {
            _context = context;
        }

        public async Task<string> GetUsersForAutocomplete(string prefix)
        {
            var users = await _context.Users
                .Where(u => u.UserName.Length >= 2 && u.UserName.Substring(0, 2) == prefix)
                .ToListAsync();

            List<UserBasicModel> userModels = new List<UserBasicModel>();

            foreach (var user in users)
            {
                var newBasic = new UserBasicModel();
                newBasic.Id = user.Id;
                newBasic.UserName = user.UserName;
                newBasic.Name = user.Name;

                userModels.Add(newBasic);
            }

            string json = JsonConvert.SerializeObject(userModels);

            return json;
        }

        public async Task<List<UserProfileModel>> GetGroupUsers(int groupId)
        {
            var group = await _context.Groups
                .Where(g => g.Id == groupId)
                .Include(g => g.Members)
                    .ThenInclude(m => m.Image)
                .FirstOrDefaultAsync();

            List<UserProfileModel> users = new List<UserProfileModel>();

            foreach (var member in group.Members)
            {
                UserProfileModel newUser = new UserProfileModel();
                newUser.Name = member.Name;
                newUser.UserName = member.UserName;
                newUser.Email = member.Email;
                newUser.UserImage = member.Image;
                users.Add(newUser);
            }

            return users;
        }
    }
}
