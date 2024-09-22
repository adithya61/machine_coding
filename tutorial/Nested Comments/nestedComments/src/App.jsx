import Comment from "./assets/components/Comment";
import UseHandlers from "./hooks/UseHandlers";

function App() {
  const { query, handlers } = UseHandlers();

  //  ? Render the page.

  return (
    <div className="p-5">
      <div className="flex gap-3">
        <button
          onClick={handlers.addCommentBlank}
          className="  border-2 border-black p-2 bg-blue-300"
        >
          Add Comment
        </button>
        <button
          onClick={handlers.sortByDate}
          className="  border-2 border-black p-2 bg-blue-300"
        >
          Sort by Date
        </button>
        <button
          onClick={handlers.sortByVotes}
          className="  border-2 border-black p-2 bg-blue-300"
        >
          Sort by Votes
        </button>{" "}
      </div>
      {query.map((node) => (
        <Comment key={node.id} handlers={handlers} query={node} />
      ))}
    </div>
  );
}
export default App;
