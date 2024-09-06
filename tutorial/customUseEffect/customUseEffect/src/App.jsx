import { useState } from "react";
import "./App.css";
import UseEffectCustom from "./components/UseEffectCustom";

function App() {
  const [count, setCount] = useState(0);
  const [mount, setMount] = useState(0);

  UseEffectCustom(() => {
    console.log("custom useEffect called", count, mount);

    return () => console.log("cleanup");
  }, [count]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span>{count}</span>
        <br />
        <span>{mount}</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button onClick={() => setCount(count + 1)}>Increment counter</button>
        <button onClick={() => setMount(mount + 1)}>Increment mount</button>
      </div>
    </>
  );
}

export default App;
