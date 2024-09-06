import React from "react";
import { numberWithCommas } from "../utils/config";

const SliderInput = ({
  title,
  total,
  mininum,
  maximum,
  val,
  update,
  minLabel,
  maxLabel,
  underlineText,
}) => {
  return (
    <>
      <span className="title"> {title} </span>
      {val > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineText} - {total()}
        </span>
      )}
      <div>
        <input
          type="range"
          min={mininum}
          max={maximum}
          className="slider"
          value={val}
          onChange={update}
        />
        <div className="labels">
          <label htmlFor="0%">{minLabel ?? mininum}</label>
          <p>{numberWithCommas(val)}</p>
          <label htmlFor="">{maxLabel ?? maximum}</label>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
