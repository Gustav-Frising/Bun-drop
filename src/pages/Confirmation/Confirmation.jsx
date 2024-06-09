import React, { useState, useEffect } from "react";
import "./Confirmation.css";

function Confirmation() {
  const [order, setOrder] = useState(null);
  const [countdown, setCountdown] = useState(getRandomTime());

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const latestOrder = data[data.length - 1]; // Assuming the latest order is the last one in the array
          setOrder(latestOrder);
        }
      });
  }, [order]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 60000); // Timer updates every minute (60000 milliseconds)

    return () => clearTimeout(timer);
  }, [countdown]);

  function getRandomTime() {
    // Generate a random time between 15 to 35 minutes
    return Math.floor(Math.random() * (35 - 15 + 1) + 15);
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1>Order Confirmation</h1>
        <p>Order is on your way</p>
        {/* <p>Order ID: {order.id}</p>
        <p>Name : {order.firstName}</p>
        <p>Product(s) Ordered:</p>
        <p>Total Price: {order.total} kr</p> */}
        <p>Estimated Delivery Time: {countdown} minutes</p>
      </div>
    </div>
  );
}

export default Confirmation;
