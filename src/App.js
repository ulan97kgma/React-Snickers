import Card from "./components/Card/Card";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";

const arr = [
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    imageUrl: "/img/sneakers/1.jpg",
    price: 12999,
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    imageUrl: "/img/sneakers/2.jpg",
    price: 15600,
  },
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    imageUrl: "/img/sneakers/3.jpg",
    price: 8499,
  },
  {
    title: "Кроссовки Puma X Aka Boku Future Rider",
    imageUrl: "/img/sneakers/4.jpg",
    price: 8999,
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Cart />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card title={obj.title} price={obj.price} image={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
