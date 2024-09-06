import {
  AiFillCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";

const icons = {
  success: <AiOutlineCheckCircle />,
  info: <AiOutlineInfoCircle />,
  warning: <AiOutlineWarning />,
  error: <AiOutlineCloseCircle />,
};

const Notification = ({ type = "info", message, onClose = () => {} }) => {
  return (
    <div className={`notification notification-${type}`}>
      {icons[type]}
      {message}
      {
        <AiFillCloseCircle
          fill="white"
          className="close-btn"
          onClick={onClose}
        />
      }
    </div>
  );
};

export default Notification;
