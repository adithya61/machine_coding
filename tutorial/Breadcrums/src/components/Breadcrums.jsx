import { Link, useLocation } from "react-router-dom";

const Breadcrums = () => {
  const location = useLocation();
  const breadcrumPath = location.pathname.split("/");

  return (
    <>
      <div className="links">
        <Link
          className={
            location.pathname.startsWith("/home") ? "active" : "inactive"
          }
          to={"/home"}
        >
          Home
        </Link>
        <Link
          to={"/products"}
          className={
            location.pathname.startsWith("/products") ? "active" : "inactive"
          }
        >
          Products
        </Link>
      </div>
    </>
  );
};

export default Breadcrums;
