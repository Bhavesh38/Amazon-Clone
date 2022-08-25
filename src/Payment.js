import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChekoutProduct from "./ChekoutProduct";
import { getBasketTotal } from "./reducer";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./Firebase";
import CurrencyFormat from "react-currency-format";
function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which allos us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total=${Math.floor(
          getBasketTotal(basket) * 100
        )}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("The secret is ", clientSecret);

  const handleSubmit = async (event) => {
    //all strips stuff...

    event.preventDefault();
    setProcessing(true);

    // const payload=await stripe
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payment intent=payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (event) => {
    //listen for changes in the CardElement
    //and disply and errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Chekout (<Link to="/chekout">{basket?.length} items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>Salt lake sector-V</p>
            <p>Kolkata,West Bengal.</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* stripe logic will go Here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat renderText={(value) => (
                  <>
                    <p>
                      Subtotal ({basket.length} items):
                      <strong>{` ${value}`}</strong>
                    </p>
                    {/* <small className="subtotal_gift">
                      <input type="checkbox" /> This order contains a gift
                    </small> */}
                  </>
                )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                {/* <p value={getBasketTotal(basket)}>
                  <strong>
                    Order Total: <small>₹</small>
                    {getBasketTotal(basket)}
                  </strong>
                </p> */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
