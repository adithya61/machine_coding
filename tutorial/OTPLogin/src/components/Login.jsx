import { useState, useRef } from "react";
import OTPUser from "./OTPUser";

const Login = () => {
  const [values, setValues] = useState([
    { id: 1, value: "", ref: useRef(null) },
    { id: 2, value: "", ref: useRef(null) },
    { id: 3, value: "", ref: useRef(null) },
    { id: 4, value: "", ref: useRef(null) },
  ]);

  const move = (e, idx) => {
    if (e.keyCode === 8) {
      if (e.target.value) return;
      if (idx - 1 >= 0) {
        values[idx - 1].ref.current.focus();
      }
      return;
    }

    if (e.keyCode < 48 || e.keyCode > 57) return;

    if (idx + 1 >= values.length) {
      let otp = "";
      values.forEach((val) => (otp += val["value"]));
      console.log("login successfull", otp + e.target.value);
      return;
    }
    values[idx + 1].ref.current.focus();
  };

  const handleChange = (e, id) => {
    const newValue = e.target.value.slice(0, 1);
    if ((newValue >= "0" && newValue <= "9") || newValue == "") {
      setValues((values) =>
        values.map((obj) => (obj.id == id ? { ...obj, value: newValue } : obj))
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-5 p-5 montserrat">
        <h1 className="text-2xl">Enter Phone number to send OTP</h1>
        <div className="flex items-center content-center">
          <span>+91&nbsp;</span>
          <input
            className=" outline p-2 border-purple-400 border-2"
            type="tel"
            autoFocus
            maxLength={10}
          />
        </div>
        <div className="flex gap-5 mt-8">
          <OTPUser
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            move={move}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
