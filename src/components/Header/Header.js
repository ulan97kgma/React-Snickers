import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            width={40}
            height={40}
            src="/img/guitarLogo.png"
            alt="Logotype"
            style={{ borderRadius: "25px" }}
          />
          <div>
            <h3 className="text-uppercase">Cifra Club</h3>
            <p className="opacity-5">Гитарный магазин</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span>{totalPrice} сом</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/add">
            <img width={18} height={18} src="/img/plus.svg" alt="Add" />
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              src="/img/heartIcon.svg"
              alt="Favorites"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              style={{ opacity: "0.5" }}
              src="/img/history.svg"
              alt="User"
            />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              src="/img/user.svg"
              alt="User"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
