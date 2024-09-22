import { useState } from "react";

export function App() {
  const [query, setQuery] = useState([
    {
      child: 1,
      isDisabled: true,
      date: new Date().toISOString(),
      votes: 0,
      children: [],
    },

    {
      child: 2,
      isDisabled: true,
      date: new Date().toISOString(),
      votes: 0,
      children: [],
    },
  ]);

  const [uniqueId, setUniqueId] = useState(3);

  //   Functions
  const enableReplyBtn = (data, id) => {
    return data.map((node) => {
      if (node.child == id) return { ...node, isDisabled: false };
      else if (node.children && node.children.length > 0) {
        return { ...node, children: enableReplyBtn(node.children, id) };
      }
      return node;
    });
  };

  // Delete
  const deleteQueryById = (data, id) => {
    let res = [];
    data.forEach((node) => {
      if (node.child != id) {
        if (node.children && node.children.length > 0)
          res.push({ ...node, children: deleteQueryById(node.children, id) });
        else res.push(node);
      }
    });

    return res;
  };

  const createReplyComment = (data, id) => {
    return data.map((node) => {
      if (node.child == id)
        return {
          ...node,
          children: [
            {
              child: uniqueId,
              isDisabled: true,
              children: [],
              date: new Date().toISOString(),
              votes: 0,
            },
          ],
        };
      else if (node.children && node.children.length > 0) {
        return { ...node, children: createReplyComment(node.children, id) };
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
    const updatedQueryObj = enableReplyBtn(query, id);

    setQuery(updatedQueryObj);

    const commentSubmit = document.querySelector(`.submit-btn-${id}`);
    commentSubmit.style.display = "none";
  };

  const onReply = (id) => {
    const updatedQueryObj = createReplyComment(query, id);

    setQuery(updatedQueryObj);

    setUniqueId((id) => id + 1);
  };

  const onEdit = (id) => {
    const container = document.querySelector(`.comment-${id}`);
    container.style.backgroundColor = "white";
    container.removeAttribute("readOnly");

    const commentSubmit = document.querySelector(`.submit-btn-${id}`);
    commentSubmit.style.display = "unset";
  };

  const onDelete = (id) => {
    const updatedQueryObj = deleteQueryById(query, id);
    setQuery(updatedQueryObj);
  };

  const upVoteById = (data, id) => {
    return data.map((node) => {
      if (node.child == id) return { ...node, votes: node.votes + 1 };
      else if (node.children && node.children.length > 0) {
        return { ...node, children: upVoteById(node.children, id) };
      }
      return node;
    });
  };

  const onUpVote = (id) => {
    const updatedQueryObj = upVoteById(query, id);
    setQuery(updatedQueryObj);
  };

  const downVoteById = (data, id) => {
    return data.map((node) => {
      if (node.child == id) return { ...node, votes: node.votes - 1 };
      else if (node.children && node.children.length > 0) {
        return { ...node, children: downVoteById(node.children, id) };
      }
      return node;
    });
  };

  const onDownVote = (id) => {
    const updatedQueryObj = downVoteById(query, id);
    setQuery(updatedQueryObj);
  };

  const sortByVotes = () => {
    query.sort((a, b) => (a.votes < b.votes ? -1 : 1));
  };

  //  ? Render the page.
  return (
    <div>
      {query.map((node) => (
        <Comment
          key={node.child}
          submitComment={submitComment}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          //   sortByVotes={sortByVotes}
          query={node}
        />
      ))}
    </div>
  );
}
