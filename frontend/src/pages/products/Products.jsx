import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import PopularRestaurants from "../../components/popularRestaurants/PopularRestaurants";
import CustomerReviews from "../../components/reviews/CustomerReviews";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/navbar/Navbar";
import "./products.css";
import ProductsBox1 from "../../components/productsComponents/productsBox1/ProductsBox1";
import ProductsBox2 from "../../components/productsComponents/productsBox2/ProductsBox2";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
    isCartOpen,
    toggleCart,
  } = useCart();

  const categories = ["Burger", "Fries", "Pizza"];
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSearchTerm(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const allProducts = response.data[Object.keys(response.data)[0]] || [];
        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching products data"
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.token]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already happening through the filteredCategories
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <Header />
        <div className="productsContainer">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productsContainer">
      <div className="productStickyDiv">
        <Navbar />
        <Header />
      </div>
      <div className="productScrollableDiv">
        {/* <ProductsBox1 /> */}
        <div className="productsBox3">
          <div className="searchBoxHeader">
            <h4>All Offers from McDonald’s East London</h4>
            {/* Search section */}

            <form onSubmit={handleSearch} className="searchForm">
              <img src="./image/productsImage/SearchIcon.png" alt="" />
              <input
                type="text"
                placeholder="Search from menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />
              {/* {searchTerm && (
                <button
                  type="button"
                  className="clearSearchBtn"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )} */}
              {/* <button type="submit" className="search-button">
                  Search
                </button> */}
            </form>

            {/* --------- Category Header --------- */}

            {/* <div className="categories-header">
                {filteredCategories.map((category) => (
                  <div key={category} className="category-label">
                    {category}
                  </div>
                ))}
              </div> */}
          </div>

          {/* ------------------------- */}

          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              {filteredCategories.map((category) => (
                <div key={category} className="category-section">
                  <h2>{category}</h2>
                  <div className="products-scroll">
                    <div className="products-row">
                      {products.length > 0 ? (
                        products.map((product) => (
                          <div
                            key={`${category}-${product._id}`}
                            className="product-card"
                          >
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">${product.price.toFixed(2)}</p>
                            <button
                              className="add-to-cart-btn"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="no-products">
                          No products available in this category
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* {isCartOpen && (
            <div className="cart-sidebar">
              <div className="cart-header">
                <h2>My Cart</h2>
                <button className="close-cart" onClick={toggleCart}>
                  ×
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item._id} className="cart-item">
                        <div className="item-info">
                          <h3>{item.name}</h3>
                          <p>${item.price.toFixed(2)}</p>
                        </div>
                        <div className="item-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item._id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-total">
                      <h3>Total: ${getTotalAmount().toFixed(2)}</h3>
                    </div>
                    <Link to="/checkout" className="checkout-btn">
                      Checkout <span className="arrow">→</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )} */}
        </div>
        {/* <PopularRestaurants heading="Similar Restaurants" />
        <CustomerReviews /> */}
      </div>
    </div>
  );
}

export default Products;
