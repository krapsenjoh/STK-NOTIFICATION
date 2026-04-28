const express = require("express");
const axios = require("axios");
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("The server is working!")
})

app.post("/stk-push", async (req, res) => {
  try {
    const payload = {
      action: "deposit",
      wallet_type: "payments",
      phone_number: req.body.phone,
      amount: req.body.amount
    };

    const response = await axios.post(
      "https://swiftwallet.co.ke/v3/wallet/",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "STK push failed"
    });
  }
});

app.get("/callback", (req, res) => {

  console.log(req.body);

  if (req.body.status === "completed") {
    console.log("Payment successful");
  }

  res.json({
    message: "Callback received"
  });

});

app.listen(3000, () => {
  console.log("Running on port 3000");
});