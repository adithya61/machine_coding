import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./Hooks/usePasswordGenerator";
import StrengthChecker from "./Components/StrengthChecker";

function App() {
  // Hooks

  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include UpperCase Letters", state: true },
    { title: "Include LowerCase Letters", state: false },
    { title: "Include Numbers", state: true },
    { title: "Include Symbols", state: false },
  ]);
  const { password, error, generatePassword } = usePasswordGenerator();

  const [copied, setCopied] = useState(false);

  //   functions

  //   check un-check : checkbox
  const handleCheckBoxChange = (index) => {
    const updatedCheckBoxData = [...checkBoxData];

    updatedCheckBoxData[index].state = !updatedCheckBoxData[index].state;

    setCheckBoxData(updatedCheckBoxData);
  };

  //   copy password

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  //   Rendering Component

  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          {/* Copy Button */}
          <button className="copy_btn" onClick={handleCopyPassword}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {/* Character Length */}
      <div className="char-length">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min={4}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        {/* Checkboxes */}
        <div className="checBoxes" style={{ color: "white" }}>
          {checkBoxData.map((checkbox, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBoxChange(index)}
                  checked={checkbox.state}
                />
                <label htmlFor=""> {checkbox.title} </label>
              </div>
            );
          })}
        </div>
        {/* Strength */}

        <StrengthChecker password={password} />

        {/* Error Handling */}

        {error && <div className="errorMessage">{String(error)}</div>}

        {/* Generate Button */}
        <button
          className="generateBtn"
          onClick={() => generatePassword(checkBoxData, length)}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
