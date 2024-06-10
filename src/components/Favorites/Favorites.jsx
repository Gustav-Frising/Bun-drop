import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Favorites.css";

function Favorites({ menuRefs }) {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const { userInfo } = useLocalStorage();

  //fetch user data and their favorites
  useEffect(() => {
    if (userInfo) {
      fetch(`http://localhost:3000/users/${userInfo.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setFavorites(data.favorites || []); // Update favorites based on user data
        });
    }
  }, [favorites]);

  // Function to scroll to a specific menu item based on its ID
  const scrollToMenuItem = (id) => {
    const menuItemElement = menuRefs.current[id];
    if (menuItemElement) {
      menuItemElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="favorites-container">
      <h1>Favorite Items</h1>
      <div className="favorites-list">
        {/* Map through favorites and render each favorite item */}
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorites-list-item">
            <img
              className="favorites-img"
              src={favorite.image}
              alt={favorite.name}
            />
            <h2 className="favorites-name">{favorite.name}</h2>
            <h3 className="favorites-price">{favorite.price} Kr</h3>
            <button onClick={() => scrollToMenuItem(favorite.id)}>
              Scroll to Menu Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
