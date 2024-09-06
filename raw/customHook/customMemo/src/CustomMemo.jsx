import { useRef } from "react";

const CustomMemo = (fn, dep) => {
  const val = useRef();

  if (!val.current || val.current.dp != dep) {
    val.current = {
      val: fn(),
      dp: dep,
    };
  }

  return val.current.val;
};

export default CustomMemo;
