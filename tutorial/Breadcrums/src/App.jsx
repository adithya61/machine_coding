import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Breadcrums from "./components/Breadcrums";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductsDetails from "./components/ProductsDetails";

function App() {
  return (
    <>
      <h1>welcome to app</h1>
      <div>
        <BrowserRouter>
          <Breadcrums />
          <Routes>
            <Route path={"/home"} element={<Home />}></Route>
            <Route path={"/products"} element={<Products />}></Route>
            <Route path={"/products/:id"} element={<ProductsDetails />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
