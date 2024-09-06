import useNotification from "./hooks/useNotification";
function App() {
  const { notificationComponent, triggerNotification } =
    useNotification("top-right");

  return (
    <div className="container">
      {notificationComponent}
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "test notification",
          })
        }
      >
        Trigger success
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "info",
            message: "test notification",
          })
        }
      >
        Trigger info
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "warning",
            message: "test notification",
          })
        }
      >
        Trigger warning
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "test notification",
          })
        }
      >
        Trigger error
      </button>
    </div>
  );
}
export default App;
