import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import MenuCard from "../../components/MenuCard/MenuCard";
import Favorites from "../../components/Favorites/Favorites";

function Home() {
  const [category, setCategory] = useState("all");
  const [menu, setMenu] = useState([]);
  const menuRefs = useRef({});

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);
  return (
    <>
      <Header />
      <Favorites menuRefs={menuRefs} />
      <CategoryMenu category={category} setCategory={setCategory} />
      <MenuCard category={category} menu={menu} menuRefs={menuRefs} />
    </>
  );
}

export default Home;
