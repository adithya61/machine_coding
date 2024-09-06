import { useState } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
import { useEffect } from "react";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  //   Calculate EMI.

  const calculateEMI = (downPayment) => {
    if (!cost) return;

    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  //   Calculate Down Payment

  const calculateDownPayment = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;

    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const updateEmi = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEMI(dp);

    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDownPayment(emi);

    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalLoanAmount = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  // ! Rendering...

  return (
    <>
      <div className="app">
        <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
          EMI Calculator
        </span>

        <TextInput
          title={"Total Cost of Assets"}
          state={cost}
          setState={setCost}
          slug={"cost"}
        />

        <TextInput
          title={"Interest Rate (%)"}
          state={interest}
          setState={setInterest}
          slug={"interest"}
        />

        <TextInput
          title={"Processing fee (%)"}
          state={fee}
          setState={setFee}
          slug={"processingfee"}
        />

        {/* Down payment */}

        <SliderInput
          title={"Down Payment"}
          total={totalDownPayment}
          val={downPayment}
          mininum={0}
          maximum={cost}
          minLabel={"0%"}
          maxLabel={"100%"}
          update={updateEmi}
          underlineText={"Total Down Payment"}
        />

        {/* Loan amount */}

        <SliderInput
          title={"Loan Per Month"}
          total={totalLoanAmount}
          val={emi}
          mininum={calculateEMI(cost)}
          maximum={calculateEMI(0)}
          update={updateDownPayment}
          underlineText={"Total Loan Amount"}
        />

        {/* Tenure */}

        <span className="title"> Tenure </span>
        <div className="tenure_Container">
          {tenureData.map((t) => (
            <button
              key={t}
              className={`tenure__btn ${t == tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
export default App;
