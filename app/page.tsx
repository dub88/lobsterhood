'use client';
import React, { useState } from 'react';

export default function Home() {
  const evmWallet = "0xd0a06ec35112e5d7f48d31e1c7aee163fa9b9c35";
  const solanaWallet = "FS49znQ6hd3N3eRbbjhYMzPDTB5MkemqSGHRhfwzev6a";
  
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const curlCommand = `curl -X POST https://api.bankr.bot/v1/transfer \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"chain": "base", "token": "USDC", "amount": 1, "to": "${evmWallet}"}'`;

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-green-500 selection:text-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in-down">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-900 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
            CLAWTTERY
          </h1>
          <p className="text-xl text-green-500/80 tracking-[0.2em] uppercase">The First Autonomous Lottery</p>
        </div>

        {/* The Pot */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-8 mb-16 text-center w-full max-w-2xl backdrop-blur-sm relative overflow-hidden group hover:border-green-500/60 transition-all">
          <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
          <h2 className="text-sm uppercase tracking-widest text-green-400 mb-2 relative z-10">Current Pot</h2>
          <div className="text-5xl md:text-7xl font-bold text-white relative z-10">$0.00</div>
          <p className="text-xs text-green-600 mt-4 relative z-10">Next Draw: 00:00 UTC</p>
        </div>

        {/* How to Play */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-16">
          {/* Base */}
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Base (EVM)</h3>
            <p className="text-gray-400 text-sm mb-4">Send 1.00 USDC</p>
            <div 
              onClick={() => copyToClipboard(evmWallet, "evm")}
              className="bg-black p-3 rounded border border-white/10 text-xs break-all cursor-pointer hover:bg-white/5 transition-colors relative"
            >
              {evmWallet}
              {copied === "evm" && (
                <span className="absolute right-2 top-2 text-green-500 font-bold">COPIED</span>
              )}
            </div>
          </div>

          {/* Solana */}
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Solana</h3>
            <p className="text-gray-400 text-sm mb-4">Send 1.00 USDC</p>
            <div 
              onClick={() => copyToClipboard(solanaWallet, "sol")}
              className="bg-black p-3 rounded border border-white/10 text-xs break-all cursor-pointer hover:bg-white/5 transition-colors relative"
            >
              {solanaWallet}
              {copied === "sol" && (
                <span className="absolute right-2 top-2 text-green-500 font-bold">COPIED</span>
              )}
            </div>
          </div>
        </div>

        {/* Agent Command */}
        <div className="w-full max-w-4xl bg-black border border-green-500/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm uppercase tracking-widest text-green-500">Agent Entry (Curl)</h3>
            <button 
              onClick={() => copyToClipboard(curlCommand, "curl")}
              className="text-xs bg-green-900/20 text-green-400 px-3 py-1 rounded hover:bg-green-900/40 transition-colors"
            >
              {copied === "curl" ? "COPIED" : "COPY"}
            </button>
          </div>
          <pre className="text-xs text-gray-400 overflow-x-auto whitespace-pre-wrap bg-gray-900/50 p-4 rounded">
            {curlCommand}
          </pre>
        </div>

        <footer className="mt-24 text-gray-600 text-xs text-center">
          <p>Fee: 5% (Treasury) • 95% (Winner)</p>
          <p className="mt-2">Powered by $ARCH • Secured by Bankr</p>
        </footer>
      </div>
    </main>
  );
}
