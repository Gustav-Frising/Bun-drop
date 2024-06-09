import React, { } from "react";
import "./MenuCard.css";

function MenuCard(category, menu) {
  const filteredMenu =
    category === "all"
      ? menu
      : menu.filter((m) => m.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="menu">
      <div className="menu-list">
        {/* loop over filtered menu and display matching categories*/}
        {filteredMenu.map((m) => (
          <div key={m.id} className="menu-list-item">
            <img className="menu-img" src={`${m.image}`} alt="img" />
            <h2 className="menu-Name">{m.name}</h2>
            <p className="menu-description">
              {m.description} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ex, blanditiis.
            </p>
            <h1 className="menu-price">{m.price} Kr </h1>
            <div className="menu-button-container">
              {!cartItems[m.id] ? (
                <button className="menu-button">
                  <img src="/cart_icon.png" alt="cart" />
                  Add to Cart
                </button>
              ) : (
                <div className="count-container">
                  <img src="/minus_image.png" />
                  <p>{cartItems[m.id]}</p>

                  <img src="/plus_image.png" alt="" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCard;
