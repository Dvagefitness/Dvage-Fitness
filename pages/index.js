import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    id: 'price_1RVssTP9ajVHesQE6lm2MszC',
    title: '28-Day Super Shred Plan',
    description: 'Torch fat and reveal lean muscle in 28 days.',
    image: '/uploads/shred.jpg',
    price: '£20'
  },
  {
    id: 'price_1RVspWP9ajVHesQEn1V2ZMUf',
    title: 'Muscle Gain Plan',
    description: 'Build size, strength, and power with this proven muscle-building guide.',
    image: '/uploads/musclegain.jpg',
    price: '£20'
  },
  {
    id: 'price_1RVt0AP9ajVHesQEo2QPfK7O',
    title: 'Hybrid Athlete Plan',
    description: 'Train for strength, speed, and stamina at once.',
    image: '/uploads/hybrid.jpg',
    price: '£20'
  }
];

export default function Home() {
  const [promoCode, setPromoCode] = useState('');

  const handleBuy = async (priceId) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, promoCode })
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Dvage Fitness</h1>
        <p className="text-gray-400">Elite fitness plans designed to transform your body</p>
      </header>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code (optional)"
          className="w-full p-2 rounded text-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="bg-gray-900 rounded-xl shadow p-4 text-center">
            <Image src={plan.image} alt={plan.title} width={300} height={200} className="rounded-xl mx-auto" />
            <h2 className="text-2xl font-semibold mt-4">{plan.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
            <p className="text-xl mt-4">{plan.price}</p>
            <button
              onClick={() => handleBuy(plan.id)}
              className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>Follow us on Instagram and TikTok: @dvagefitness</p>
      </footer>
    </div>
  );
}