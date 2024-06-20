import React, { useState } from "react";
import "./PaymentModal.css";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

function PaymentModal({ setShowPaymentModal, handleCheckoutSubmit }) {
  const { clearCart } = useLocalStorage();
  const [paymentMethod, setPaymentMethod] = useState("Swish"); // Default to Swish

  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({}); // State to manage input errors

  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log("Payment submitted", {
        phoneNumber,
        cardHolderName,
        cardNumber,
        expirationDate,
        cvv,
      });
      handleCheckoutSubmit(e);
      clearCart();
      navigate("/confirmation");
    }
  };
  const validateInputs = () => {
    const newErrors = {};

    if (paymentMethod === "Swish") {
      if (!/^\d{10}$/.test(phoneNumber))
        newErrors.phoneNumber = "Phone number must be a valid 10-digit number";
    } else {
      if (!/^[a-zA-Z\s]+$/.test(cardHolderName))
        newErrors.cardHolderName = "Invalid card holder name";
      if (!/^([0-9]{16})$/.test(cardNumber))
        newErrors.cardNumber = "Card number must be a valid 16-digit number";
      if (!/^\d{3}$/.test(cvv))
        newErrors.cvv = "CVV must be a valid 3-digit number";
      // Validate expiration date
      const [month, year] = expirationDate.split("/");
      if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 22)
        newErrors.expirationDate = "Expiration date must be valid (MM/YY)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="payment-modal">
      <form className="payment-modal-container" onSubmit={handlePayment}>
        <div className="payment-modal-title">
          <h2>Payment</h2>
          <img
            onClick={() => setShowPaymentModal(false)}
            src="/small_logo.png"
            alt=""
          />
        </div>
        <div className="payment-methods">
          <img
            src="Swish Logo Primary Dark-BG 1(1).png"
            alt="Swish"
            onClick={() => setPaymentMethod("Swish")}
          />
          <img
            src="/card_img.png"
            alt="Card"
            onClick={() => setPaymentMethod("Card")}
          />
        </div>
        <div className="payment-modal-inputs">
          {paymentMethod === "Swish" ? (
            <>
              <input
                type="text"
                placeholder="Phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Card Holder Name"
                required
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
              {errors.cardHolderName && (
                <p className="error">{errors.cardHolderName}</p>
              )}
              <input
                type="text"
                placeholder="Card Number"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {errors.cardNumber && (
                <p className="error">{errors.cardNumber}</p>
              )}
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Expiration Date (MM/YY)"
                  required
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
                <input
                  type="text"
                  className="cvv-input"
                  placeholder="CVV"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              {errors.expirationDate && (
                <p className="error">{errors.expirationDate}</p>
              )}
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </>
          )}
        </div>
        <button type="submit">
          {paymentMethod === "Swish" ? "Pay with Swish" : "Pay with Card"}
        </button>
      </form>
    </div>
  );
}

export default PaymentModal;
