import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddressModal from "./AddressModal";
import Header from "./Header";
import "../styles/CheckoutAddressPage.css";

const CheckoutAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSelectAddress = (address) => {
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    navigate("/checkout");
  };

  return (
    <div>
      <Header />
      <div className="checkout-address-page">
        <div className="address-page-header">
          <button onClick={() => navigate("/checkout")} className="back-button">
            <span>←</span> Back to Checkout
          </button>
          <h1>Select Delivery Address</h1>
          <button onClick={handleAddNewAddress} className="add-address-button">
            + Add New Address
          </button>
        </div>

        <div className="address-page-content">
          {addresses.length === 0 ? (
            <div className="no-addresses">
              <p>No addresses saved yet</p>
              <button
                onClick={handleAddNewAddress}
                className="add-address-button"
              >
                Add Your First Address
              </button>
            </div>
          ) : (
            <div className="addresses-grid">
              {addresses.map((address) => (
                <div key={address._id} className="address-card">
                  <div className="address-content">
                    <p className="address-text">{address.fullAddress}</p>
                    <p className="address-details">
                      {address.cityDistrict}, {address.state}
                    </p>
                    <p className="address-details">PIN: {address.pinCode}</p>
                    <p className="address-details">
                      Phone: {address.phoneNumber}
                    </p>
                  </div>

                  <div className="address-card-actions">
                    <div className="edit-delete-actions">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                    <button
                      onClick={() => handleSelectAddress(address)}
                      className="select-button"
                    >
                      Deliver Here
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AddressModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAddress(null);
          }}
          address={editingAddress}
          onSubmit={fetchAddresses}
        />
      </div>
    </div>
  );
};

export default CheckoutAddressPage;
