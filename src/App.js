import axios from "axios";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        "https://6121fd70f5849d0017fb4346.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://6121fd70f5849d0017fb4346.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://6121fd70f5849d0017fb4346.mockapi.io/items"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://6121fd70f5849d0017fb4346.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://6121fd70f5849d0017fb4346.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onDeleteProductInCart = (id) => {
    axios.delete(`https://6121fd70f5849d0017fb4346.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6121fd70f5849d0017fb4346.mockapi.io/favorites/${obj.id}`
        );
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6121fd70f5849d0017fb4346.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onDeleteProductInCart={onDeleteProductInCart}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Route exact path="/">
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />
      </Route>
      <Route exact path="/favorites">
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
