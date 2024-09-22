import { useState } from "react";

const UseHandlers = () => {
  const [query, setQuery] = useState([
    {
      id: 1,
      isDisabled: true,
      date: new Date().toISOString(),
      votes: 0,
      children: [],
    },

    {
      id: 2,
      isDisabled: true,
      date: new Date().toISOString(),
      votes: 0,
      children: [],
    },
  ]);

  const [uniqueId, setUniqueId] = useState(3);

  const fns = () => {
    const addCommentBlank = () => {
      const temp = {
        id: uniqueId,
        isDisabled: true,
        children: [],
        date: new Date().toISOString(),
        votes: 0,
      };

      setQuery((query) => [temp, ...query]);
      setUniqueId((id) => id + 1);
    };

    const enableReplyBtn = (data, id) => {
      return data.map((node) => {
        if (node.id == id) return { ...node, isDisabled: false };
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
        if (node.id != id) {
          if (node.children && node.children.length > 0)
            res.push({ ...node, children: deleteQueryById(node.children, id) });
          else res.push(node);
        }
      });

      return res;
    };

    const createReplyComment = (data, id) => {
      return data.map((node) => {
        if (node.id == id)
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
        if (node.id == id) return { ...node, votes: node.votes + 1 };
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
        if (node.id == id) return { ...node, votes: node.votes - 1 };
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
      const temp = [...query];
      temp.sort((a, b) => {
        if (a.votes < b.votes) return 1;
        if (a.votes > b.votes) return -1;
        return 0;
      });
      setQuery(temp);
    };

    const sortByDate = () => {
      const temp = [...query];
      temp.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
      setQuery(temp);
    };

    return {
      onReply,
      onEdit,
      onDelete,
      onUpVote,
      onDownVote,
      submitComment,
      sortByVotes,
      sortByDate,
      addCommentBlank,
    };
  };

  const handlers = fns();

  return {
    query,
    handlers,
  };
};

export default UseHandlers;
