import React from "react";
import ChekoutProduct from "./ChekoutProduct";
import "./Order.css";
import moment from "moment";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";

function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => {
        <ChekoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />;
      })}
      <div>
        <h3 value={order.data.amount / 100} className="order_total">
          Order Total: {order.data.amount / 100}
        </h3>
      </div>
    </div>
  );
}

export default Order;
