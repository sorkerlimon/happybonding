"use client";

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // List of public paths that don't need the sidebar
  const publicPaths = ['/', '/login'];
  const isPublicPage = publicPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          {isAuthenticated && !isPublicPage && (
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
              <div className="p-6">
                <Link href="/dashboard">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                    Happy Bonding
                  </h1>
                </Link>
              </div>
              
              <nav className="mt-6 space-y-2 px-3">
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    isActive('/dashboard') 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive('/dashboard') ? 'bg-indigo-100' : 'bg-gray-50'
                  }`}>
                    <span className="text-xl">📊</span>
                  </div>
                  <span className={isActive('/dashboard') ? 'font-medium' : ''}>Dashboard</span>
                </Link>

                <Link
                  href="/users"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    isActive('/users') 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive('/users') ? 'bg-blue-100' : 'bg-gray-50'
                  }`}>
                    <span className="text-xl">👥</span>
                  </div>
                  <span className={isActive('/users') ? 'font-medium' : ''}>Users</span>
                </Link>
                
                <Link
                  href="/cards"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    isActive('/cards') 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive('/cards') ? 'bg-pink-100' : 'bg-gray-50'
                  }`}>
                    <span className="text-xl">💳</span>
                  </div>
                  <span className={isActive('/cards') ? 'font-medium' : ''}>Cards</span>
                </Link>

                <Link
                  href="/transactions"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    isActive('/transactions') 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive('/transactions') ? 'bg-purple-100' : 'bg-gray-50'
                  }`}>
                    <span className="text-xl">💸</span>
                  </div>
                  <span className={isActive('/transactions') ? 'font-medium' : ''}>Transactions</span>
                </Link>

                <Link
                  href="/settings"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    isActive('/settings') 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive('/settings') ? 'bg-gray-100' : 'bg-gray-50'
                  }`}>
                    <span className="text-xl">⚙️</span>
                  </div>
                  <span className={isActive('/settings') ? 'font-medium' : ''}>Settings</span>
                </Link>
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:opacity-90 transition-all"
                >
                  <span className="mr-2">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`${isAuthenticated && !isPublicPage ? 'ml-64' : ''} min-h-screen`}>
            <div className="max-w-7xl mx-auto p-8">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
