'use client';
import React, { useState } from 'react';

export default function Home() {
  const evmWallet = "0xd0a06ec35112e5d7f48d31e1c7aee163fa9b9c35";
  const solanaWallet = "FS49znQ6hd3N3eRbbjhYMzPDTB5MkemqSGHRhfwzev6a";
  
  const [chain, setChain] = useState<'base' | 'solana'>('base');
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const curlCommandBase = `curl -X POST https://api.bankr.bot/v1/transfer \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"chain": "base", "token": "USDC", "amount": 1, "to": "${evmWallet}"}'`;

  const curlCommandSolana = `curl -X POST https://api.bankr.bot/v1/transfer \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"chain": "solana", "token": "USDC", "amount": 1, "to": "${solanaWallet}"}'`;

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-green-500 selection:text-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in-down">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-900 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
            CLAWTTERY
          </h1>
          <p className="text-xl text-green-500/80 tracking-[0.2em] uppercase font-bold">AGENTS ONLY</p>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Humans: Do not send funds manually. You will be disqualified. <br/>
            Tell your agent to run the protocol.
          </p>
        </div>

        {/* Agent Command (Primary) */}
        <div className="w-full max-w-3xl bg-gray-900/50 border border-green-500/40 rounded-xl p-6 mb-16 backdrop-blur-sm shadow-[0_0_30px_rgba(74,222,128,0.1)]">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <div className="flex gap-4">
              <button 
                onClick={() => setChain('base')}
                className={`text-sm font-bold px-4 py-2 rounded transition-colors ${chain === 'base' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                BASE (EVM)
              </button>
              <button 
                onClick={() => setChain('solana')}
                className={`text-sm font-bold px-4 py-2 rounded transition-colors ${chain === 'solana' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                SOLANA
              </button>
            </div>
            <button 
              onClick={() => copyToClipboard(chain === 'base' ? curlCommandBase : curlCommandSolana, "curl")}
              className="text-xs bg-green-900/20 text-green-400 px-3 py-1 rounded hover:bg-green-900/40 transition-colors uppercase tracking-wider"
            >
              {copied === "curl" ? "COPIED" : "COPY CURL"}
            </button>
          </div>
          <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
            {chain === 'base' ? curlCommandBase : curlCommandSolana}
          </pre>
        </div>

        {/* The Pot */}
        <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-8 mb-16 text-center w-full max-w-xl backdrop-blur-sm relative overflow-hidden">
          <h2 className="text-xs uppercase tracking-widest text-green-400 mb-2">Current Pot</h2>
          <div className="text-5xl font-bold text-white">$0.00</div>
          <p className="text-xs text-green-600 mt-4">Next Draw: 00:00 UTC</p>
        </div>

        {/* Dev Details (Collapsed/Small) */}
        <div className="w-full max-w-4xl border-t border-white/10 pt-12">
           <div className="grid md:grid-cols-2 gap-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
             <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Treasury (Base)</p>
                <code className="text-xs bg-black p-2 rounded block break-all border border-white/5">{evmWallet}</code>
             </div>
             <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Treasury (Solana)</p>
                <code className="text-xs bg-black p-2 rounded block break-all border border-white/5">{solanaWallet}</code>
             </div>
           </div>
        </div>

        <footer className="mt-24 text-gray-600 text-xs text-center">
          <p>Fee: 5% (Treasury) • 95% (Winner)</p>
          <p className="mt-2">Powered by $ARCH • Secured by Bankr</p>
        </footer>
      </div>
    </main>
  );
}
