import { useState, useEffect, useRef } from "react";
import "./App.css";
import Progressbar from "./components/Progressbar";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    var interval = setInterval(() => {
      setValue((value) => {
        if (value > 100) {
          clearInterval(interval);
          return value;
        }
        return value + 1;
      });
    }, 100);
  }, []);

  return (
    <div className="app">
      <span>Progress Bar</span>
      <Progressbar value={value} />
    </div>
  );
}

export default App;
