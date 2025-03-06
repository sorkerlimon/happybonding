"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Card {
  id: number;
  card_holder_name: string;
  bank_name: string;
  card_number: string;
  expiry_date: string;
  card_type: string;
  balance: number;
  current_balance: number; // For compatibility with the API response
  card_status: string;
  created_at?: string;
  updated_at?: string;
}

export default function Cards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch('/api/cards');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch cards');
      }

      setCards(data.cards);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (number: string) => {
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  const formatBalance = (balance: number | null) => {
    if (balance === null || isNaN(balance)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(balance);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Cards</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.02] transition-all"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm opacity-80">Balance</p>
                <p className="text-2xl font-bold">{formatBalance(card.current_balance || card.balance)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">{card.bank_name}</p>
                <p className="text-sm">{card.card_type}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-lg font-mono">{formatCardNumber(card.card_number)}</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm opacity-80">Card Holder</p>
                <p className="font-semibold">{card.card_holder_name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Expires</p>
                <p className="font-semibold">{card.expiry_date}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <span className={`px-3 py-1 rounded-full text-xs ${
                card.card_status.toLowerCase() === 'active' 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}>
                {card.card_status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No cards found. Add your first card to get started.</p>
        </div>
      )}
    </div>
  );
} 