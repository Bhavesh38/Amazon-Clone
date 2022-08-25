import React from "react";
import "./Chekout.css";
import ChekoutProduct from "./ChekoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Chekout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="chekout">
      <div className="chekout_left">
        <img
          className="chekout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ad.png"
        />
        <div>
          <h3>Hello, {user ? user.email : "Guest"}</h3>
          <h2 className="chekout_title">Your Shoping Basket</h2>
          {/* <ChekoutProduct/> */}
          {basket.map((item) => (
            <ChekoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="chekout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Chekout;
