const stripe = require('stripe')('sk_test_51OCOu5AT0h9q2P9AJOY9I8tzim0ZPjJaSSF9aFs9qYQ4ZXJigf4TJbvaOKk3AU5p8kbNK5xt4H4mJu3hEdiTFgCA00lAYqX6Uf');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const { initializeApp } = require('firebase-admin/app');

var admin = require("firebase-admin");

// const serviceAccount = {
//   "type": "service_account",
//   "project_id": "bloom-4e1f2",
//   "private_key_id": "8c599ea0b32d9d634118f5e2fd46804d0930fd20",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5x/gevdLh1qiH\nDX4xBMmii6Uc+vUoq/TTTwSxd73WbB0Hc/kUtbYt2EboqVDXKCVyXBQhEe1TchS7\nYcw5Ep9h/Wc5UlQ+2d155dsQFOR1u+CLKLGr9fDIDxPlAqeDlYbuVRj+panvtEMG\nvq7UKTh44LWeV3pl+vaPpchBGI+iEW7/O4TbKlw7lG1ussaiMRTqBt+2ftwtlCiN\nLH/Nn7qP6+4gD02Fs4DtJqd6MH3gKf9hVGNknyQwrVOAYZ2zDV7DUjx3uNO3ztiI\nfIxQZ1zrPg8Pzy5Uz+5xprF8ErD5GQ7tGlpPAikfAd6r72aECWPdkKo5a9U0ff5Z\nVznVYjDBAgMBAAECgf8V52iAFT9MJYc5Merd5TbgzOLzUE4XaC7PEIY9Ig//3mF8\nv3g8fR8bhGAtOPx9+0IIm9sqHBDa9L7J0H4MK4gOGvBQs/mYs7lT1OPYwYzHuzig\nYtrUIvw8VfEo8UUKmDR/ZStEuLJ/ez0nkrG9a5Y4qkXQpXczl3Acu2JUKFm16D5l\nqn5TNLdz1ubi0ZlGLSF0zS9GHDHpw5TEZh/mkBAfRgTe7nXo7qLOX+zdF8+EOjwm\nBMXnLAayKsV6bBCjWadqr9EqCCXKPwq8u0pcDhJrrqjMgw3Mxmu7MnCYKp+4aqWd\n1RwGW1IDvO5kAKUlr/EGqSW1PDjMQy+7eTBpaAECgYEA5hY5tgBxTlQRFODO6V+r\n3lpRUcpXFDGgoQ367mgXvfgXzflmc2x54+tm4maqgNLL07Q5Viz767ajvFlq2j5V\nqzDhz0+5+EGCwjVElpNC1i1N4fH/pncp7vcbr8M6HTZ95blFcOZGuPHWHsgenAo4\nLiLO6A6cylC2Xgk09EdI2EECgYEAzrRW2B5wU2GYXvtourAAlAGDKp12f9XZkWkH\nOuOWtr+qN4XuRnPBfm5c+gsHRFt/qPtjPoJRIG9aBHZSI34zdRbUOLQ7io+m/gKW\nAtGJeKvzLElze5vP8muMhj9dlNxp9nTj0QiczduJORLicLcsw66UwAeeBWDfpgMC\nkSqfOIECgYEArTuooeZ9aMsUvVJxlvZIUbZQqbMdkv+2f+wltOA8l/Q2AAe54keX\nEkqHgQhpcWrEuhVkYgSmfBdb+hCcycrK94RrT4ooa8jvKUev52rilJ0xmV956xyn\nPttgRhpII/yGF7NBnDpUnyS94RktKrDrEZl1jPSLiivw0qY973nIV8ECgYEAzdpV\nfofZz4ArUbRI2Vr8SGm1KhSE9cyQDzssox4Sc08vgnoUEP+o3HOmjrG6+/2vhidM\n7+yyRH4AhN8c8BH3xw0ELrB3d4eWg/MpWAc7Q/zigOFpa9mBX2hyGyQx21UjBfnl\nA8DzACQ5ZaiD8ELMBtjvdMphOfP+5wKqZM2woYECgYEAs75alWPyngQFpvhDIY5A\npCR0Q8OCPetB5WTPfWnYJNKdlzqyXBKXxD891AELrzTZ+KXrTKT1PJvXLPGLVZ0W\nNcY9LILA0p7CKDoCENhfeLWrYpgmksi7j6mmwe6UE0dT7EGs7J+g10Z97TVneGbV\nlM1hmyGuqNHD4/PvUM71+Ag=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-agp88@bloom-4e1f2.iam.gserviceaccount.com",
//   "client_id": "116964362727547382670",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-agp88%40bloom-4e1f2.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

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
  console.log(req.body);
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
    id_number: req.body.ssn
  },
  company: {
    name: req.body.company_name,
    address:  {
      line1: req.body.line_1,
      line2: req.body.line2,
      pastal_code: req.body.postal_code,
      city: req.body.city,
      state: req.body.state
    },
    tax_id: req.body.ssn
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
    account_number: req.body.account_number,
    default_for_currency: true
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
    url: req.body.url
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
    account_holder_type: "company",
    routing_number: req.body.routing_number,
    account_number: req.body.account_number,
    default_for_currency: true
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
  line2: req.body.representative_line_2,
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

app.post('/create-person', async (req, res) => {
  const person = await stripe.accounts.createPerson(
  req.body.account_id, {
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
  id_number: req.body.id_number,
  relationship: {
    title: req.body.title,
    representative: req.body.representative,
    owner: req.body.owner,
    executive: req.body.executive,
  }
  }
  );
  res.json({
    all_good: "good",
    id: person.id
  });
  console.log();

});


app.post('/retrieve-individual-account', async (req,res) => {
  const account = await stripe.accounts.retrieve(
  req.body.stripeAccountId
);

const balance = await stripe.balance.retrieve({
stripeAccount: req.body.stripeAccountId
});


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

const persons = await stripe.accounts.listPersons(
  req.body.stripeAccountId
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
    persons: persons.data,



    currently_due: account.requirements.currently_due,
    eventually_due: account.requirements.eventually_due,
    current_deadline: account.requirements.current_deadline


});
console.log('------account-----');
console.log(account);
console.log('------persons-----');
console.log(persons);
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
      phone: req.body.phone
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
    }
  }
);
});

