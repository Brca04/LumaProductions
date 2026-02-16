'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Početna', href: '/' },
    { name: 'Maturalne Večeri', href: '/maturalne-veceri' },
    { name: 'Vjenčanja', href: '/vjencanja' },
    { name: 'Krštenja', href: '/krstenja' },
    { name: 'Reklamna produkcija', href: '/reklame' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="px-8 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24 relative">

          {/* Menu button */}
          <div className="z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="relative flex h-[25px] w-[35px] flex-col justify-between focus:outline-none"
            >
              <span
                className={`h-[2px] w-full bg-[#be9d5a] transition-all duration-400 ease-in-out ${
                  isOpen ? 'translate-y-[11.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full bg-[#be9d5a] transition-all duration-400 ease-in-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full bg-[#be9d5a] transition-all duration-400 ease-in-out ${
                  isOpen ? '-translate-y-[11.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>

          {/* Logo centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center">
              <Image
                src="/luma-productions-logo-225x300.webp"
                width={128}
                height={160}
                className="w-32 h-40 object-contain"
                alt="Luma Productions Logo"
                priority
              />
            </Link>
          </div>

          {/* Spacer to balance hamburger button */}
          <div className="w-[35px]"></div>

        </div>
      </div>

      {/* Overlay - only visible on mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 z-30 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile: Full-screen menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white text-black flex flex-col items-center justify-center transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative text-3xl py-4 transition-colors group inline-block ${
              isActive(item.href) ? 'text-[#be9d5a]' : 'text-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
            {/* Golden underline - only on hover, not on active */}
            {!isActive(item.href) && (
              <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-[#be9d5a] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            )}
          </Link>
        ))}
      </div>

      {/* Desktop: Side menu */}
      <div
        className={`hidden lg:block fixed inset-y-0 left-0 w-80 bg-white shadow-2xl transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-32 px-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-xl py-6 transition-colors group inline-block ${
                isActive(item.href) ? 'text-[#be9d5a]' : 'text-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
              {/* Golden underline - only on hover, not on active */}
              {!isActive(item.href) && (
                <span
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[2px] bg-[#be9d5a] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: Overlay */}
      <div
        className={`hidden lg:block fixed inset-0 bg-black/30 transition-opacity duration-300 z-30 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </nav>
  );
}