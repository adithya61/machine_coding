import { useState } from "react";
import "./App.css";
import CustomMemo from "./CustomMemo";

function App() {
  const [counter, setCounter] = useState(2);
  const [counter2, setCounter2] = useState(3);

  const expfn = () => {
    return counter * counter;
  };

  const ans = CustomMemo(expfn, counter);

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={() => setCounter(counter + 1)}>Click me</button>
      <span>Counter : {counter}</span> <br />
      <span>Counter : {ans}</span>
      <div>
        <h1>second counter {counter2}</h1>
        <button onClick={() => setCounter2(counter2 + 1)}>counter2 + </button>
      </div>
    </>
  );
}

export default App;
