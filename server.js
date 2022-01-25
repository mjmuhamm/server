const stripe = require('stripe')('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');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
const express = require('express');
const app = express();
app.use(express.urlencoded());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

stripe.balance.retrieve(function(err, balance) {
});

app.post('/refund', async (req,res) => {
  const refund = await stripe.refunds.create({
  payment_intent: req.body.paymentId,
  amount: req.body.amount
});

res.json({
  refund_id: refund.id
})
console.log("refund");
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

});



app.post('/create-individual-account', async (req,res) => {

  const account = await stripe.accounts.create({
  type: 'custom',
  country: 'US',
  capabilities: {
    card_payments: {requested: true},
    transfers: {requested: true},
  },
  business_type: 'individual',
  business_profile: {
    mcc: req.body.mcc,
    url: req.body.url
  },
  tos_acceptance: {
    date: req.body.date,
    ip: req.body.ip,
    service_agreement: 'full'
  },
  individual: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: {
      day: req.body.dob_day,
      month: req.body.dob_month,
      year: req.body.dob_year
    },
    address: {
      line1: req.body.line_1,
      line2: req.body.line_2,
      postal_code: req.body.postal_code,
      city: req.body.city,
      state: req.body.state,
    },
    email: req.body.email,
    phone: req.body.phone,
    ssn_last_4: req.body.ssn_last_4
  }

});

const bankAccount = await stripe.accounts.createExternalAccount(
  account.id, {
    external_account: {
    object: 'bank_account',
    country: 'US',
    currency: 'usd',
    account_holder_name: req.body.account_holder,
    account_holder_type: 'individual',
    routing_number: req.body.routing_number,
    account_number: req.body.account_number
  }
});

res.json({
  id: account.id,
  external_account: bankAccount.id
});
});


app.post('/create-business-account', async (req,res) => {
  const account = await stripe.accounts.create({
  type: 'custom',
  country: 'US',
  capabilities: {
    card_payments: {requested: true},
    transfers: {requested: true},
  },
  business_type: 'company',
  business_profile: {
    mcc: req.body.mcc,
    url: req.body.business_url
  },
  company: {
    name: req.body.company_name,
    address: {
      city: req.body.company_city,
      line1: req.body.company_line1,
      line2: req.body.company_line2,
      postal_code: req.body.company_postal_code,
      state: req.body.company_state
    },
    directors_provided: false,
    executives_provided: false,
    owners_provided: true,
    phone: req.body.company_phone,
    tax_id: req.body.company_tax_id,
  },
    tos_acceptance: {
      date: req.body.date,
      ip: req.body.ip,
      service_agreement: 'full'
    }

});

const bankAccount = await stripe.accounts.createExternalAccount(
  account.id, {
    external_account: {
    object: 'bank_account',
    country: 'US',
    currency: 'usd',
    account_holder_name: req.body.account_holder,
    account_holder_type: 'company',
    routing_number: req.body.routing_number,
    account_number: req.body.account_number
  }
  }
);

const person = await stripe.accounts.createPerson(
account.id, {
  first_name: req.body.representative_first_name,
last_name: req.body.representative_last_name,
dob: {
  day: req.body.representative_dob_day,
  month: req.body.representative_dob_month,
  year: req.body.representative_dob_year
},
address: {
  line1: req.body.representative_line_1,
  postal_code: req.body.representative_postal_code,
  city: req.body.representative_city,
  state: req.body.representative_state,
},
email: req.body.representative_email,
phone: req.body.representative_phone,
id_number: req.body.representative_id_number,
relationship: {
  title: req.body.representative_title,
  representative: req.body.representative,
  owner: req.body.representative_owner,
  executive: req.body.representative_executive,
}
});



console.log(person);
res.json({
  stripeId: account.id,
  bankAccountId: bankAccount.id,
  representativeId: person.id
});
});

app.post('/save-owner', async (req, res) => {
  const person = await stripe.accounts.createPerson(
  req.body.account_id, {
    first_name: req.body.owner_first_name,
  last_name: req.body.owner_last_name,
  dob: {
    day: req.body.owner_dob_day,
    month: req.body.owner_dob_month,
    year: req.body.owner_dob_year
  },
  address: {
    line1: req.body.owner_line_1,
    postal_code: req.body.owner_postal_code,
    city: req.body.owner_city,
    state: req.body.owner_state,
  },
  email: req.body.owner_email,
  phone: req.body.owner_phone,
  id_number: req.body.owner_id_number,
  relationship: {
    title: req.body.owner_title,
    representative: false,
    owner: true,
    executive: false,
  }
  }
  );
  res.json({
    all_good: "good"
  });

});


