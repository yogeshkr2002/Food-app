import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import PopularRestaurants from "../../components/popularRestaurants/PopularRestaurants";
import { useAuth } from "../../context/AuthContext";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import HomeBox1 from "../../components/homeComponents/homeBox1/HomeBox1";
import HomeBox2 from "../../components/homeComponents/homeBox2/HomeBox2";
import HomeBox3 from "../../components/homeComponents/homeBox3/HomeBox3";
import HomeBox4 from "../../components/homeComponents/homeBox4/HomeBox4";
import Footer from "../../components/footer/Footer";
// import "../../styles/Home.css";

function Home() {
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/home", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <div className="homeContainer">
      <div className="homeStickyDiv">
        <Navbar />
        <Header />
      </div>
      <div className="homeScrollableDiv">
        <HomeBox1 />
        <HomeBox2 />
        <HomeBox3 />
        <PopularRestaurants />
        <HomeBox4 />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
