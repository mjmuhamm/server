const stripe = require('stripe')('sk_test_51J1HegHO46FqqdfmowFPCg4CEsyu4Lh08uTmZOEcOIv7S2gZoY4pfwvUwmSJ5mAPJDS0ZYlCHaGWrdFeGJgWa5YB00xgtRQrRZ');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
const express = require('express');
const app = express();
app.use(express.urlencoded());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

stripe.balance.retrieve(function(err, balance) {
  console.log(balance);
});

app.post('/refund', async (req,res) => {
  const refund = await stripe.refunds.create({
  payment_intent: req.body.paymentId,
  amount: req.body.amount
});

res.json({
  tranfer_id: refund.id
})

console.log(refund);
});




app.post('/transfer', async (req,res) => {
  const transfer = await stripe.transfers.create({
  amount: req.body.amount,
  currency: 'usd',
  destination: req.body.stripeAccountId,
});

res.json({
  transferId: transfer.id
});
console.log(transfer);
});


app.post('/retrieve-person', async (req,res) => {
  const person = await stripe.accounts.retrievePerson(
    req.body.stripeAccountId,
    req.body.personId
  );

  res.json({
    first_name: person.first_name,
    last_name: person.last_name,
    email: person.email,
    phone_number: person.phone,
    dob_day: person.dob.day,
    dob_month: person.dob.month,
    dob_year: person.dob.year,
    street_address: person.address.line1,
    street_address_2: person.address.line2,
    city: person.address.city,
    state: person.address.state,
    zip_code: person.address.postal_code

  });

  console.log(person);
});


app.post('/retrieve-business-account', async (req, res) => {
  const account = await stripe.accounts.retrieve(
  req.body.stripeAccountId
  );

  const balance = await stripe.balance.retrieve({
  stripeAccount: req.body.stripeAccountId
});

  const bankAccount = await stripe.accounts.retrieveExternalAccount(
  req.body.stripeAccountId,
  req.body.externalAccountId
);

const persons = await stripe.accounts.listPersons(
  req.body.stripeAccountId
);

const person = await stripe.accounts.retrievePerson(
  req.body.stripeAccountId,
  req.body.representativeId
);

res.json({
    card_payments: account.capabilities.card_payments,
    transfers: account.capabilities.transfers,
    available: balance.available[0].amount,
    pending: balance.pending[0].amount,
    bank_name: bankAccount.bank_name,
    account_holder: bankAccount.account_holder_name,
    account_number: bankAccount.last4,
    routing_number: bankAccount.routing_number,
    persons: persons.data,
    representative_first_name: person.first_name,
    representative_last_name: person.last_name

});


});


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

const PORT = process.env.PORT || 4242

app.listen(PORT, () => {
  console.log("Started server on port 4242.");
})
