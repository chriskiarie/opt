import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BarChart2, 
  Repeat, 
  Zap, 
  Wallet, 
  Search, 
  Bell, 
  Headset, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownLeft,
  Eye,
  EyeOff,
  User,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---
const CRYPTO_DATA = [
  { id: 'BTC', name: 'BTC', price: 115499.92, change: -0.16, turnover: '429773424.66' },
  { id: 'ETH', name: 'ETH', price: 4479.63, change: -0.02, turnover: '377858030.54' },
  { id: 'ADA', name: 'ADA', price: 0.8853, change: -0.87, turnover: '32967753.44' },
  { id: 'BCH', name: 'BCH', price: 595.93, change: 0.25, turnover: '3001851.18' },
  { id: 'DASH', name: 'DASH', price: 23.034, change: -1.00, turnover: '262877' },
  { id: 'DOGE', name: 'DOGE', price: 0.26604, change: -0.59, turnover: '110353518.84' },
  { id: 'DOT', name: 'DOT', price: 4.31, change: -0.87, turnover: '9440663.83' },
];

const HOT_COIN = { name: 'ZEC', price: 51.781, change: 2.27 };

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'markets', label: 'Markets', icon: BarChart2 },
    { id: 'futures', label: 'Futures', icon: Repeat },
    { id: 'perpetual', label: 'Perpetual', icon: Zap },
    { id: 'assets', label: 'Assets', icon: Wallet },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1c22] border-t border-gray-800 flex justify-around items-center py-2 px-1 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center flex-1 transition-colors ${
              isActive ? 'text-[#00c087]' : 'text-gray-500'
            }`}
          >
            <div className={`p-1 rounded-full ${isActive && tab.id === 'home' ? 'bg-yellow-400 text-black' : ''}`}>
               <Icon size={20} />
            </div>
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const HomePage = () => (
  <div className="p-4 pb-24 animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
         <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">j</div>
         <span className="text-sm font-semibold">jwagoc...</span>
      </div>
      <Bell size={20} className="text-gray-400" />
    </div>

    {/* Hero Banner */}
    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[2/1] bg-gradient-to-br from-blue-900 to-black flex items-center justify-center border border-gray-800">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      <h1 className="text-3xl font-bold tracking-widest text-white z-10">OPT COIN</h1>
      <div className="absolute bottom-4 flex gap-1">
        {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i===1 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>)}
      </div>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
      <div>
        <div className="text-xs text-gray-400 mb-1">ETH/USDT</div>
        <div className="text-red-500 text-xs">-0.02%</div>
        <div className="text-lg font-bold">4479.58</div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">BTC/USDT</div>
        <div className="text-red-500 text-xs">-0.16%</div>
        <div className="text-lg font-bold">115500.31</div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">TRX/USDT</div>
        <div className="text-red-500 text-xs">-0.77%</div>
        <div className="text-lg font-bold text-red-400">0.34396</div>
      </div>
    </div>

    {/* Action Grid */}
    <div className="grid grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Recharge', icon: ArrowUpRight, color: 'text-yellow-500' },
        { label: 'Withdraw', icon: ArrowDownLeft, color: 'text-yellow-500' },
        { label: 'Convert', icon: Repeat, color: 'text-yellow-500' },
        { label: 'Contact Us', icon: Headset, color: 'text-yellow-500' },
      ].map((action, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#1e2128] flex items-center justify-center border border-gray-800">
            <action.icon className={action.color} size={24} />
          </div>
          <span className="text-xs text-gray-300">{action.label}</span>
        </div>
      ))}
    </div>

    {/* Hot Section */}
    <div>
      <h3 className="text-lg font-bold mb-4">Hot</h3>
      <div className="flex justify-between text-xs text-gray-500 mb-2 px-2">
        <span>Pair</span>
        <span>Price</span>
        <span>24h change</span>
      </div>
      <div className="bg-[#1e2128] rounded-xl p-4 flex justify-between items-center border border-gray-800">
        <span className="font-bold">{HOT_COIN.name}</span>
        <span className="font-medium">{HOT_COIN.price}</span>
        <div className="bg-[#00c087] text-white px-3 py-1 rounded-md text-sm font-bold">
          +{HOT_COIN.change}%
        </div>
      </div>
    </div>
  </div>
);

const MarketsPage = () => (
  <div className="p-4 pb-24 animate-in slide-in-from-right duration-300">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Markets</h1>
      <Search className="text-gray-400" />
    </div>
    
    <div className="flex gap-6 mb-6 overflow-x-auto no-scrollbar border-b border-gray-800">
      {['Digital Currency', 'Forex', 'Precious metals'].map((tab, i) => (
        <span key={tab} className={`pb-2 text-sm whitespace-nowrap ${i === 0 ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500'}`}>
          {tab}
        </span>
      ))}
    </div>

    <div className="flex justify-between text-[10px] text-gray-500 mb-4 uppercase tracking-tighter">
      <div className="flex gap-1 items-center">Pair <MoreHorizontal size={10}/> /Turnover</div>
      <div className="flex gap-8">
        <span>Price</span>
        <span>24h change</span>
      </div>
    </div>

    <div className="space-y-6">
      {CRYPTO_DATA.map((coin) => (
        <div key={coin.id} className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-base font-bold">{coin.id}</span>
            <span className="text-[10px] text-gray-500">Turnover {coin.turnover}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold">{coin.price}</span>
            <div className={`w-20 py-2 rounded text-center text-sm font-bold text-white ${coin.change >= 0 ? 'bg-[#00c087]' : 'bg-[#f6465d]'}`}>
              {coin.change > 0 ? '+' : ''}{coin.change}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AssetsPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  return (
    <div className="p-4 pb-24 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="bg-[#1e2128] px-3 py-1 rounded-full flex items-center gap-2 text-xs border border-gray-700">
          <span>Demo Account</span>
          <Repeat size={12} className="text-gray-400" />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
          <span>Total asset valuation</span>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{showBalance ? '335.73' : '******'}</span>
          <span className="text-gray-400 font-medium">USDT</span>
        </div>
        <div className="text-[#00c087] text-sm mt-1">
          $2.2 (0.655%) Today's earnings
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-10">
        {[
          { label: 'Recharge', icon: ArrowUpRight },
          { label: 'Withdraw', icon: ArrowDownLeft },
          { label: 'Transfer', icon: Repeat },
          { label: 'Convert', icon: Zap },
        ].map((item, i) => (
          <button key={i} className="flex flex-col items-center gap-2 p-2 bg-[#1e2128] rounded-xl border border-gray-800">
            <item.icon className="text-gray-300" size={20} />
            <span className="text-[10px] text-gray-400">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold border-b-2 border-yellow-500 w-fit pb-1 mb-4">My account</h3>
        {[
          { name: 'Exchange', value: '0.00', percent: '0.00%' },
          { name: 'Trade', value: '335.73', percent: '100.00%', active: true },
          { name: 'Perpetual', value: '0.00', percent: '0.00%' },
        ].map((acc, i) => (
          <div key={i} className={`p-4 rounded-xl border ${acc.active ? 'border-gray-600 bg-[#1e2128]' : 'border-gray-800 bg-[#16181d]'} flex justify-between items-center`}>
            <span className="font-bold">{acc.name}</span>
            <div className="text-right">
              <div className="font-bold">${acc.value}</div>
              <div className={acc.active ? 'text-[#00c087] text-xs' : 'text-gray-600 text-xs'}>{acc.percent}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white font-sans selection:bg-yellow-500/30">
      {/* Tailwind CSS Injection to ensure it works in CodeSandbox without setup */}
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      
      {/* Mobile container simulator */}
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl shadow-black/50 bg-[#0d0e12]">
        
        {/* Render pages based on state */}
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'markets' && <MarketsPage />}
        {activeTab === 'assets' && <AssetsPage />}

        {/* Placeholder for other tabs */}
        {(activeTab === 'futures' || activeTab === 'perpetual') && (
          <div className="flex flex-col items-center justify-center h-[80vh] px-8 text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
               {activeTab === 'futures' ? <Repeat size={40} className="text-gray-600" /> : <Zap size={40} className="text-gray-600" />}
            </div>
            <h2 className="text-xl font-bold mb-2 uppercase tracking-widest">{activeTab} Trading</h2>
            <p className="text-gray-500 text-sm">Real-time trading interface for advanced leverage coming soon.</p>
          </div>
        )}

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background-color: #000; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}
