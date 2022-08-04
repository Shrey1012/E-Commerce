const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const StripeRoute = require("./routes/stripe");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    res.header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use("/api/carts", cartRoute);

app.use("/api/orders", orderRoute);

app.use("/api/checkout", StripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port 5000");
});
