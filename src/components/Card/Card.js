import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";
import cardStyle from "./Card.module.scss";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { hasItemInCart } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite({ title, imageUrl, price, id });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={cardStyle.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={225}
          viewBox="0 0 150 225"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="120" />
          <rect x="0" y="126" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="147" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="181" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="174" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={cardStyle.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="Heart"
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} сом</b>
            </div>
            {onPlus && (
              <img
                className={cardStyle.plus}
                onClick={onClickPlus}
                src={
                  hasItemInCart(id)
                    ? "/img/btn-checked.svg"
                    : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
