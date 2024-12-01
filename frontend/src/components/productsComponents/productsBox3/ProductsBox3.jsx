import "./productsBox3.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import ProductsBox2 from "../productsBox2/ProductsBox2";

const ProductsBox3 = () => {
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

  const [activeItem, setActiveItem] = useState("Offers");
  const categories = ["Burger", "Fries", "Pizza"];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

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
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="productsBox3">
      <div className="searchBoxHeader">
        <div className="searchBoxHeaderTop">
          <h4>All Offers from McDonald’s East London</h4>
          <form onSubmit={handleSearch} className="searchForm">
            <img src="./image/productsImage/SearchIcon.png" alt="" />
            <input
              type="text"
              placeholder="Search from menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
          </form>
        </div>
        <div className="searchBoxHeaderBottom">
          <ul>
            {[
              "Offers",
              "Burgers",
              "Fries",
              "Snacks",
              "Salads",
              "Cold drinks",
              "Happy",
              "Meal",
              "Desserts",
              "Hot drinks",
              "Sauces",
              "Orbit",
            ].map((item) => (
              <li
                key={item}
                onClick={() => handleItemClick(item)}
                className={activeItem === item ? "activeButton" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductsBox2 />

      {/* ------------------------- */}

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="categoryContainer">
          {filteredCategories.map((category) => (
            <div key={category} className="category">
              <h2>{category}</h2>
              <div className="itemContainer">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={`${category}-${product._id}`} className="item">
                      <div className="itemLeft">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">Rs. {product.price.toFixed(2)}</p>
                      </div>
                      <div className="itemRight">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="itemBtn">
                        <button
                          className="addToCartBtn"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="noProducts">
                    No products available in this category
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isCartOpen && (
        <div>
          <div>
            <h2>My Cart</h2>
            <button className="closeCartBtn" onClick={toggleCart}>
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
      )}
    </div>
  );
};

export default ProductsBox3;
