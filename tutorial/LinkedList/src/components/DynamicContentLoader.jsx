import { useState } from "react";
import useLRU from "../hooks/useLRU";

const DynamicContentLoader = () => {
  const [content, setContent] = useState([]);
  const { get, put } = useLRU(3);

  const loadContent = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadedContent = {
      id,
      text: `Tab ${id} Data`,
    };

    put(id, loadContent);

    setContent((prev) => [...prev, loadedContent]);
  };

  const handleButtonClick = (id) => {
    const cachedContent = get(id);
    if (cachedContent) {
      console.log(`fetched from cache id : ${id}`);
      setContent((prev) => [...prev, cachedContent]);
    } else {
      console.log(`loading content ${id}`);
      loadContent(id);
    }
  };

  return (
    <div>
      <h2>Dynamic Content Loader with LRU Cache</h2>
      <button onClick={() => handleButtonClick(1)}>Tab 1</button>
      <button onClick={() => handleButtonClick(2)}>Tab 2</button>
      <button onClick={() => handleButtonClick(3)}>Tab 3</button>
      <button onClick={() => handleButtonClick(4)}>Tab 4</button>
      <button onClick={() => handleButtonClick(5)}>Tab 5</button>
      <div>
        <h3>Uploaded Content</h3>
        <ul>
          {content.map((c, i) => (
            <li key={`${c.id} ${i}`}>{c.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicContentLoader;
