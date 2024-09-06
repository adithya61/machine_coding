import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export function Dropdown({
  data,
  handleChange,
  val,
  favourites,
  setFavourites,
  isOpen,
  toggleOpen,
}) {
  const addFav = (key, e) => {
    e.stopPropagation();

    let updatedFav = [];

    if (favourites.includes(key)) {
      updatedFav = favourites.filter((item) => item != key);
    } else {
      updatedFav = [...favourites, key];
    }

    setFavourites(updatedFav);
    localStorage.setItem("fav", updatedFav);
  };

  const favList = Object.entries(data).filter(([key, value]) =>
    favourites.includes(key)
  );

  const othersList = Object.entries(data).filter(
    ([key, value]) => !favourites.includes(key)
  );

  const currencySelected = (key) => {
    handleChange(key);
    toggleOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="from-select"
        onClick={() => toggleOpen(!isOpen)}
        name="from"
        id="fr"
      >
        {val}
      </div>
      <div className={`cur ${isOpen ? "" : "hidden"}`}>
        {/* Render Favourite List */}
        {favList.map(([key, value]) => (
          <div
            key={key}
            value={key}
            onClick={() => currencySelected(key)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            {key}
            {favourites.includes(key) ? (
              <FaStar color="gold" onClick={(e) => addFav(key, e)} />
            ) : (
              <FaRegStar onClick={(e) => addFav(key, e)} />
            )}
          </div>
        ))}
        <hr />
        {/* Render others list */}
        {othersList.map(([key, value]) => (
          <div
            key={key}
            value={key}
            onClick={() => {
              handleChange(key);
              toggleOpen(!isOpen);
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            {key}
            <div className="fav">
              {favourites.includes(key) ? (
                <FaStar color="gold" onClick={(e) => addFav(key, e)} />
              ) : (
                <FaRegStar onClick={(e) => addFav(key, e)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
