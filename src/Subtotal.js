import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  //   const [totalPrice, setTotalPrice] = useState(0);

  //   useEffect(() => {
  //     let sum = 0;
  //     for (let i = 0; i < basket.length; i++) {
  //       sum += basket[i].price;
  //     }
  //     setTotalPrice(sum);
  //   }, [basket]);

  return (
    <div className="subtotal">
      <CurrencyFormat renderText={(value) => (
        <>
          <p>
            Subtotal ({basket.length} items):
            <strong>{` ${value}`}</strong>
          </p>
          <small className="subtotal_gift">
            <input type="checkbox" /> This order contains a gift
          </small>
        </>
      )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      {/* <div>
        <p>
          
          Subtotal ({basket.length} items):{" "}
          <strong>
            <small>₹</small>
            {getBasketTotal(basket)}
          </strong>
        </p>
        <small className="subtotal_gift">
          <input type="checkbox" /> This order contains a gift
        </small>
      </div> */}
      <button onClick={(e) => navigate("/payment")}>Proceed to Chekout</button>
    </div>
  );
}

export default Subtotal;
