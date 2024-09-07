import Autocomplete from "./components/Autocomplete";
import SuggestionsList from "./components/SuggestionsList";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };
  const styles = {};

  return (
    <div>
      <Autocomplete
        placeholder={"enter receipe name"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoader={<>Loading Receipes...</>}
        onSelect={(res) => {
          console.log(res);
        }}
        onChage={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        styles={styles}
      />

    </div>
  );
}
export default App;
