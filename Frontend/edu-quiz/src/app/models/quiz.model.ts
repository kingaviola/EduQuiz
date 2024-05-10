import { Question } from "./question.model";
import { QuizSettings } from "./quiz-settings.model";

export interface QuizModel {
    id: number,
    userId: number,
    name: string,
    description: string,
    creationDate: string,
    questions: Question[],
    settings: QuizSettings
}