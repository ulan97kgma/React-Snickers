import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Add = () => {
  const [inpValue, setInpValue] = useState("");
  const { addNewProduct } = useContext(AppContext);

  const handleChangeInpValue = (e) => {
    let obj = {
      ...inpValue,
      [e.target.name]: e.target.value,
    };
    setInpValue(obj);
  };

  const handleAddProduct = () => {
    addNewProduct(inpValue);
    setInpValue("");
    console.log(inpValue);
  };

  return (
    <div className="d-flex justify-center mt-20" style={{ height: "400px" }}>
      <form className="adminPanelForm d-flex justify-center align-center">
        <div className="mb-10">
          <h2 className="d-flex justify-center">Добавление продукта</h2>
          <div className="search-block d-flex mb-10" style={{ width: "250px" }}>
            <input
              value={inpValue.title || ""}
              name="title"
              onChange={handleChangeInpValue}
              placeholder="Название продукта"
            />
            {inpValue.title && (
              <img
                onClick={() => setInpValue({ ...inpValue, title: "" })}
                className="removeBtn cu-p clear"
                src="img/btn-remove.svg"
                alt="Clear"
              />
            )}
          </div>
          <div className="search-block d-flex mb-10" style={{ width: "250px" }}>
            <input
              value={inpValue.price || ""}
              name="price"
              onChange={handleChangeInpValue}
              placeholder="Цена продукта"
            />
            {inpValue.price && (
              <img
                onClick={() => setInpValue({ ...inpValue, price: "" })}
                className="removeBtn cu-p clear"
                src="img/btn-remove.svg"
                alt="Clear"
              />
            )}
          </div>
          <div className="search-block d-flex mb-10" style={{ width: "250px" }}>
            <input
              value={inpValue.imageUrl || ""}
              name="imageUrl"
              onChange={handleChangeInpValue}
              placeholder="URL изображения"
            />
            {inpValue.imageUrl && (
              <img
                onClick={() => setInpValue({ ...inpValue, imageUrl: "" })}
                className="removeBtn cu-p clear"
                src="img/btn-remove.svg"
                alt="Clear"
              />
            )}
          </div>
          <div className="d-flex justify-center mt-30">
            <Link to="/">
              <button
                onClick={handleAddProduct}
                className="greenButton mr-5"
                style={{ width: "8vw" }}
              >
                Добавить
              </button>
            </Link>
            <Link to="/">
              <button className="redButton" style={{ width: "8vw" }}>
                Закрыть
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
