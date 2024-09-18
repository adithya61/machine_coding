import { useState } from "react";
import Comment from "./assets/components/Comment";

function App() {
  const [query, setQuery] = useState([
    {
      child: 1,
      isDisabled: true,
      children: [],
    },

    {
      child: 2,
      isDisabled: true,
      children: [],
    },
  ]);
  const [uniqueId, setUniqueId] = useState(3);

  //   Functions
  const updateQueryById = (data, id) => {
    return data.map((node) => {
      if (node.child == id) return { ...node, isDisabled: false };
      else if (node.children && node.children.length > 0) {
        return { ...node, children: updateQueryById(node.children, id) };
      }
      return node;
    });
  };

  const createQueryById = (data, id) => {
    return data.map((node) => {
      if (node.child == id)
        return {
          ...node,
          children: [{ child: uniqueId, isDisabled: true, children: [] }],
        };
      else if (node.children && node.children.length > 0) {
        return { ...node, children: createQueryById(node.children, id) };
      }
      return node;
    });
  };

  const submitComment = (id) => {
    const container = document.querySelector(`.comment-${id}`);
    container.style.backgroundColor = "#F5F5F5";
    container.setAttribute("readOnly", "true");

    const replyBtn = document.querySelector(`.reply-${id}`);
    replyBtn.style.backgroundColor = "#4379f2";
    const updatedQueryObj = updateQueryById(query, id);

    setQuery(updatedQueryObj);

    const commentSubmit = document.querySelector(`.submit-btn-${id}`);
    commentSubmit.style.display = "none";
  };

  const onReply = (id) => {
    const updatedQueryObj = createQueryById(query, id);
    console.log(updatedQueryObj, "updated obje");

    setQuery(updatedQueryObj);

    setUniqueId((id) => id + 1);
  };

  return (
    <div>
      {query.map(
        (node) => (
          console.log(node, "node"),
          console.log(query, "query"),
          (
            <Comment
              key={node.child}
              submitComment={submitComment}
              onReply={onReply}
              query={node}
            />
          )
        )
      )}
    </div>
  );
}
export default App;
