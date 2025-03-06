"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigationItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: '📈'
  },
  {
    path: '/cards',
    label: 'Cards',
    icon: '💳'
  },
  {
    path: '/transactions',
    label: 'Transactions',
    icon: '💸'
  },
  {
    path: '/users',
    label: 'Users',
    icon: '👥'
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: '⚙️'
  }
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Happy Bonding
        </h1>
      </div>
      
      <nav className="px-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 p-3 ${
              pathname === item.path 
                ? 'bg-gray-50 text-gray-700' 
                : 'text-gray-600 hover:bg-gray-50'
            } rounded-lg transition-all`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
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
  );
} 