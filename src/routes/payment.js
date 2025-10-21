const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// Create an order for client-side Checkout
router.post('/create-order', async (req, res) => {
  try {
    const rzp = getRazorpayClient();
    if (!rzp) {
      return res.status(500).json({ error: 'Razorpay keys not configured on server' });
    }
    const { amount, currency } = req.body || {};
    const amt = Number(amount) || 19900; // default in paise
    const curr = currency || 'INR';
    const order = await rzp.orders.create({ amount: amt, currency: curr });
    return res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to create order' });
  }
});

module.exports = router;


