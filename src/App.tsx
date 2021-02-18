import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

// Components
import SetupForm from "./components/SetupForm";
import Loading from "./components/Loading";
import QuestionCard from "./components/QuestionCard";

// types
import { QuestionState, AnswerObject } from "./API";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(true);
  const [quizDetail, setQuizDetail] = useState({
    amount: 10,
    category: 18,
    difficulty: "easy",
  });

  const [isPlayagain, setIsPlayAgain] = useState(false);

  // Handling Quiz amount, category and difficulty
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setQuizDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Start Quiz
  const startQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setQuizOver(false);

    const newQuestions = await fetchQuizQuestions(
      Number(quizDetail.amount),
      Number(quizDetail.category),
      quizDetail.difficulty
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNo(0);
    setIsLoading(false);
    setIsPlayAgain(false);
  };

  // Checking Answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      // User answer
      const answer = e.currentTarget.value;

      // Check answer agains correct answer
      const correct = questions[questionNo].correct_answer === answer;

      // Add score if answer is correct

      if (correct) setScore((prev) => prev + 1);

      // save answer in the array of user answes
      const answerObj = {
        question: questions[questionNo].question,
        answer,
        correct,
        correctAnswer: questions[questionNo].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  // Next Question
  const nextQuestion = () => {
    // Move on the the next question if not the last question
    const nextQuestion = questionNo + 1;

    if (nextQuestion === quizDetail.amount) {
    } else {
      setQuestionNo(nextQuestion);
    }
  };

  // playagain
  const playagain = () => {
    setScore(0);
    setUserAnswers([]);
    setQuestionNo(0);
    setIsLoading(false);
    setIsPlayAgain(true);
    setQuizDetail({
      amount: 10,
      category: 18,
      difficulty: "easy",
    });
  };

  if (quizOver || isPlayagain) {
    return (
      <SetupForm
        startQuizCallback={startQuiz}
        quizDetail={quizDetail}
        handleChangeCallback={handleChange}
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      {!isLoading && !quizOver && questions.length !== questionNo && (
        <QuestionCard
          questionNo={questionNo + 1}
          totalQuestions={quizDetail.amount}
          question={questions[questionNo].question}
          answers={questions[questionNo].answers}
          userAnswer={userAnswers ? userAnswers[questionNo] : undefined}
          callback={checkAnswer}
          nextQuestionCallback={nextQuestion}
        />
      )}

      {questions.length === questionNo && (
        <div>
          <h1>quiz over</h1>
          <h3>Your score is : {score} </h3>
          <h3>
            your percentage is {((score / quizDetail.amount) * 100).toFixed(2)}%
          </h3>

          <button className="submit-btn" onClick={playagain}>
            Play Again
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
