const Pill = ({ image, text, onClick }) => {
  return (
    <div className="user-pill" onClick={onClick}>
      <img src={image} alt="user_icon" />
      <span>{text}</span>
    </div>
  );
};

export default Pill;
