const stripe = require('stripe')('sk_test_51J1HegHO46FqqdfmowFPCg4CEsyu4Lh08uTmZOEcOIv7S2gZoY4pfwvUwmSJ5mAPJDS0ZYlCHaGWrdFeGJgWa5YB00xgtRQrRZ');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
const express = require('express');
const app = express();
app.use(express.urlencoded());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/create-payment-intent', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
console.log("body  this is ");
console.log(req.body.amount);

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    paymentId: paymentIntent.id,
    publishableKey: 'pk_test_51J1HegHO46FqqdfmVCS75Zl7XsGfbSCMa3KI2lNn3uc4MEvD4lC604d8Yy4NMrMy8feErjy9n24FlezeQtyFtbyM00N1x69Xuo'
  });
  console.log(paymentIntent);
});

const PORT = process.env.PORT || 5000

app.listen(4242, () => {
  console.log("Started server on port 4242.");
})
