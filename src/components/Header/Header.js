import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">Sneakers shop</h3>
            <p className="opacity-5">Магазин оригинальных кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.svg" alt="Cart" />
          <span>{totalPrice} сом</span>
        </li>
        <li>
          <Link to="favorites">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              src="img/heartIcon.svg"
              alt="Favorites"
            />
          </Link>
        </li>
        <li>
          <Link to="orders">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              src="img/user.svg"
              alt="User"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
