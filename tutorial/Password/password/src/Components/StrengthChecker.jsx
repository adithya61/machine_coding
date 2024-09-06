// eslint-disable-next-line react/prop-types
const StrengthChecker = ({ password = "" }) => {
  const getPasswordStrength = () => {
    const passwordLength = password.length;

    if (passwordLength < 1) return "";
    else if (passwordLength < 4) return "very weak";
    else if (passwordLength < 8) return "poor";
    else if (passwordLength < 12) return "Medium";
    else if (passwordLength < 16) return "Strong";
    else return "Very Strong";
  };

  const strength = getPasswordStrength();

  if (!strength) return <></>;

  return (
    <div className="passwordStrength">
      {" "}
      <div> Strength</div> <div>{strength}</div>{" "}
    </div>
  );
};

export default StrengthChecker;
