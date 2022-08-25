import React from "react";
import "./ChekoutProduct.css";
import { useStateValue } from "./StateProvider";

function ChekoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    //remove the item from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="chekoutProduct">
      <img src={image} className="chekoutProduct_image" />
      <div className="chekoutProduct_info">
        <p className="chekoutProduct_title">{title}</p>
        <p className="chekoutProduct_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="chekoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default ChekoutProduct;
