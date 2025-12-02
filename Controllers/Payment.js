require("../dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid").v4;

exports.handlePayment = (req, res) => {
  const { product, token, subTotal } = req.body;
  console.log("PRODUCT ", product);
  console.log("PRICE ", subTotal);

  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: subTotal,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));

}
