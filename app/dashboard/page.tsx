"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back, John! 👋</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <span className="text-xl">🔔</span>
            </button>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              J
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Balance</h3>
            <p className="text-2xl font-bold text-gray-800">₹24,500.00</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <span className="text-green-500 text-sm font-medium">+8.2%</span>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Income</h3>
            <p className="text-2xl font-bold text-gray-800">₹12,500.00</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📉</span>
              </div>
              <span className="text-red-500 text-sm font-medium">-2.4%</span>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Expenses</h3>
            <p className="text-2xl font-bold text-gray-800">₹8,250.00</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-purple-500 text-sm font-medium">85%</span>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Savings Goal</h3>
            <p className="text-2xl font-bold text-gray-800">₹42,500.00</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-start mb-8">
                <div className="text-white">
                  <p className="text-sm opacity-80 mb-1">Balance</p>
                  <p className="text-2xl font-bold">₹24,500.00</p>
                </div>
                <div className="text-white text-right">
                  <p className="text-sm opacity-80 mb-1">Card Number</p>
                  <p className="font-mono">**** **** **** 4242</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <p className="text-sm opacity-80 mb-1">Card Holder</p>
                  <p className="font-medium">JOHN DOE</p>
                </div>
                <div className="text-white text-right">
                  <p className="text-sm opacity-80 mb-1">Expires</p>
                  <p className="font-medium">12/25</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Transfer</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 px-4 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-all">
                Add Money
              </button>
              <button className="py-3 px-4 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all">
                Send Money
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
              <Link href="/transactions" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">↓</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Salary Deposit</p>
                    <p className="text-gray-500 text-sm">Today, 2:30 PM</p>
                  </div>
                </div>
                <p className="text-green-500 font-semibold">+₹45,000</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Shopping</p>
                    <p className="text-gray-500 text-sm">Yesterday</p>
                  </div>
                </div>
                <p className="text-red-500 font-semibold">-₹2,500</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Investment</p>
                    <p className="text-gray-500 text-sm">Mar 28, 2024</p>
                  </div>
                </div>
                <p className="text-purple-500 font-semibold">-₹15,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">💸</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Send Money</h3>
            <p className="text-gray-500">Transfer money to friends and family instantly.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-500">Track your spending and saving patterns.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Goals</h3>
            <p className="text-gray-500">Set and track your financial goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 