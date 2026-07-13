"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white font-black uppercase tracking-tighter text-xl md:text-2xl"
              onClick={closeMenu}
            >
              <span>⚽</span>
              <span>Weekly<span className="text-[#ccff00]">Football</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
              <Link 
                href="/" 
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/#about" 
                className="text-zinc-300 hover:text-white transition-colors"
              >
                About
              </Link>
              
              <div className="flex flex-col items-center justify-center group relative cursor-not-allowed">
                <span className="text-zinc-600">Login</span>
                <span className="absolute -bottom-4 text-[9px] text-[#ccff00]/70 whitespace-nowrap">
                  Coming Soon
                </span>
              </div>

              <Link 
                href="/register" 
                className="bg-[#ccff00] text-black px-6 py-2.5 rounded-full hover:bg-[#b3e600] transition-all transform active:scale-95 shadow-[0_0_15px_rgba(204,255,0,0.15)]"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-zinc-400 hover:text-white focus:outline-none p-2"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#111111] border-b border-zinc-800" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center text-center">
            <Link 
              href="/" 
              className="text-zinc-300 hover:text-white block px-3 py-4 text-base font-bold uppercase tracking-widest w-full border-b border-zinc-800/50"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/#about" 
              className="text-zinc-300 hover:text-white block px-3 py-4 text-base font-bold uppercase tracking-widest w-full border-b border-zinc-800/50"
              onClick={closeMenu}
            >
              About
            </Link>
            
            <div className="block px-3 py-4 w-full border-b border-zinc-800/50">
              <span className="text-zinc-600 text-base font-bold uppercase tracking-widest block">Login</span>
              <span className="text-[10px] text-[#ccff00]/70 uppercase tracking-widest mt-1 block">Coming Soon</span>
            </div>

            <Link 
              href="/register" 
              className="bg-[#ccff00] text-black block px-3 py-4 text-base font-bold uppercase tracking-widest w-full rounded-xl mt-4"
              onClick={closeMenu}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}