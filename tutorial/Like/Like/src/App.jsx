import { useState } from "react";
import "./App.css";
import { FaHeart } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";

function App() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectLiked = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setLiked(!liked);
      setLoading(false);
      console.log(res.json());
    });
  };
  return (
    <div className="flex flex-row items-center gap-3">
      <span className=" block">
        {!loading && <FaHeart color={`${liked ? "red" : "black"}`} />}
        {loading && <ImSpinner />}
      </span>
      <span
        onClick={selectLiked}
        className=" border-2 border-black rounded-lg p-2 hover:cursor-pointer
      hover:bg-red-500 hover:text-white"
      >
        Like
      </span>
    </div>
  );
}

export default App;
