"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome Back, John! 👋</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <span className="text-lg md:text-xl">🔔</span>
            </button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              J
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">💰</span>
              </div>
              <span className="text-green-500 text-xs md:text-sm font-medium">+12.5%</span>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm mb-1">Total Balance</h3>
            <p className="text-lg md:text-2xl font-bold text-gray-800">₹24,500</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">📈</span>
              </div>
              <span className="text-green-500 text-xs md:text-sm font-medium">+8.2%</span>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm mb-1">Income</h3>
            <p className="text-lg md:text-2xl font-bold text-gray-800">₹12,500</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">📉</span>
              </div>
              <span className="text-red-500 text-xs md:text-sm font-medium">-2.4%</span>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm mb-1">Expenses</h3>
            <p className="text-lg md:text-2xl font-bold text-gray-800">₹8,250</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <span className="text-xl md:text-2xl">🎯</span>
              </div>
              <span className="text-purple-500 text-xs md:text-sm font-medium">85%</span>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm mb-1">Goals</h3>
            <p className="text-lg md:text-2xl font-bold text-gray-800">₹42,500</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Card Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="text-white">
                  <p className="text-xs md:text-sm opacity-80 mb-1">Balance</p>
                  <p className="text-lg md:text-2xl font-bold">₹24,500</p>
                </div>
                <div className="text-white text-right">
                  <p className="text-xs md:text-sm opacity-80 mb-1">Card Number</p>
                  <p className="font-mono text-sm">**** **** **** 4242</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <p className="text-xs md:text-sm opacity-80 mb-1">Card Holder</p>
                  <p className="text-sm md:text-base font-medium">JOHN DOE</p>
                </div>
                <div className="text-white text-right">
                  <p className="text-xs md:text-sm opacity-80 mb-1">Expires</p>
                  <p className="text-sm md:text-base font-medium">12/25</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button className="py-2 md:py-3 px-3 md:px-4 bg-gray-100 rounded-lg text-gray-700 text-sm">
                Add Money
              </button>
              <button className="py-2 md:py-3 px-3 md:px-4 bg-indigo-500 rounded-lg text-white text-sm">
                Send Money
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Recent Transactions</h3>
              <Link href="/transactions" className="text-indigo-600 text-sm">
                View All
              </Link>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm md:text-base">↓</span>
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-800">Salary Deposit</p>
                    <p className="text-xs md:text-sm text-gray-500">Today, 2:30 PM</p>
                  </div>
                </div>
                <p className="text-green-500 text-sm md:text-base font-medium">+₹45,000</p>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm md:text-base">↑</span>
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-800">Shopping</p>
                    <p className="text-xs md:text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                <p className="text-red-500 text-sm md:text-base font-medium">-₹2,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 