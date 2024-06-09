import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Checkout.css";
import PaymentModal from "../../components/PaymenModal/PaymentModal";
function Ceckout() {
  const { calculateTotal, getCartItems, userInfo } = useLocalStorage();
  const [menu, setMenu] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({}); // State to manage input errors
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State to manage PaymentModal visibility

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const validateInputs = () => {
    const newErrors = {};

    if (firstName.length < 3)
      newErrors.firstName = "First name must be at least 3 characters";
    if (lastName.length < 3)
      newErrors.lastName = "Last name must be at least 3 characters";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email must contain a @";
    if (!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(address))
      newErrors.address = "Invalid address format";
    if (!/^[a-zA-Z\s]+$/.test(city))
      newErrors.city = "City can only contain letters";
    if (!/^\d+$/.test(zipCode))
      newErrors.zipCode = "Zip code can only contain numbers";
    if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone must be a valid 10-digit number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleProceedToPayment = () => {
    if (validateInputs()) {
      setShowPaymentModal(true);
    }
  };
  function handleCheckoutSubmit(e) {
    e.preventDefault();

    const cartItems = getCartItems();
    const total = calculateTotal(menu);
    const orderDetails = {
      userId: userInfo?.id,
      name: userInfo?.name,
      firstName,
      lastName,
      email,
      address,
      city,
      zipCode,
      phone,
      cartItems,
      total,
    };
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    };
    fetch(`http://localhost:3000/orders`, postOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Order placed successfully:", data);
        alert("Order placed successfully!");
      });
  }
  return (
    <div className="checkout-wrapper">
      <form className="checkout" onSubmit={handleCheckoutSubmit}>
        <div className="checkout-left">
          <p className="title">Delivery information</p>
          <div className="multi">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className="error">{errors.address}</p>}
          <div className="multi">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p className="error">{errors.city}</p>}
            <input
              type="text"
              placeholder="Zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            {errors.zipCode && <p className="error">{errors.zipCode}</p>}
          </div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="checkout-right"></div>

        <div className="summary-wrapper">
          <p className="title">Summary</p>
          <div className="cart-summary">
            <div className="cart-summary-details">
              <p>Subtotal</p>
              <p>{calculateTotal(menu)} kr</p>
            </div>
            <div className="cart-summary-details">
              <p>Delivery fee</p>
              <p>{20} kr</p>
            </div>
            <div className="cart-summary-details">
              <p>Total amount</p>
              <p>{calculateTotal(menu) + 20} kr</p>
            </div>
          </div>
          <button type="button" onClick={() => handleProceedToPayment(true)}>
            Proceed to payment
          </button>
        </div>
      </form>
      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          handleCheckoutSubmit={handleCheckoutSubmit}
        />
      )}
    </div>
  );
}

export default Ceckout;
