import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="CryptoICO Logo" className="h-12 w-auto" />
    
            src="/logo.png"     // metti il file logo nella cartella /public
            alt="CryptoICO Logo"
            className="h-12 w-auto" // altezza 48px, larghezza proporzionata
          />
        </Link>

        {/* NAVBAR DESKTOP */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link href="/icos" className="text-gray-700 hover:text-green-600">
            ICO Listings
          </Link>
          <a href="#" className="text-gray-700 hover:text-green-600">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Contact
          </a>
        </nav>

        {/* MENU MOBILE (hamburger) */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* MENU MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg">
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-green-600"
          >
            Home
          </Link>
          <Link
            href="/icos"
            className="block py-2 text-gray-700 hover:text-green-600"
          >
            ICO Listings
          </Link>
          <a
            href="#"
            className="block py-2 text-gray-700 hover:text-green-600"
          >
            About
          </a>
          <a
            href="#"
            className="block py-2 text-gray-700 hover:text-green-600"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
