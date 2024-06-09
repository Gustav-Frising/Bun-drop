import React, { useState, useEffect } from "react";
import "./Cart.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    addCartItem,
    removeCartItem,
    cartItems,
    deleteCartItems,
    calculateTotal,
  } = useLocalStorage();
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);
  //if any item in the cart has a quantity greater than 0, hasItemsInCart will be true
  const hasItemsInCart = Object.values(cartItems).some(
    (quantity) => quantity > 0
  );

  return (
    <div className="cart">
      <div className="cart-items">
        {menu.map((m) => {
          if (cartItems[m.id] > 0) {
            return (
              <div key={m.id} className="cart-items-item">
                <img className="cart-items-item-img" src={m.image} alt="" />
                <p>{m.name}</p>
                <p>{m.price} Kr</p>
                <div className="count">
                  <img
                    onClick={() => removeCartItem(m.id)}
                    src="/minus_image.png"
                  />
                  <p>{cartItems[m.id]}</p>
                  <img
                    onClick={() => addCartItem(m.id)}
                    src="/plus_image.png"
                    alt=""
                  />
                </div>
                <button onClick={() => deleteCartItems(m.id)}>Remove</button>
              </div>
            );
          }
        })}
      </div>
      <div className="summary-wrapper">
        <div className="cart-summary">
          <div className="cart-summary-details">
            <p>Subtotal</p>
            <p>{calculateTotal(menu)} kr</p>
            {console.log(menu)}
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
        <button
          onClick={() => hasItemsInCart && navigate("/checkout")}
          disabled={!hasItemsInCart}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
