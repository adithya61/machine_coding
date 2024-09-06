import { useRef, useState } from "react";

function App() {
  const MouseDown = useRef(false);
  const startPos = useRef({});
  const selectedId = useRef();
  const notes = useRef(JSON.parse(localStorage.getItem("notes")));
  const [noteText, setNoteText] = useState("");

  const handleMouseDown = (e, id) => {
    selectedId.current = id;
    e.preventDefault();
    document.addEventListener("mouseup", (e) => handleMouseUp(e));
    document.addEventListener("mousemove", (e) => handleMouseMove(e));
    notes.current[id - 1] = {
      ...notes.current[id - 1],
      initialPosX: e.clientX,
      initialPosY: e.clientY,
    };
    let element = document.querySelector("#note" + id);
    startPos.current = { posX: element.offsetLeft, posY: element.offsetTop };
    MouseDown.current = true;
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    let id = selectedId.current;
    if (!MouseDown.current) return;
    let element = document.querySelector("#note" + id);

    let movedX = notes.current[id - 1].initialPosX - e.clientX;
    let movedY = notes.current[id - 1].initialPosY - e.clientY;
    notes.current[id - 1] = {
      ...notes.current[id - 1],
      initialPosX: e.clientX,
      initialPosY: e.clientY,
    };
    element.style.top = element.offsetTop - movedY + "px";
    element.style.left = element.offsetLeft - movedX + "px";
  };

  const checkOverlap = (fullPos) => {
    let id = selectedId.current;
    return !notes.current.every((note) => {
      if (note.id == id) return true;

      let element = document.querySelector("#note" + note.id);
      let curPos = element.getBoundingClientRect();

      return !(
        fullPos.top < curPos.bottom &&
        fullPos.bottom > curPos.top &&
        fullPos.left < curPos.right &&
        fullPos.right > curPos.left
      );
    });
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    let id = selectedId.current;
    let element = document.querySelector("#note" + id);
    let fullPos = element.getBoundingClientRect();

    if (checkOverlap(fullPos, id)) {
      element.style.left = startPos.current.posX + "px";
      element.style.top = startPos.current.posY + "px";

      notes.current[id - 1].initialPosX = startPos.current.posX;
      notes.current[id - 1].initialPosX = startPos.current.posY;
    }

    MouseDown.current = false;
    document.removeEventListener("mouseup", (e) => handleMouseUp(e));
    document.removeEventListener("mousemove", (e) => handleMouseMove(e));

    localStorage.setItem("notes", JSON.stringify(notes.current));
  };

  const addNote = () => {
    let updatedNotes = [
      ...notes.current,
      {
        id: notes.current.length + 1,
        desc: noteText,
        initialPosX: "",
        initialPosY: "",
      },
    ];
    notes.current = updatedNotes;

    localStorage.setItem("notes", JSON.stringify(notes.current));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="add new note"
        />
        <button onClick={addNote}>Add new</button>
      </div>
      {notes.current.map((item) => (
        <div
          key={item.id}
          id={"note" + item.id}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
          className="note"
        >
          {item.desc}
        </div>
      ))}
    </div>
  );
}
export default App;
