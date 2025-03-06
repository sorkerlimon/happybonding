"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Sidebar from '../components/Sidebar';

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
  const router = useRouter();
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Your Cards</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <span className="text-lg md:text-xl">🔔</span>
            </button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              J
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-xl transform hover:scale-[1.02] transition-all"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div>
                  <p className="text-xs md:text-sm opacity-80">Balance</p>
                  <p className="text-lg md:text-2xl font-bold">{formatBalance(card.current_balance || card.balance)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm opacity-80">{card.bank_name}</p>
                  <p className="text-xs md:text-sm">{card.card_type}</p>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <p className="text-base md:text-lg font-mono">{formatCardNumber(card.card_number)}</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs md:text-sm opacity-80">Card Holder</p>
                  <p className="text-sm md:text-base font-semibold">{card.card_holder_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm opacity-80">Expires</p>
                  <p className="text-sm md:text-base font-semibold">{card.expiry_date}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${
                  card.card_status.toLowerCase() === 'active' 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}>
                  {card.card_status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}

          {/* Add New Card Button */}
          <button className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-all">
            <span className="text-2xl md:text-3xl mb-2">+</span>
            <span className="text-sm md:text-base font-medium">Add New Card</span>
          </button>
        </div>

        {/* Card Details Section */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Recent Card Transactions</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-base md:text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-gray-800 font-medium">Online Shopping</p>
                    <p className="text-xs md:text-sm text-gray-500">Today, 3:45 PM</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-red-500 font-semibold">-₹3,500</p>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-base md:text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-gray-800 font-medium">Restaurant</p>
                    <p className="text-xs md:text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-red-500 font-semibold">-₹1,200</p>
              </div>
            </div>
          </div>

          {/* Card Settings */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Card Settings</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg md:text-xl">🔒</span>
                  <span className="text-sm md:text-base text-gray-700">Card Security</span>
                </div>
                <button className="text-sm md:text-base text-purple-500 hover:text-purple-600">Manage</button>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg md:text-xl">💳</span>
                  <span className="text-sm md:text-base text-gray-700">Spending Limits</span>
                </div>
                <button className="text-sm md:text-base text-purple-500 hover:text-purple-600">Set Limits</button>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg md:text-xl">🌐</span>
                  <span className="text-sm md:text-base text-gray-700">Online Payments</span>
                </div>
                <button className="text-sm md:text-base text-purple-500 hover:text-purple-600">Configure</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 