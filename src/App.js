import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
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

        // const [cartResponse, favoritesResponse, itemsResponse] =
        //   await Promise.all([
        //     axios.get("https://6121fd70f5849d0017fb4346.mockapi.io/cart"),
        //     axios.get("https://6121fd70f5849d0017fb4346.mockapi.io/favorites"),
        //     axios.get("https://6121fd70f5849d0017fb4346.mockapi.io/items"),
        //   ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      }
      fetchData();
    } catch (error) {
      alert("Ошибка при запросе данных с сервера");
      console.error(error);
    }
  }, []);

  const onAddToCart = async (obj) => {
    try {
      // console.log(obj);
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        await axios.delete(
          `https://6121fd70f5849d0017fb4346.mockapi.io/cart/${obj.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post(
          "https://6121fd70f5849d0017fb4346.mockapi.io/cart",
          obj
        );
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при добавлении в корзину");
    }
  };

  const onDeleteProductInCart = async (id) => {
    try {
      await axios.delete(
        `https://6121fd70f5849d0017fb4346.mockapi.io/cart/${id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
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
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://6121fd70f5849d0017fb4346.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
      console.error(error);
    }
  };

  const hasItemInCart = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        hasItemInCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <div>
          <Cart
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onDeleteProductInCart={onDeleteProductInCart}
            opened={cartOpened}
          />
        </div>
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
          <Favorites />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
