import { useState } from "react";

interface optionObj {
  id: number;
  answerOption: string;
  votes: number;
  rate: number;
}

const choices: optionObj[] = [
  {
    id: 1,
    answerOption: "East",
    votes: 9,
    rate: 15.1,
  },
  {
    id: 2,
    answerOption: "West",
    votes: 1,
    rate: 1.1,
  },
  {
    id: 3,
    answerOption: "North",
    votes: 2,
    rate: 1.1,
  },
  {
    id: 4,
    answerOption: "South",
    votes: 4,
    rate: 1.1,
  },
];

const Polls = () => {
  const [options, setOptions] = useState<optionObj[]>(choices);
  const [sum, setSum] = useState<number>(16);
  console.log(options, "options");

  const answerPicked = () => {
    let selectedOption: string;
    const elements: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".option");
    elements.forEach((element) => {
      if (element.checked) selectedOption = element.value;
    });

    const updatedObj: optionObj[] = options.map((option: optionObj) => {
      return option.answerOption == selectedOption
        ? {
            ...option,
            votes: option.votes + 1,
            rate: calculateRate(option.votes + 1, sum + 1),
          }
        : { ...option, rate: calculateRate(option.votes + 1, sum + 1) };
    });

    setSum((sum) => sum + 1);

    setOptions(updatedObj);

    const progress: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(".results");

    progress.forEach((p) => (p.style.display = "unset"));
  };

  const calculateRate = (value: number, sum: number) => {
    return (value / sum) * 100;
  };

  return (
    <>
      <div className=" flex flex-col gap-5 mt-10 justify-center items-center">
        <div className=" text-4xl">Polls</div>
        <div>
          <div className="text-2xl">In What Direction does the sun rise?</div>
          <div>
            <div className="mt-5">
              {options.map((option) => {
                return (
                  <div
                    className="grid grid-cols-2 gap-5 p-3 justify-items-stretch bg-[wheat] text-xl"
                    key={option.id}
                  >
                    <li>{option.answerOption}</li>
                    <input
                      onSelect={() => answerPicked()}
                      name="poll"
                      value={String(option.answerOption)}
                      className="cursor-pointer option"
                      type="radio"
                    />
                    <div className="results hidden">
                      <progress
                        className="text-2x"
                        max="100"
                        value={option.rate}
                      ></progress>
                      <div>{option.rate.toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={answerPicked}
                className="p-3 bg-blue-400 border-0 text-white mt-3 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Polls;
