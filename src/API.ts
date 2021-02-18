import { shuffleArray } from "./utils";

// returning question types
export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

// Grabing the Question types and adding them another field of answers
export type QuestionState = Question & { answers: string[] };

// User Answer type

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string,
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum Category {
  SCIENCE_COMPUTERS = 18,
  GENERAL_KNOWLEDGE = 9,
  POLITICS = 24,
  ART = 25,
  SPORTS = 21,
  ENTERTAINMENT_BOOKS = 10,
}

export const fetchQuizQuestions = async (
  amount: number,
  category: number,
  difficulty: string
) => {

  const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  console.log(endPoint);

    const response = await fetch(endPoint);
    const data = await response.json();

    return data.results.map((question: Question) => (
        {
            ...question,
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
        }
    ))

    
};
