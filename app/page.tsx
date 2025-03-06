import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      {/* Content */}
      <div className="relative text-center z-10">
        <div className="relative inline-block pb-3">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-tight relative z-10 mb-0">
            Happy Bonding
          </h1>
          {/* Decorative underline */}
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-sm"></div>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
        </div>
        <p className="text-gray-600 text-xl mb-8 mt-6">Experience the future of banking</p>
        <Link href="/login">
          <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-4 rounded-full font-semibold text-white hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-xl">
            Get Started
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
}
