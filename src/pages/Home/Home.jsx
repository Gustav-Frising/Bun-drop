import React from "react";
import "./Home.css";

const [category, setCategory] = useState("all");
const [menu, setMenu] = useState([]);
const menuRefs = useRef({});

function Home() {

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);
  
  return (
    <>
      <Header />
      <CategoryMenu category={category} setCategory={setCategory} />
      <MenuCard category={category} menu={menu} menuRefs={menuRefs} />
    </>
  );
}

export default Home;
