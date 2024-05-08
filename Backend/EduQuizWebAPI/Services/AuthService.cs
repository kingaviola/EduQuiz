using Microsoft.AspNetCore.Http;
using EduQuizDBAccess.Data;
using EduQuizWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using EduQuizDBAccess.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Threading.Tasks;

namespace EduQuizWebAPI.Services {
    public class AuthService {

        private readonly EduQuizContext _context;

        public AuthService(EduQuizContext context)
        {
            _context = context;
        }

        public async Task Register(RegisterModel data)
        {
            bool isRegistered = _context.Users.Any(u => u.Email == data.Email);

            if (isRegistered)
            {
                throw new Exception("User already exists.");
            }

            User newUser = new User();
            newUser.Email = data.Email;
            newUser.Name = data.Name;
            newUser.Password = data.Password;
            newUser.UserName = GenerateUserName(data.Name);
            newUser.Status = "student";
            newUser.Theme = "light";

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task<int> Login(LoginModel data)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == data.Email);

            if (user == null)
            {
                throw new Exception("User does not exist!");
            }

            bool isVerified = data.Password == user.Password;
            if (!isVerified)
            {
                throw new Exception("Unauthorized");
            }


            return user.Id;
        }

        private string GenerateUserName(string name)
        {
            string replaced = name.Replace(" ", "").ToLower();

            Random random = new Random();
            int num = random.Next(1000, 10000);

            return replaced + num;
        }

    }
}
