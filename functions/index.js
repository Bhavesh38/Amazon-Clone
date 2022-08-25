const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LVXDNSI6LZZhh7zNSb335znqH7pF8fPOwAyrxPMh6Ra8CNWA9KSKrP1DsgJPHUfV3DH8rGFybixLI7bpvYaH6jG00EmQKciaZ"
);

//API

// App config
const app = express();
// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
//API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request recieved: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listen command

exports.api = functions.https.onRequest(app);

//http://localhost:5001/clone-1199c/us-central1/api
