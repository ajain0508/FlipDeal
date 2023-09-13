const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

// second arguement is secret key
const stripe = require("stripe")("sk_test_51Ndu4aSHISAZYuCyWkNfE39PCy29rzgMxME3c7vIDt142apcpPIBIOzQKJ5KEfbn4Or8o4A2WwRJ5tLLH6tZLqSe00b5jKPXN2");



// API


// App config
const app = express();

// this code is written for access control error resolve
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5001");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
}

// middlewares
app.use(cors({
  credentials: true,
  origin:'http://localhost:3000'
}));
app.use(express.json());

// API route
app.get("/", (req, res)=> res.status(200).send("hello world") );

app.configure = ()=>{
  app.use(allowCrossDomain);
}

app.post("/payments/create", async (req, res)=>{
  
//  total is amount in subunits
  const total = req.query.total;
  console.log("Payment Request received", total);


  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  console.log(paymentIntent);
  //   201 OK created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,

  });
});


// Listen Command
exports.api = functions.https.onRequest(app);

// example endpoint
// the api word comes from exports.api
// http://127.0.0.1:5001/clone-f5ccb/us-central1/api
