'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Početna', href: '/' },
    { name: 'Maturalne Večeri', href: '/maturalne-veceri' },
    { name: 'Vjenčanja', href: '/vjencanja' },
    { name: 'Krštenja', href: '/krstenja' },
    { name: 'Reklamna produkcija', href: '/reklame' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="px-8 md:px-8 lg:px-8">
        <div className="flex justify-between items-center h-24 relative">

          {/* Mobile menu button */}
          <div className="z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="relative flex h-[25px] w-[35px] flex-col justify-between focus:outline-none"
            >
              <span
                className={`h-[2px] w-full bg-[#be9d5a] transition-all duration-400 ease-in-out ${
                  isOpen ? 'translate-y-[11px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full bg-[#be9d5a] transition-all duration-400 ease-in-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full bg-[#be9d5a] transition-all duration-400 ease-in-out ${
                  isOpen ? '-translate-y-[11px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>

          {/* Logo centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center">
              <img
                src="/luma-productions-logo-225x300.webp"
                className="w-32 h-40 object-contain"
                alt="Luma Productions Logo"
              />
            </Link>
          </div>

        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 bg-white text-black flex flex-col items-center justify-center transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-3xl py-4 hover:text-[#be9d5a] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
