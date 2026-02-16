"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const tickerContent = (
    <div className="flex items-center gap-8 px-4">
      <span className="text-gold font-bold text-[10px] uppercase tracking-widest border-r border-gold/20 pr-8">
        Protocol Status:
      </span>
      <span className="text-gray-400 text-[10px] uppercase tracking-wider">
        ● Draw Genesis: Pending
      </span>
      <span className="text-gray-400 text-[10px] uppercase tracking-wider">
        ● Verifiable Randomness: Online
      </span>
      <span className="text-gray-400 text-[10px] uppercase tracking-wider">
        ● Signed Announcements: Enabled
      </span>
      <span className="text-gray-400 text-[10px] uppercase tracking-wider">
        ● Cooldowns: 25 Rounds
      </span>
      <span className="text-gray-400 text-[10px] uppercase tracking-wider">
        ● Exile Redemption: $5 USDC
      </span>
    </div>
  );

  return (
    <header className="relative z-30">
      {/* Entrant Ticker */}
      <div className="fixed top-0 left-0 w-full bg-black/80 border-b border-gold/20 py-2 z-40 overflow-hidden whitespace-nowrap backdrop-blur-sm">
        <div className="flex animate-marquee items-center">
          {tickerContent}
          {tickerContent}
        </div>
      </div>

      {/* Main Nav */}
      <nav className="fixed top-12 right-0 p-6 z-40">
        <Link
          href="/faq"
          className="text-gold/60 hover:text-gold font-serif italic text-sm transition-colors uppercase tracking-widest"
        >
          The Codex
        </Link>
      </nav>
    </header>
  );
}
