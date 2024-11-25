import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
// import "../../styles/Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="formContainer">
          <div className="logo1">
            <img src="./image/Logo_1.png" alt="" className="logoImage" />
          </div>
          <div className="description">
            <h2>Welcome Back</h2>
            <p>Today is a new day. It's your day. You shape it.</p>
            <p>Sign in to start ordering.</p>
          </div>
          <form onSubmit={handleSubmit} className="loginForm">
            {error && <div className="error">{error}</div>}
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button type="submit">Sign in</button>
            <p>
              Don't you have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
        <div className="imageContainer">
          <img src="./image/Art.jpg" alt="image" className="artImage" />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Login;
