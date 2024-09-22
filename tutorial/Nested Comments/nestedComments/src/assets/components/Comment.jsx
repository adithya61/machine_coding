function Comment({ handlers, query }) {
  return (
    <div>
      <div className="px-16 comment-container">
        <h1 className="p-10">
          <b>Nested Comments</b>
        </h1>
        <div className="mb-8 flex flex-row items-center gap-4">
          <textarea
            name="comment"
            id="comment"
            className={` outline p-3 comment-${query.id}`}
            placeholder="Enter comment"
            rows="6"
            cols="100"
          ></textarea>
          <button
            onClick={() => handlers.submitComment(query.id)}
            className={`submit-btn-${query.id} p-3 bg-blue-600 text-white rounded-md m-1`}
          >
            Submit
          </button>
        </div>
        <div className="comment-utility flex flex-row gap-3">
          <button
            className={`reply-${query.id}`}
            onClick={() => handlers.onReply(query.id)}
            disabled={query.isDisabled}
          >
            Reply
          </button>
          <button onClick={() => handlers.onUpVote(query.id)}>Upvote</button>
          <button onClick={() => handlers.onDownVote(query.id)}>
            Downvote
          </button>
          <button onClick={() => handlers.onEdit(query.id)}>Edit</button>
          <button onClick={() => handlers.onDelete(query.id)}>Delete</button>
          <button>{query.votes}</button>
        </div>
      </div>
      {/* Recursive comment's rendering */}
      {query.children &&
        query.children.length > 0 &&
        query.children.map((q) => (
          <div key={q.child} className="ml-28">
            {<Comment handlers={handlers} query={q} />}
          </div>
        ))}
    </div>
  );
}

export default Comment;
