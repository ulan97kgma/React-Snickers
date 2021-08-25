import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import Card from "../components/Card/Card";

function Favorites() {
  const { favorites, onAddToFavorite } = useContext(AppContext);
  return (
    <div>
      {favorites.length > 0 ? (
        <div className="content p-40">
          <div className="d-flex align-center mb-40 justify-between">
            <h1>Избранное</h1>
          </div>

          <div className="d-flex flex-wrap">
            {favorites.map((item, index) => (
              <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-center text-center"
          style={{ height: "350px" }}
        >
          <div>
            <img src="/img/emoji1.png" alt="Emoji1" height={70} width={70} />
          </div>
          <h2>Нет избранных товаров :(</h2>
          <p style={{ opacity: "0.5" }}>Вы ничего не добавили в избранное</p>
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

export default Favorites;
