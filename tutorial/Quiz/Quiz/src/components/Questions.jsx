const Questions = ({ questions, currentQuestion, handleNext }) => {
  const options = [1, 2, 3, 4];

  return (
    <div>
      <h1>{questions[currentQuestion].question}</h1>
      <ul className="list">
        {questions[currentQuestion].options.map((option, index) => (
          <li
            className="options"
            key={options[index]}
            onClick={() => handleNext(option.isCorrect)}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
