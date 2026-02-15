import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, BarChart3, PieChart, LayoutDashboard } from 'lucide-react';

const INITIAL_COINS = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 92450.20, change: 2.45, color: '#F7931A' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2840.15, change: -1.20, color: '#627EEA' },
  { id: 3, name: 'Opt Coin', symbol: 'OPT', price: 12.45, change: 8.12, color: '#10B981' },
  { id: 4, name: 'Solana', symbol: 'SOL', price: 142.80, change: 4.50, color: '#14F195' }
];

export default function App() {
  const [coins, setCoins] = useState(INITIAL_COINS);

  // Simulate live price movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(currentCoins => 
        currentCoins.map(coin => {
          const movement = (Math.random() - 0.5) * (coin.price * 0.001);
          return { ...coin, price: coin.price + movement };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-gray-800 p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-emerald-500">OPT COIN</h1>
        <nav className="flex flex-col gap-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<Wallet size={20}/>} label="Wallet" />
          <NavItem icon={<BarChart3 size={20}/>} label="Market" />
          <NavItem icon={<PieChart size={20}/>} label="Portfolio" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Market Overview</h2>
            <p className="text-gray-400">Welcome back, Chris</p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg font-bold transition">
            Connect Wallet
          </button>
        </header>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {coins.map(coin => (
            <div key={coin.id} className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: coin.color + '33', color: coin.color }}>
                  {coin.symbol[0]}
                </div>
                <span className={`flex items-center gap-1 text-sm ${coin.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {coin.change >= 0 ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                  {Math.abs(coin.change)}%
                </span>
              </div>
              <h3 className="text-gray-400 text-sm">{coin.name}</h3>
              <p className="text-2xl font-mono font-bold">${coin.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
          ))}
        </div>

        {/* Large Chart Placeholder */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 h-[400px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Real-time Candlestick Chart (TradingView Integration Ready)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${active ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}