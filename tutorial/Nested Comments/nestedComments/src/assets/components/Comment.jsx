function Comment({ submitComment, onReply, query }) {
  console.log(query, "comment node");
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
            className={` outline p-3 comment-${query.child}`}
            placeholder="Enter comment"
            rows="6"
            cols="100"
          ></textarea>
          <button
            onClick={() => submitComment(query.child)}
            className={`submit-btn-${query.child} p-3 bg-blue-600 text-white rounded-md m-1`}
          >
            Submit
          </button>
        </div>
        <div className="comment-utility flex flex-row gap-3">
          <button
            className={`reply-${query.child}`}
            onClick={() => onReply(query.child)}
            disabled={query.isDisabled}
          >
            Reply
          </button>
          <button>Upvote</button>
          <button>Downvote</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      {/* Recursive comment's rendering */}
      {query.children.length > 0 &&
        query.children.map((q) => (
          <div key={q.child} className="ml-28">
            {
              <Comment
                submitComment={submitComment}
                onReply={onReply}
                query={q}
              />
            }
          </div>
        ))}
    </div>
  );
}

export default Comment;
