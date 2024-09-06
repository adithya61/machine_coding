import { useState } from "react";
import explorer from "./assets/data";
import "./App.css";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [data, setData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (id, item, isFolder) => {
    const finalTree = insertNode(data, id, item, isFolder);

    setData(finalTree);
  };

  return (
    <div>
      <Folder insertNode={handleInsertNode} explorer={data} />
    </div>
  );
}

export default App;
