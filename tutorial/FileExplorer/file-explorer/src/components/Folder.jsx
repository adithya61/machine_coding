import { useState } from "react";

function Folder({ insertNode, explorer }) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handlePropagation = (e, isFolder) => {
    e.stopPropagation();
    setExpanded(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      insertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({
        ...showInput,
        visible: false,
      });
    }
  };

  if (explorer.isFolder)
    return (
      <div>
        <div className="folder" onClick={() => setExpanded(!expanded)}>
          🗂️ <span>{explorer.name}</span>
          <div className="btn">
            <button onClick={(e) => handlePropagation(e, false)}>
              File +{" "}
            </button>
            <button onClick={(e) => handlePropagation(e, true)}>
              Folder +
            </button>
          </div>
        </div>
        <div
          className="sub"
          style={{ display: expanded ? "flex" : "none", marginLeft: "30px" }}
        >
          {showInput.visible && (
            <div className="input_container">
              <span>{showInput.isFolder ? "🗂️" : "📄"}</span>
              <input
                onKeyDown={(e) => onAddFolder(e)}
                type="text"
                className="input__content"
                autoFocus
                onBlur={() =>
                  setShowInput({
                    ...showInput,
                    visible: false,
                  })
                }
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return <Folder insertNode={insertNode} explorer={exp} key={exp.id} />;
          })}
        </div>
      </div>
    );
  else return <span>📄 {explorer.name}</span>;
}

export default Folder;
