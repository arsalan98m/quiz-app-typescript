import React from "react";
import { AnswerObject } from "../API";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestions: number;
  nextQuestionCallback: any;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
  nextQuestionCallback,
}) => {
  return (
    <main>
      <section className="quiz">
        <p className="correct-answers">
          Question: {questionNo} / {totalQuestions}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />

          <div className="btn-container">
            {answers.map((answer, index) => (
              <div key={index}>
                <button
                  className={`answer-btn ${userAnswer && "active"}`}
                  disabled={userAnswer ? true : false}
                  value={answer}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            ))}
          </div>
        </article>
        {userAnswer && (
          <button className="next-question" onClick={nextQuestionCallback}>
            Next Question
          </button>
        )}
      </section>
    </main>
  );
};

export default QuestionCard;
