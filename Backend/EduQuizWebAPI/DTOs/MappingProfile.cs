using AutoMapper;
using EduQuizDBAccess.Entities;

namespace EduQuizWebAPI.DTOs {
    public class MappingProfile : Profile {
        public MappingProfile()
        {
            CreateMap<AnswerOption, AnswerOptionDto>()
                .Include<CalculateAnswer, CalculateAnswerDto>()
                .Include<FreeTextAnswer, FreeTextAnswerDto>()
                .Include<PairingAnswer, PairingAnswerDto>()
                .Include<SimpleAnswer, SimpleAnswerDto>()
                .Include<RightOrderAnswer, RightOrderAnswerDto>();

            CreateMap<CalculateAnswer, CalculateAnswerDto>();
            CreateMap<PairingAnswer, PairingAnswerDto>();
            CreateMap<FreeTextAnswer, FreeTextAnswerDto>().ForMember(dest => dest.AnswerText, opt => opt.MapFrom(src => src.Text));
            CreateMap<SimpleAnswer, SimpleAnswerDto>().ForMember(dest => dest.AnswerText, opt => opt.MapFrom(src => src.Text));
            CreateMap<RightOrderAnswer, RightOrderAnswerDto>().ForMember(dest => dest.AnswerText, opt => opt.MapFrom(src => src.Text));

            CreateMap<Variable, VariableDto>();
            CreateMap<Quiz, QuizDto>();
            CreateMap<Question, QuestionDto>();
            CreateMap<FilledQuiz, FilledQuizDto>();
        }
    }
}
