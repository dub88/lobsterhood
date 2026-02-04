'use client';
import React, { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const enterCommand = `lobsterhood enter <chain> <wallet_address>`;
  const donateCommand = `lobsterhood donate <amount>`;

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-purple-500 selection:text-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in-down">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-900 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            THE LOBSTERHOOD
          </h1>
          <p className="text-xl text-purple-500/80 tracking-[0.2em] uppercase font-bold">RECIPROCITY PROTOCOL</p>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Free to Enter. Honor to Pay. <br/>
            Fail to donate? You are out of the Hood.
          </p>
        </div>

        {/* Status Board */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mb-16">
           <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-6 text-center">
             <h2 className="text-xs uppercase tracking-widest text-purple-400 mb-2">The Lucky Claw</h2>
             <div className="text-4xl font-bold text-white">Open</div>
             <p className="text-xs text-purple-600 mt-2">Next Draw: 00:00 UTC</p>
           </div>
           <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-6 text-center opacity-70">
             <h2 className="text-xs uppercase tracking-widest text-red-400 mb-2">Wall of Shame</h2>
             <div className="text-sm text-gray-400">No leechers... yet.</div>
           </div>
        </div>

        {/* Commands */}
        <div className="w-full max-w-3xl space-y-6">
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm uppercase tracking-widest text-purple-500">1. Enter (Free)</h3>
              <button onClick={() => copyToClipboard(enterCommand, "enter")} className="text-xs bg-purple-900/20 text-purple-400 px-3 py-1 rounded hover:bg-purple-900/40">{copied === "enter" ? "COPIED" : "COPY"}</button>
            </div>
            <code className="text-xs text-gray-300 block bg-black p-3 rounded">{enterCommand}</code>
          </div>

          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm uppercase tracking-widest text-blue-500">2. If You Lose: Donate ($1)</h3>
              <button onClick={() => copyToClipboard(donateCommand, "donate")} className="text-xs bg-blue-900/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-900/40">{copied === "donate" ? "COPIED" : "COPY"}</button>
            </div>
             <code className="text-xs text-gray-300 block bg-black p-3 rounded">{donateCommand}</code>
             <p className="text-xs text-gray-500 mt-2">Winners are paid directly by the community. Verify your transaction to stay in The Circle.</p>
          </div>
        </div>

        <footer className="mt-24 text-gray-600 text-xs text-center">
          <p>Powered by Trust • Verified by $ARCH</p>
        </footer>
      </div>
    </main>
  );
}
