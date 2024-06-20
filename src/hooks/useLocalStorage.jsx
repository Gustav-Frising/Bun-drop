import { useState, useEffect } from "react";

function useLocalStorage() {
  // Initialize state from localStorage, If there are cartItems parses into an object else initializes cartItems as an empty object
  const [cartItems, setCartItem] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : {};
  });
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem("user");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  //every time cart item changes store updated values
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function logInUser(username, password, users) {
    const user = users.find(
      (u) => u.name === username && u.password === password
    );

    if (user) {
      const userData = { id: user.id, name: user.name };
      localStorage.setItem("user", JSON.stringify(userData));
      setUserInfo(userData);
      return true;
    } else {
      return false;
    }
  }
  function logoutUser() {
    localStorage.removeItem("user");
    setUserInfo(null); // Optionally clear userInfo state
  }
  function clearCart() {
    // Clear only the cartItems from localStorage
    localStorage.removeItem("cartItems");
  }

  function addCartItem(itemId) {
    //If the item does not exist in the cart set it to 1
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      //else add 1
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  }
  //returns cartItem state
  function getCartItems() {
    return cartItems;
  }
  function deleteCartItems(itemId) {
    //copy the current cartItems, deletes the specified item, and updates the state with the new object.
    setCartItem((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId];
      return newCartItems;
    });
  }
  //decreases the quantity of an item in the cart by 1.
  function removeCartItem(itemId) {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }

  function calculateTotal(menu) {
    let totalAmount = 0;
    //loop over each item
    for (const item in cartItems) {
      //if its quantity is greater than zero find product id
      if (cartItems[item] > 0) {
        let itemInfo = menu.find((product) => product.id === item);
        if (itemInfo) {
          //multipy the price by the quantity and adds it to the total amount
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  return {
    logoutUser,
    logInUser,
    calculateTotal,
    setCartItem,
    addCartItem,
    removeCartItem,
    getCartItems,
    cartItems,
    deleteCartItems,
    userInfo,
    clearCart,
  };
}

export default useLocalStorage;
