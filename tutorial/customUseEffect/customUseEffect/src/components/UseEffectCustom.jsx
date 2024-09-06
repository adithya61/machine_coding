import { useRef } from "react";

const UseEffectCustom = (fn, deps) => {
  const firstRender = useRef(true);
  const prevDeps = useRef([]);

  if (firstRender.current) {
    firstRender.current = false;

    fn();

    prevDeps.current = deps;
  }

  let change = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;

  if (change) {
    console.log("dep change");
    let cleanup = fn();

    if (cleanup && cleanup instanceof Function) {
      cleanup();
    }

    prevDeps.current = deps;
  }
};

export default UseEffectCustom;
