import { Category, Difficulty } from "../API";

type Props = {
  startQuizCallback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  quizDetail: { amount: number; category: number; difficulty: string };
  handleChangeCallback: (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
};

const SetupForm: React.FC<Props> = ({
  startQuizCallback,
  quizDetail,
  handleChangeCallback,
}) => {
  return (
    <main>
      <section className="quiz quiz-small">
        <h2>React Quiz App</h2>

        <form action="" className="setup-form">
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quizDetail.amount}
              onChange={handleChangeCallback}
              className="form-input"
              min={1}
              max={10}
            />
          </div>

          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>

            <select
              name="category"
              id="category"
              className="form-input"
              value={quizDetail.category}
              onChange={handleChangeCallback}
            >
              <option value={Category.SCIENCE_COMPUTERS}>
                Science Computers
              </option>

              <option value={Category.ART}>Art</option>

              <option value={Category.ENTERTAINMENT_BOOKS}>
                Entertainment Books
              </option>

              <option value={Category.GENERAL_KNOWLEDGE}>
                General Knowledge
              </option>

              <option value={Category.POLITICS}>Politics</option>

              <option value={Category.SPORTS}>Sports</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quizDetail.difficulty}
              onChange={handleChangeCallback}
            >
              <option value={Difficulty.EASY}>{Difficulty.EASY}</option>
              <option value={Difficulty.MEDIUM}>{Difficulty.MEDIUM}</option>
              <option value={Difficulty.HARD}>{Difficulty.HARD}</option>
            </select>
          </div>

          {/* Start Quiz Button */}
          <button className="submit-btn" onClick={startQuizCallback}>
            start quiz
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
