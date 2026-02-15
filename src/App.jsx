import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, BarChart2, Repeat, Zap, Wallet, Search, Bell, Headset, 
  ArrowUpRight, ArrowDownLeft, Eye, EyeOff, MoreHorizontal, TrendingUp 
} from 'lucide-react';

// --- Professional Theme Constants ---
const COLORS = {
  bg: '#0b0e11',
  surface: '#1e2329',
  primary: '#f0b90b', // Signature Yellow
  success: '#02c076', // High-viz Green
  danger: '#f6465d',  // Exchange Red
  textSecondary: '#848e9c'
};

// --- Full Application Logic ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cryptoData, setCryptoData] = useState([
    { id: 'BTC', price: 115499.92, change: -0.16, vol: '429.7M' },
    { id: 'ETH', price: 4479.63, change: -0.02, vol: '377.8M' },
    { id: 'ADA', price: 0.8853, change: -0.87, vol: '32.9M' },
    { id: 'SOL', price: 142.45, change: 1.24, vol: '158.2M' },
    { id: 'TRX', price: 0.3439, change: -0.77, vol: '12.4M' },
    { id: 'DOGE', price: 0.2660, change: -0.59, vol: '110.3M' },
  ]);

  // Simulate Live Price Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(current => current.map(coin => ({
        ...coin,
        price: coin.price + (Math.random() - 0.5) * (coin.price * 0.001),
        lastDir: Math.random() > 0.5 ? 'up' : 'down'
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans antialiased" style={{ backgroundColor: COLORS.bg }}>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-[#0b0e11] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-black" style={{ backgroundColor: COLORS.primary }}>J</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">jwagoc...</span>
              <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>VIP 0</span>
            </div>
          </div>
          <div className="flex gap-4 opacity-80">
            <Search size={20} />
            <Bell size={20} />
            <Headset size={20} />
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="pb-20">
          {activeTab === 'home' && <HomeView cryptoData={cryptoData} />}
          {activeTab === 'markets' && <MarketsView cryptoData={cryptoData} />}
          {activeTab === 'assets' && <AssetsView />}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 max-w-md w-full border-t border-gray-800 flex justify-around py-2 px-1 z-50" style={{ backgroundColor: '#161a1e' }}>
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'markets', label: 'Markets', icon: BarChart2 },
            { id: 'futures', label: 'Futures', icon: Repeat },
            { id: 'perpetual', label: 'Perpetual', icon: Zap },
            { id: 'assets', label: 'Assets', icon: Wallet },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`}
            >
              <tab.icon size={22} color={activeTab === tab.id ? COLORS.primary : 'currentColor'} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        .tabular-nums { font-variant-numeric: tabular-nums; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// --- Sub-Views ---

const HomeView = ({ cryptoData }) => (
  <div className="p-4 space-y-6 animate-in fade-in duration-500">
    {/* Hero Promo */}
    <div className="rounded-2xl h-36 bg-gradient-to-br from-blue-900 via-black to-[#1e2329] p-5 flex flex-col justify-center border border-gray-800">
      <h2 className="text-2xl font-black italic tracking-tighter">OPT COIN</h2>
      <p className="text-xs font-bold text-yellow-500 mt-1 uppercase tracking-widest">Global Digital Asset Hub</p>
      <div className="mt-4 flex gap-1">
        <div className="w-6 h-1 bg-yellow-500 rounded-full"></div>
        <div className="w-1.5 h-1 bg-gray-600 rounded-full"></div>
        <div className="w-1.5 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>

    {/* Price Grid */}
    <div className="grid grid-cols-3 gap-2">
      {cryptoData.slice(0, 3).map(coin => (
        <div key={coin.id} className="text-center p-2 rounded-lg bg-[#1e2329]/30 border border-gray-800/40">
          <div className="text-[10px] text-gray-400 font-bold">{coin.id}/USDT</div>
          <div className={`text-xs font-bold ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.change}%</div>
          <div className="text-sm font-black tabular-nums">{coin.price.toFixed(2)}</div>
        </div>
      ))}
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-4 gap-4">
      {[
        { n: 'Deposit', i: ArrowUpRight },
        { n: 'Withdraw', i: ArrowDownLeft },
        { n: 'Invite', i: TrendingUp },
        { n: 'Support', i: Headset },
      ].map(action => (
        <div key={action.n} className="flex flex-col items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-[#1e2329] flex items-center justify-center border border-gray-800 hover:border-yellow-500 transition-colors">
            <action.i size={20} className="text-yellow-500" />
          </div>
          <span className="text-[10px] font-medium text-gray-300">{action.n}</span>
        </div>
      ))}
    </div>

    {/* Market List Preview */}
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Market Trends</h3>
        <span className="text-xs text-yellow-500">View All</span>
      </div>
      <div className="space-y-4">
        {cryptoData.map(coin => (
          <div key={coin.id} className="flex justify-between items-center py-1">
            <div className="flex flex-col">
              <span className="text-sm font-bold">{coin.id}<span className="text-[10px] text-gray-500 font-normal ml-1">/USDT</span></span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Vol {coin.vol}</span>
            </div>
            <div className="text-right flex items-center gap-6">
              <span className="text-sm font-black tabular-nums">{coin.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              <div className={`w-20 py-1.5 rounded text-xs font-bold text-white text-center ${coin.change >= 0 ? 'bg-[#02c076]' : 'bg-[#f6465d]'}`}>
                {coin.change > 0 ? '+' : ''}{coin.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MarketsView = ({ cryptoData }) => (
  <div className="p-4 animate-in slide-in-from-right duration-300">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-black italic">MARKETS</h1>
      <Search size={20} className="text-gray-400" />
    </div>
    <div className="flex gap-6 mb-4 border-b border-gray-800 text-sm overflow-x-auto no-scrollbar">
      {['Favorites', 'Spot', 'Futures', 'Feed'].map((t, i) => (
        <span key={t} className={`pb-2 whitespace-nowrap ${i === 1 ? 'text-yellow-500 border-b-2 border-yellow-500 font-bold' : 'text-gray-500'}`}>{t}</span>
      ))}
    </div>
    <div className="space-y-5">
      {cryptoData.map(coin => (
        <div key={coin.id} className="flex justify-between items-center border-b border-gray-800/30 pb-3">
          <div className="flex flex-col">
            <span className="text-sm font-black">{coin.id}<span className="text-[10px] text-gray-500 font-normal">/USDT</span></span>
            <span className="text-[10px] text-gray-600">Vol {coin.vol}</span>
          </div>
          <div className="text-right flex items-center gap-5">
             <div className="flex flex-col items-end">
                <span className="text-sm font-black tabular-nums">{coin.price.toFixed(coin.price < 1 ? 4 : 2)}</span>
                <span className="text-[10px] text-gray-500 tabular-nums">≈${coin.price.toFixed(2)}</span>
             </div>
             <div className={`w-16 py-2 rounded text-[11px] font-bold text-white text-center ${coin.change >= 0 ? 'bg-[#02c076]' : 'bg-[#f6465d]'}`}>
                {coin.change}%
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AssetsView = () => (
  <div className="p-5 animate-in slide-in-from-bottom duration-300">
    <h1 className="text-xl font-black italic mb-6 uppercase tracking-tighter">Wallet Assets</h1>
    <div className="p-6 rounded-2xl bg-[#1e2329] border border-gray-800 relative overflow-hidden mb-6 shadow-xl">
      <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={80} /></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">
          Estimated Balance <Eye size={14} />
        </div>
        <div className="text-3xl font-black tabular-nums">335.73 <span className="text-sm font-bold text-yellow-500 ml-1">USDT</span></div>
        <div className="text-[11px] text-gray-500 mt-1">≈ $335.73</div>
        <div className="mt-4 flex items-center gap-1 text-[#02c076] text-xs font-bold">
          <TrendingUp size={14} /> +0.65% Today
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-8">
      <button className="py-3 bg-yellow-500 text-black rounded-lg font-black text-sm uppercase">Deposit</button>
      <button className="py-3 bg-[#2b3139] text-white rounded-lg font-black text-sm uppercase border border-gray-700">Withdraw</button>
    </div>

    <div className="space-y-4">
      <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Accounts</h3>
      {['Spot', 'Funding', 'Earn', 'Futures'].map((acc, i) => (
        <div key={acc} className="flex justify-between items-center p-4 bg-[#1e2329]/40 rounded-xl border border-gray-800">
          <span className="text-sm font-bold">{acc} Account</span>
          <div className="text-right">
            <span className="text-sm font-black tabular-nums">{i === 0 ? '335.73' : '0.00'}</span>
            <span className="text-[10px] text-gray-500 ml-1">USDT</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