app.post('/retrieve-external-account', async(req, res) => {
  const bankAccount = await stripe.accounts.retrieveExternalAccount(
    req.body.stripeAccountId,
    req.body.externalAccountId
  );

  res.json({
    bank_name: bankAccount.bank_name,
    account_holder: bankAccount.account_holder_name,
    routing_number: bankAccount.routing_number,
    account_number: bankAccount.last4,
    default_for_currency: bankAccount.default_for_currency
  });
});

app.post('/delete-account', async (req,res) => {
  const deleted = await stripe.accounts.del(
  req.body.stripeAccountId,
);
res.json({
  all_good: "good"
});
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
    routing_number: req.body.routing_number,
    account_number: req.body.account_number,
    default_for_currency: "Yes"
  }
});
res.json({
  externalAccount: bankAccount.id
});
});

app.post('/update-bank-account', async (req, res) => {
  const bankAccount = await stripe.accounts.updateExternalAccount(
  req.body.stripeAccountId,
  req.body.externalAccountId, {
    default_for_currency: req.body.default_account
  }
)

res.json({
  all_good: "good"
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
    publishableKey: 'pk_test_51OCOu5AT0h9q2P9AwAkXJryjAdhFEX6B9h911AaPeqENUMapLSOH36JiFT24hNO4cThWS8UPcfskXVXGvwmS5ulg00TtY6yGX7'
  });


});

// -------------------------------------------- //
// Notifcations

app.post('/subscribe-to-topic', async (req, res) => {
const registrationTokens = [req.body.notificationToken1, req.body.notificationToken2]
const topic = req.body.topic
console.log("subscribe is happening");
admin.messaging().subscribeToTopic(registrationTokens, topic)
  .then((response) => {
    console.log('Successfully subscribed to topic:', response);
    res.json({
      all_good: "good"
    })
  })
  .catch((error) => {
    console.log('Error subscribing to topic:', error);
  });
});

app.post('/send-message', async (req, res) => {

  const message = {
  notification: {
    title: req.body.title,
    body: req.body.notification
  },
  topic: req.body.topic
};


admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    res.json({
      all_good: "good"
    })
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
});

const PORT = process.env.PORT || 4242

app.listen(PORT, () => {
  console.log("Started server on port 4242.");
})
