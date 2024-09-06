import { useEffect, useState } from "react";
import "./App.css";
import UseThrottle from "./hooks/UseThrottle";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // any expensive operation or API Call
  };

  const throttledHandleResize = UseThrottle(handleResize, 1000);

  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);

    return () => {
      window.removeEventListener("resize", throttledHandleResize);
    };
  }, []);

  return (
    <div>
      Window Size: {windowSize.width} x {windowSize.height}
    </div>
  );
}

export default App;
