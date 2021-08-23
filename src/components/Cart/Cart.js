import React from "react";
import Info from "../Info/Info";

function Cart({ onClose, onDeleteProductInCart, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} сом</b>
                  </div>
                  <img
                    onClick={() => onDeleteProductInCart(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 сом </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 сом</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            image="/img/empty-cart.jpg"
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
