import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./MenuCard.css";
function MenuCard({ category, menu, menuRefs }) {
  const { addCartItem, removeCartItem, cartItems, userInfo } =
    useLocalStorage();

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //fetch user data and their favorites
  useEffect(() => {
    if (userInfo) {
      fetch(`http://localhost:3000/users/${userInfo.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFavorites(data.favorites || []);
        });
    }
  }, [userInfo]);

  // // Function to remove an item from favorites
  async function removeFromFavorites(id) {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    updateUserFavorites(newFavorites);
  }
  // Function to add an item to favorites
  const addToFavorites = (item) => {
    if (!favorites.find((fav) => fav.id === item.id)) {
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      updateUserFavorites(newFavorites);
    }
  };
  // Function to update the user's favorites in the backend
  function updateUserFavorites(favoritesList) {
    const updatedUser = { ...user, favorites: favoritesList };

    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    };

    fetch(`http://localhost:3000/users/${user.id}`, putOptions);
  }
  const handleFavoriteClick = (item) => {
    if (favorites.find((fav) => fav.id === item.id)) {
      removeFromFavorites(item.id); // If item is already a favorite, remove it
    } else {
      addToFavorites(item); // If item is not a favorite, add it
    }
  };

  //filter menu based on category else show all
  const filteredMenu =
    category === "all"
      ? menu
      : menu.filter((m) => m.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="menu">
      <div className="menu-list">
        {/* loop over filtered menu and display matching categories*/}
        {filteredMenu.map((m) => (
          <div
            key={m.id}
            className="menu-list-item"
            ref={(el) => (menuRefs.current[m.id] = el)} // Set reference for scrolling to this item
          >
            <img className="menu-img" src={`${m.image}`} alt="img" />
            <h2 className="menu-Name">{m.name}</h2>
            <p className="menu-description">
              {m.description} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ex, blanditiis.
            </p>
            <h1 className="menu-price">
              {m.price} Kr{" "}
              {favorites.find((fav) => fav.id === m.id) ? (
                <img
                  className="favorite"
                  src="FavoriteFill_img.png"
                  alt="Remove from favorites"
                  onClick={() => handleFavoriteClick(m)}
                />
              ) : (
                <img
                  className="favorite"
                  src="Favorite_img.png"
                  alt="Add to favorites"
                  onClick={() => handleFavoriteClick(m)}
                />
              )}
            </h1>
            <div className="menu-button-container">
              {!cartItems[m.id] ? (
                <button
                  className="menu-button"
                  onClick={() => addCartItem(m.id)}
                >
                  <img src="/cart_icon.png" alt="cart" />
                  Add to Cart
                </button>
              ) : (
                <div className="count-container">
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCard;
