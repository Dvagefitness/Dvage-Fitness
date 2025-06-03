import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { priceId, promoCode } = req.body;

  let discountAmount = 0;
  if (promoCode === 'DVAGE30') {
    discountAmount = 0.3; // 30% off
  }

  try {
    let couponId = null;

    if (discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        percent_off: discountAmount * 100,
        duration: 'once',
        name: 'Dvage 30% Promo',
      });
      couponId = coupon.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      discounts: couponId ? [{ coupon: couponId }] : [],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Stripe checkout error.' });
  }
}