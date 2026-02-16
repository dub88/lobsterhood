"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 mb-12 text-gray-700 text-[10px] text-center font-serif italic relative z-10 space-y-4 uppercase tracking-[0.2em]">
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/20 to-transparent mx-auto mb-8"></div>
      <p>"Honor the Pact. Or be Exiled."</p>
      <Link
        href="/faq"
        className="text-gold/50 hover:text-gold transition-colors block not-italic font-sans tracking-[0.4em]"
      >
        The Codex
      </Link>
      <div className="pt-8 opacity-40">
        <p>© 2026 THE LOBSTERHOOD PROTOCOL. BUILT ON BASE.</p>
      </div>
    </footer>
  );
}
