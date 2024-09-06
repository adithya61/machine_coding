import { useState } from "react";

function App() {
  const steps = [
    { id: 1, classname: "active", step: 1 },
    { id: 2, classname: "", step: 2 },
    { id: 3, classname: "", step: 3 },
    { id: 4, classname: "", step: 4 },
    { id: 5, classname: "", step: 5 },
  ];

  const [complete, setComplete] = useState([1]);
  const [current, setCurrent] = useState(1);

  const handleClick = () => {
    if (current == steps.length) return;

    const ele = document.getElementById(String(current));

    ele.style.backgroundColor = "#38b000";
    ele.style.transition = "0.5s ease out";

    setCurrent((cur) => cur + 1);

    const updateComplete = [...complete, current + 1];
    setComplete(updateComplete);
  };

  return (
    <div className="flex flex-col " >
      <div className="flex justify-content-c parent">
        {steps.map((s) => (
          <div
            className="flex align-items-c step-header justify-content-c align-items-c"
            key={s.id}
          >
            <div className={`round ${complete[s.id - 1] ? "active" : ""}`}>
              {s.step}
            </div>
            {s.id != steps.length && (
              <div id={s.id} className="dash">
                <div className="progress-bar"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

export default App;
