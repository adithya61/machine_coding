import { useParams } from "react-router-dom";
const ProductsDetails = () => {
  const { id } = useParams();
  return <div>Products detail {id}</div>;
};

export default ProductsDetails;
