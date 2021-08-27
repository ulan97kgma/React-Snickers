import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Add from "./AdminPanel/Add";
import Edit from "./AdminPanel/Edit";
import CardDetail from "./pages/CardDetail/CardDetail";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editedProduct, setEditedProduct] = useState(null);

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
  }, [items.length]);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      // console.log(obj);
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6121fd70f5849d0017fb4346.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://6121fd70f5849d0017fb4346.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
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
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      console.log(id);
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        console.log(obj);
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const addNewProduct = async (newObj) => {
    await axios.post(
      "https://6121fd70f5849d0017fb4346.mockapi.io/items",
      newObj
    );
    //  async function fetchData(){
    const itemsResponse = await axios.get(
      "https://6121fd70f5849d0017fb4346.mockapi.io/items"
    );
    setItems(itemsResponse.data);
    // }
  };

  const history = useHistory();

  const handleEdit = async (id) => {
    let { data } = await axios.get(
      `https://6121fd70f5849d0017fb4346.mockapi.io/items/${id}`
    );
    setEditedProduct(data);
    history.push("/edit");
  };

  const saveEdit = async (newProduct, id) => {
    // let newArr = items.filter((item) => Number(item.id) !== Number(id));

    // newArr.push(newProduct);
    await axios.put(
      `https://6121fd70f5849d0017fb4346.mockapi.io/items/${id}`,
      newProduct
    );

    const itemsResponse = await axios.get(
      "https://6121fd70f5849d0017fb4346.mockapi.io/items"
    );
    setItems(itemsResponse.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(
      `https://6121fd70f5849d0017fb4346.mockapi.io/items/${id}`
    );

    const itemsResponse = await axios.get(
      "https://6121fd70f5849d0017fb4346.mockapi.io/items"
    );
    setItems(itemsResponse.data);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        editedProduct,
        hasItemInCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
        setSearchValue,
        addNewProduct,
        handleEdit,
        saveEdit,
        deleteProduct,
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
        <Route exact path="/add">
          <Add />
        </Route>
        <Route exact path="/edit">
          <Edit />
        </Route>
        <Route exact path="/detail">
          <CardDetail />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
