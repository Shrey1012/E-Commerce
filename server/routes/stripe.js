const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

const middle = ((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if(req.method === 'OPTIONS' || 'POST'){
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
})

router.post("/payment",middle,(req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    },
  )
});

module.exports = router;
