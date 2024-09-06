import { useState } from "react";
import Questions from "./components/Questions";
import questions from "./constants/questions";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(0);

  const handleNext = (answer) => {
    if (answer) setAnswer((ans) => ans + 1);
    setCurrentQuestion((cur) => cur + 1);
  };

  return (
    <>
      <div>
        {currentQuestion == questions.length ? (
          <span>You answered {answer} questions correctly.</span>
        ) : (
          <div className="app">
            <div>World quiz</div>
            <Questions
              questions={questions}
              currentQuestion={currentQuestion}
              handleNext={handleNext}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
