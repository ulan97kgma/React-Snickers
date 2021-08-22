import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";

function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(()=>{
    fetch("https://6121fd70f5849d0017fb4346.mockapi.io/items")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json);
    });
  }, [])

  return (
    <div className="wrapper clear">
      {cartOpened && <Cart onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              image={obj.imageUrl}
              onPlus={() => console.log("Добавлено в корзину")}
              onFavorite={() => console.log("Добавлено в закладки")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
