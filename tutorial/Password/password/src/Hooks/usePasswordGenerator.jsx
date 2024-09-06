import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (checkBoxData, length) => {
    let charset = "";
    let generatedPassword = "";

    const slelectedOptions = checkBoxData.filter((checkbox) => checkbox.state);

    if (slelectedOptions.length == 0) {
      setError("Select atleast one checkbox.");
      setPassword("");
      return;
    }

    slelectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include UpperCase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include LowerCase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;

        case "Include Numbers":
          charset += "0123456789";
          break;

        case "Include Symbols":
          charset += "?/><.,;:|]}[{+=-_)(*&^%$#@!~`";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; ++i) {
      const randidx = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randidx];
    }

    setPassword(generatedPassword);
    setError("");
  };

  return { password, error, generatePassword };
};

export default usePasswordGenerator;
