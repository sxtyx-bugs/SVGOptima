const Stripe = require('stripe');

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2025-06-30.basil',
});

const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PRICE_ID || '';
const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || '';

module.exports = {
  stripe,
  PREMIUM_PRICE_ID,
  PRO_PRICE_ID,
};


