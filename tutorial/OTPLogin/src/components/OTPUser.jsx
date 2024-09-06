const OTPUser = ({ handleChange, values, move }) => {
  return (
    <div className="flex gap-2">
      {values.map(({ value, id, ref }, idx) => (
        <input
          key={id}
          ref={ref}
          className=" otp-input outline w-10 h-10 "
          type="text"
          value={value}
          onChange={(e) => handleChange(e, id)}
          onKeyUp={(e) => move(e, idx)}
        />
      ))}
    </div>
  );
};

export default OTPUser;
