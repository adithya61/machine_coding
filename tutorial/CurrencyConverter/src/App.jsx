import { Dropdown } from "./components/Dropdown";
import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("SELECT");
  const [to, setTo] = useState("SELECT");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [favourites, setFavourites] = useState(
    localStorage.getItem("fav")?.split(",") || []
  );
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const fetchCurrencies = () => {
    try {
      fetch("https://api.frankfurter.app/currencies")
        .then((r) => r.json())
        .then((res) => setCurrencies(res));
    } catch (error) {
      console.log(error);
    }
  };

  const convertAmount = async () => {
    if (from === to || amount == 0 || from == "SELECT" || to == "SELECT")
      return;
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const res = await response.json();
      setResult(res["rates"][to]);
      setShowResult(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getFavourites = () => {
    if (localStorage.getItem("fav")) setFavourites(localStorage.getItem("fav"));
  };

  useEffect(() => {
    fetchCurrencies();
    getFavourites();
  }, []);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="app">
        <div className="conversion">
          <div className="currency">
            <div>From</div>
            <Dropdown
              handleChange={setFrom}
              data={currencies}
              val={from}
              favourites={favourites}
              isOpen={openFrom}
              toggleOpen={setOpenFrom}
              setFavourites={setFavourites}
            />
          </div>
          <div> &lt; = &gt; </div>
          <div className="currency">
            <div>To</div>
            <Dropdown
              handleChange={setTo}
              data={currencies}
              val={to}
              favourites={favourites}
              isOpen={openTo}
              setFavourites={setFavourites}
              toggleOpen={setOpenTo}
            />
          </div>
        </div>
        <div>
          <div>Amount</div>
          <input
            type="number"
            className="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <button className="convert" onClick={convertAmount}>
            Convert
          </button>
          {showResult && (
            <div style={{ margin: "0.5rem" }} className="result">
              Converted amount {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
