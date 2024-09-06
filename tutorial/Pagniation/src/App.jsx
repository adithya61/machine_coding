import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const handleSelectPage = (ind) => {
    if (ind <= 0 || ind > products.length / 10) return;
    setPage(ind);
  };
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div>
      {/* Products. */}
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((p) => {
            return (
              <span key={p.id} className="products__single">
                <img src={p.thumbnail} alt="product-image" />
              </span>
            );
          })}
        </div>
      )}
      {/* Pagination. */}
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => handleSelectPage(page - 1)}>◀️</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handleSelectPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span onClick={() => handleSelectPage(page + 1)}>▶️</span>
        </div>
      )}
    </div>
  );
}

export default App;
