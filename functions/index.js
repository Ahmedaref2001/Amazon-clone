const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/payments/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total, 10);

    if (isNaN(total)) {
      return res.status(400).send({error: "Invalid amount"});
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

exports.api = functions.https.onRequest(app);