app.post('/retrieve-individual-account', async (req,res) => {
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

res.json({
      card_payments: account.capabilities.card_payments,
      transfers: account.capabilities.transfers,

      mcc: account.business_profile.mcc,
      url: account.business_profile.url,
      first_name: account.individual.first_name,
      last_name: account.individual.last_name,
      phone: account.individual.phone,
      email: account.individual.email,
      dob_day: account.individual.dob.day,
      dob_month: account.individual.dob.month,
      dob_year: account.individual.dob.year,
      line1: account.individual.address.line1,
      line2: account.individual.address.line2,
      postal_code: account.individual.address.postal_code,
      state: account.individual.address.state,
      city: account.individual.address.city,

      available: balance.available[0].amount,
      pending: balance.pending[0].amount,

      bank_name: bankAccount.bank_name,
      account_holder: bankAccount.account_holder_name,
      account_number: bankAccount.last4,
      routing_number: bankAccount.routing_number,

      currently_due: account.requirements.currently_due,
      eventually_due: account.requirements.eventually_due,
      current_deadline: account.requirements.current_deadline
});

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

    mcc: account.business_profile.mcc,
    name: account.business_profile.name,
    url: account.business_profile.url,
    company_line1: account.company.address.line1,
    company_line2: account.company.address.line2,
    company_city: account.company.address.city,
    company_state: account.company.address.state,
    company_postal_code: account.company.address.postal_code,
    phone: account.company.phone,


    available: balance.available[0].amount,
    pending: balance.pending[0].amount,
    bank_name: bankAccount.bank_name,
    account_holder: bankAccount.account_holder_name,
    account_number: bankAccount.last4,
    routing_number: bankAccount.routing_number,
    persons: persons.data,
    representative_first_name: person.first_name,
    representative_last_name: person.last_name,

    currently_due: account.requirements.currently_due,
    eventually_due: account.requirements.eventually_due,
    current_deadline: account.requirements.current_deadline


});

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
    zip_code: person.address.postal_code,
    executive: person.relationship.executive,
    owner: person.relationship.owner

  });

});

app.post('/update-individual-account', async (req,res) => {
  const account = await stripe.accounts.update(
  req.body.stripeAccountId, {
    business_profile: {
      mcc: req.body.mcc,
      url: req.body.url
    },
    individual: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: {
        day: req.body.dob_day,
        month: req.body.dob_month,
        year: req.body.dob_year
      },
      address: {
        line1: req.body.line_1,
        line2: req.body.line_2,
        postal_code: req.body.postal_code,
        city: req.body.city,
        state: req.body.state,
      },
      email: req.body.email,
      phone: req.body.phone,
      ssn_last_4: req.body.ssn_last_4
    }
  }
);
});

app.post('/update-business-account', async (req, res) => {
  const account = await stripe.accounts.update(
  req.body.stripeAccountId, {
    business_profile: {
      mcc: req.body.mcc,
      url: req.body.business_url
    },
    company: {
      name: req.body.company_name,
      address: {
        city: req.body.company_city,
        line1: req.body.company_line1,
        line2: req.body.company_line2,
        postal_code: req.body.company_postal_code,
        state: req.body.company_state
      },
      directors_provided: false,
      executives_provided: false,
      owners_provided: true,
      phone: req.body.company_phone,
      tax_id: req.body.company_tax_id,
    }
  }
);
});

app.post('/delete-bank-account', async (req, res) => {
  const deleted = await stripe.accounts.deleteExternalAccount(
  req.body.stripeAccountId,
  req.body.externalAccountId,
);
res.json({
  all_good: "good",
});
});

app.post('/create-bank-account', async (req,res) => {
  const bankAccount = await stripe.accounts.createExternalAccount(
  req.body.stripeAccountId, {
    external_account: {
    object: 'bank_account',
    country: 'US',
    currency: 'usd',
    account_holder_name: req.body.account_holder,
    account_holder_type: req.body.account_type,
    routing_number: '110000000',
    account_number: '000123456789'
  }
});
res.json({
  externalAccount: bankAccount.id
});
});

app.post('/update-person', async (req,res) => {
  const person = await stripe.accounts.updatePerson(
  req.body.stripeAccountId,
  req.body.personId, {
    first_name: req.body.first_name,
  last_name: req.body.last_name,
  dob: {
    day: req.body.dob_day,
    month: req.body.dob_month,
    year: req.body.dob_year
  },
  address: {
    line1: req.body.line_1,
    line2: req.body.line_2,
    postal_code: req.body.postal_code,
    city: req.body.city,
    state: req.body.state,
  },
  email: req.body.email,
  phone: req.body.phone,
  ssn_last_4: req.body.ssn_last_4,
  relationship: {
    title: req.body.title,
    representative: req.body.representative,
    owner: req.body.owner,
    executive: req.body.executive,
  }
  });
res.json({
  all_good: "good"
});
});

app.post('/delete-person', async (req,res) => {
  const deleted = await stripe.accounts.deletePerson(
  req.body.stripeAccountId,
  req.body.personId,
);
res.json({
  all_good: "good"
});
});




app.post('/create-payment-intent', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.

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
    publishableKey: 'pk_live_51J1HegHO46FqqdfmsaC7SmYsGcigxAbvU2b7p5oDqEIPUbUj47pvmMNKPJ9PrZjqjeM3743ANM23VlByqUVpun6X00VqpDpsTB'
  });

});

const PORT = process.env.PORT || 4243

app.listen(PORT, () => {
  console.log("Started server on port 4242.");
})
