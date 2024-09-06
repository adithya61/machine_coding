import { useEffect, useState } from "react";

function App() {
  const [grids, setGrids] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [seq, setSeq] = useState([]);

  useEffect(() => {
    if (seq.length == 9) reverse();
  }, [seq]);

  const updateCells = (i, j, value) => {
    return grids.map((r, ind) =>
      r.map((c, jnd) => {
        if (ind == i && jnd == j) {
          return (grids[ind][jnd] = value);
        } else {
          return grids[ind][jnd];
        }
      })
    );
  };

  const reverse = () => {
    let interval = setInterval(() => {
      if (seq.length == 0) {
        clearInterval(interval);
        return;
      }
      let [i, j] = seq[seq.length - 1];
      seq.pop();
      const tgrid = updateCells(i, j, 0);

      setGrids(tgrid);
    }, 300);
  };

  const change = (i, j) => {
    if (grids[i][j] == 1) return;

    const tgrid = updateCells(i, j, 1);

    setGrids(tgrid);

    setSeq([...seq, [i, j]]);
  };

  return (
    <div>
      <h1>Grid Lights</h1>
      <div className="grid">
        {grids.map((row, i) =>
          row.map((col, j) => (
            <div
              key={Number(i + j)}
              className={`cell  ${col == 1 ? "green" : "black"}`}
              onClick={() => change(i, j)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
