import { useEffect, useState } from "react";

function App() {
  const mat = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const [ar, setAr] = useState([
    { number: 0, isSelected: false },
    { number: 1, isSelected: false },
    { number: 2, isSelected: false },
    { number: 3, isSelected: false },
    { number: 4, isSelected: false },
    { number: 5, isSelected: false },
    { number: 6, isSelected: false },
    { number: 7, isSelected: false },
    { number: 8, isSelected: false },
  ]);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.range;
  }, []);

  const changeBg = (idx, drag = isDragging) => {
    if (drag == false && isDragging == false) return;

    if (isDragging != drag) setIsDragging(drag);

    let updatedItem = [...ar];
    updatedItem[idx].isSelected = true;
    setAr(updatedItem);
  };

  return (
    <>
      <h1>Selectable Grid</h1>
      <div className="grid">
        {mat.map((row, i) =>
          row.map((cell, j) => (
            <div
              className={`${
                ar[i * 3 + j].isSelected ? "cell selected" : "cell"
              } `}
              key={ar[i * 3 + j].number}
              onMouseDown={() => changeBg(ar[i * 3 + j].number, true)}
              onMouseMove={() => changeBg(ar[i * 3 + j].number)}
              onMouseUp={() => changeBg(ar[i * 3 + j].number, false)}
            >
              {i * 3 + j}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
