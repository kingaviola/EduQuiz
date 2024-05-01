using Microsoft.AspNetCore.Mvc;

namespace EduQuizWebAPI.Controllers {
    public class QuizController : Controller {
        public IActionResult Index()
        {
            return View();
        }
    }
}
