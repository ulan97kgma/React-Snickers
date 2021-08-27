import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6121fd70f5849d0017fb4346.mockapi.io/orders"
        );
        // console.log(data.map((obj) => obj.items).flat());
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Orders loading error");
        console.error(error);
      }
    })();
  }, []);
  return (
    <div>
      {orders.length > 0 ? (
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>Мои заказы</h1>
          </div>
          <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-center text-center"
          style={{ height: "350px" }}
        >
          <div>
            <img src="/img/emoji2.png" alt="Emoji2" height={70} width={70} />
          </div>
          <h2>У вас пока нет заказов</h2>
          {console.log(orders)}
          <p style={{ opacity: "0.5" }}>Оформите хотя бы один заказ</p>
        </div>
      )}
      <Link to="/">
        <div className="empty d-flex justify-center">
          <button className="greenButton" style={{ width: "250px" }}>
            <img src="/img/arrowRight.svg" alt="Arrow" /> Вернуться назад
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Orders;
