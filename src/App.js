import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chekout from "./Chekout";
import Login from "./Login";
import { auth } from "./Firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
const promise = loadStripe(
  "pk_test_51LVXDNSI6LZZhh7zUnvoynCTzdam5KPCvNVJb2kPN0eV3OS0ixjr07tHEWxp3MejZ3Sh4Ld7qEY0dmnhEzGDSKox009gbbojMH"
);
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will runs once when app loaded
    auth.onAuthStateChanged((authUser) => {
      console.log("Thwe user is ", authUser);

      if (authUser) {
        //the user just logged in / user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/chekout"
          element={
            <>
              <Header />
              <Chekout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }
        />
        //Home page
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

{
  /* <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dash" element={<Dashboard />} />
</Routes>; */
}
