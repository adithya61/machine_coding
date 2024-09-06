import { useEffect } from "react";
import { useState } from "react";
import { MAX, MIN } from "../constants";

const Progressbar = ({ value }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));
    if (value >= 100) console.log("done");
  }, [value]);

  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()} %
      </span>
      <div
        role="progressbar"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percent.toFixed()}
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent.toFixed() / MAX})`,
          transformOrigin: "left",
        }}
      ></div>
    </div>
  );
};

export default Progressbar;
