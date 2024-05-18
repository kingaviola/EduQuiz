namespace EduQuizWebAPI.Models {
    public class StatisticsBarModel {
        public string Name { get; set; } = null!;
        public List<StatisticsBaseModel> Series { get; set; }
    }
}
