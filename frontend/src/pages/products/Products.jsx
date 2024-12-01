import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./products.css";
import ProductsBox1 from "../../components/productsComponents/productsBox1/ProductsBox1";
import ProductsBox3 from "../../components/productsComponents/productsBox3/ProductsBox3";

function Products() {
  return (
    <div className="productsContainer">
      <div className="productStickyDiv">
        <Navbar />
        <Header />
      </div>

      <div className="productScrollableDiv">
        <ProductsBox1 />
        <ProductsBox3 />
      </div>
    </div>
  );
}

export default Products;
