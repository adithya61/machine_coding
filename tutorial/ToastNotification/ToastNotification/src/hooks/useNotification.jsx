import { useCallback, useState } from "react";
import Notification from "../components/Notification";

const useNotification = (position) => {
  const [notification, setNotification] = useState(null);

  let timer;

  const triggerNotification = useCallback((notificationProps) => {
    clearTimeout(timer);
    setNotification(notificationProps);

    timer = setTimeout(() => {
      setNotification(null);
      clearTimeout(timer);
    }, 3500);
  }, []);

  const onClose = () => {
    setNotification(null);
  };

  const notificationComponent = notification ? (
    <div className={`notification-container notification-${position}`}>
      <Notification {...notification} onClose={onClose} />
    </div>
  ) : null;

  return { notificationComponent, triggerNotification };
};

export default useNotification;
