import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, BarChart2, Repeat, Zap, Wallet, Search, Bell, Headphones, 
  ArrowUpRight, ArrowDownLeft, Eye, EyeOff, MoreHorizontal, TrendingUp 
} from 'lucide-react';
import { createChart } from 'lightweight-charts';

const COLORS = {
  bg: '#0b0e11',
  surface: '#1e2329',
  primary: '#f0b90b', 
  success: '#02c076', 
  danger: '#f6465d',
  textSecondary: '#848e9c'
};

// --- Cool MMMCOIN Logo Component ---
const MMMLLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill={COLORS.primary} />
    <path d="M25 70V30L50 55L75 30V70" stroke="black" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35 70V40L50 55L65 40V70" stroke="black" strokeWidth="6" opacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cryptoData, setCryptoData] = useState([]);

  // FETCH REAL DATA FROM BINANCE
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","ADAUSDT","SOLUSDT","TRXUSDT","DOGEUSDT"]');
        const data = await response.json();
        const formatted = data.map(item => ({
          id: item.symbol.replace('USDT', ''),
          price: parseFloat(item.lastPrice),
          change: parseFloat(item.priceChangePercent),
          vol: (parseFloat(item.quoteVolume) / 1000000).toFixed(1) + 'M'
        }));
        setCryptoData(formatted);
      } catch (err) {
        console.error("Market data fetch failed", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans antialiased" style={{ backgroundColor: COLORS.bg }}>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-[#0b0e11] overflow-hidden border-x border-gray-800/30">
        
        {/* MMMCOIN Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <MMMLLogo />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest">MMMCOIN</span>
              <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>PRO TERMINAL</span>
            </div>
          </div>
          <div className="flex gap-4 opacity-80">
            <Search size={20} />
            <Bell size={20} />
            <Headphones size={20} />
          </div>
        </div>

        <div className="pb-20">
          {activeTab === 'home' && <HomeView cryptoData={cryptoData} />}
          {activeTab === 'markets' && <MarketsView cryptoData={cryptoData} />}
          {activeTab === 'assets' && <AssetsView />}
        </div>

        {/* Navigation */}
        <nav className="fixed bottom-0 max-w-md w-full border-t border-gray-800 flex justify-around py-2 px-1 z-50" style={{ backgroundColor: '#161a1e' }}>
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'markets', label: 'Markets', icon: BarChart2 },
            { id: 'futures', label: 'Futures', icon: Repeat },
            { id: 'perpetual', label: 'Perpetual', icon: Zap },
            { id: 'assets', label: 'Assets', icon: Wallet },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center flex-1 py-1 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`}>
              <tab.icon size={22} color={activeTab === tab.id ? COLORS.primary : 'currentColor'} />
              <span className="text-[10px] mt-1 font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// --- Real-Time Chart Component ---
const MarketChart = ({ symbol = "BTCUSDT" }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: { backgroundColor: 'transparent', textColor: '#848e9c' },
      grid: { vertLines: { visible: false }, horzLines: { color: '#1e2329' } },
      width: chartContainerRef.current.clientWidth,
      height: 200,
      timeScale: { visible: false },
    });
    const lineSeries = chart.addAreaSeries({
      lineColor: COLORS.primary,
      topColor: 'rgba(240, 185, 11, 0.2)',
      bottomColor: 'rgba(240, 185, 11, 0)',
    });

    // Fetch historical candles
    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=50`)
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map(d => ({ time: d[0] / 1000, value: parseFloat(d[4]) }));
        lineSeries.setData(formattedData);
      });

    return () => chart.remove();
  }, [symbol]);

  return <div ref={chartContainerRef} className="w-full mt-2" />;
};

const HomeView = ({ cryptoData }) => (
  <div className="p-4 space-y-6 animate-in fade-in duration-500">
    <div className="rounded-2xl h-44 bg-gradient-to-br from-[#1e2329] to-black p-5 border border-gray-800 relative">
      <div className="relative z-10">
        <h2 className="text-2xl font-black italic tracking-tighter">MMMCOIN</h2>
        <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.2em]">Institutional Grade Trading</p>
        <MarketChart />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {cryptoData.slice(0, 3).map(coin => (
        <div key={coin.id} className="text-center p-2 rounded-lg bg-[#1e2329]/30 border border-gray-800/40">
          <div className="text-[10px] text-gray-400 font-bold">{coin.id}/USDT</div>
          <div className={`text-xs font-bold ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.change}%</div>
          <div className="text-sm font-black tabular-nums">{coin.price.toFixed(2)}</div>
        </div>
      ))}
    </div>

    {/* Same Quick Actions as before... */}
    <div className="grid grid-cols-4 gap-4">
      {[{ n: 'Deposit', i: ArrowUpRight }, { n: 'Withdraw', i: ArrowDownLeft }, { n: 'MMM-Pool', i: TrendingUp }, { n: 'Live Chat', i: Headphones }].map(action => (
        <div key={action.n} className="flex flex-col items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-[#1e2329] flex items-center justify-center border border-gray-800">
            <action.i size={20} className="text-yellow-500" />
          </div>
          <span className="text-[10px] font-medium text-gray-300">{action.n}</span>
        </div>
      ))}
    </div>
    
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-4 px-1">Hot Assets</h3>
      {cryptoData.map(coin => (
        <div key={coin.id} className="flex justify-between items-center py-3 border-b border-gray-800/20 px-1">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold">{coin.id[0]}</div>
             <span className="text-sm font-bold">{coin.id}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-black tabular-nums">{coin.price.toLocaleString()}</span>
            <div className={`w-20 py-1.5 rounded text-xs font-bold text-white text-center ${coin.change >= 0 ? 'bg-[#02c076]' : 'bg-[#f6465d]'}`}>
              {coin.change > 0 ? '+' : ''}{coin.change}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// (Keep MarketsView and AssetsView from previous code, just updating text to MMMCOIN)
const MarketsView = ({ cryptoData }) => ( <div className="p-4"> <h1 className="text-xl font-black italic mb-6">MMM MARKETS</h1> {/* ... rest same as before */} </div> );
const AssetsView = () => ( <div className="p-5"> <h1 className="text-xl font-black italic mb-6">MMM WALLET</h1> {/* ... rest same as before */} </div> );
