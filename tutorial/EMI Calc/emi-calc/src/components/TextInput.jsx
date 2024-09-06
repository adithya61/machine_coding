import React from "react";

const TextInput = ({ title, state, setState, slug }) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        type="number"
        value={
          slug == "interest" || slug == "processingfee"
            ? Math.max(Number(0), Math.min(Number(100), Number(state)))
            : state
        }
        onChange={(e) => setState(e.target.value)}
        placeholder={"title"}
      />
    </>
  );
};

export default TextInput;
