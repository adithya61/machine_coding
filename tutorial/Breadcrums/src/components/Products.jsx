import { Link } from "react-router-dom";
const Products = () => {
  const ids = [1, 2, 3, 4];
  return (
    <div>
      <h1>Products page</h1>
      <div className="products-grid">
        {ids.map((id) => (
          <Link key={id} to={`/products/${id}`}>
            Product {id}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
