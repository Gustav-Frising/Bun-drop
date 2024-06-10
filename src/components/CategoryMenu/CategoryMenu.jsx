import React, { useState, useEffect } from "react";
import "./CategoryMenu.css";
function CategoryMenu({ category, setCategory }) {
  const [categories, setCategories] = useState([]);

  //fetch categories from the server
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="category-menu">
      <div className="category-list">
        {/* Map through categories and render a clickable list item for each */}
        {categories.map((c) => (
          <div
            onClick={() =>
              // if clicked category is already selected, set to "all",
              setCategory((prev) => (prev === c.name ? "all" : c.name))
            }
            key={c.name}
            className={`category-list-item ${
              category === c.name ? "active" : ""
            }`}
          >
            <img src={`${c.img}`} alt="img" />
            <p className="category-text">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;
