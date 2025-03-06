"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar - Only for Dashboard */}
      <div className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Happy Bonding
          </h1>
        </div>
        
        <nav className="px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span className="text-xl">📊</span>
            <span>Dashboard</span>
          </Link>

          <Link href="/cards" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-gray-700">
            <span className="text-xl">💳</span>
            <span>Cards</span>
          </Link>

          <Link href="/transactions" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span className="text-xl">💸</span>
            <span>Transactions</span>
          </Link>

          <Link href="/settings" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Cards</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <span className="text-xl">🔔</span>
            </button>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              J
            </div>
          </div>
        </div>

        {/* Cards Grid */}
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

          {/* Add New Card Button */}
          <button className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-all">
            <span className="text-3xl mb-2">+</span>
            <span className="font-medium">Add New Card</span>
          </button>
        </div>

        {/* Card Details Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Card Transactions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Online Shopping</p>
                    <p className="text-gray-500 text-sm">Today, 3:45 PM</p>
                  </div>
                </div>
                <p className="text-red-500 font-semibold">-₹3,500</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Restaurant</p>
                    <p className="text-gray-500 text-sm">Yesterday</p>
                  </div>
                </div>
                <p className="text-red-500 font-semibold">-₹1,200</p>
              </div>
            </div>
          </div>

          {/* Card Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🔒</span>
                  <span className="text-gray-700">Card Security</span>
                </div>
                <button className="text-purple-500 hover:text-purple-600">Manage</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">💳</span>
                  <span className="text-gray-700">Spending Limits</span>
                </div>
                <button className="text-purple-500 hover:text-purple-600">Set Limits</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🌐</span>
                  <span className="text-gray-700">Online Payments</span>
                </div>
                <button className="text-purple-500 hover:text-purple-600">Configure</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 