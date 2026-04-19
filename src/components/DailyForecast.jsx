import { useState } from 'react';

export default function DailyForecast() {
    const [expandedAccordion, setExpandedAccordion] = useState(false);

    return (

            {/* Header & Badges */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <svg width="20" height="20" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                        </svg>
                        Daily Energy Forecast
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Based on 0-day moving average •</span>
                        <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                            Low Confidence
                        </span>
                    </div>
                </div>
                <div className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 rounded text-xs text-gray-400 flex items-center gap-1 font-mono">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    7-Day Moving Avg
                </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">

                {/* Card 1: Expected */}
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-brandBlue shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Predicted (Daily)</p>
                            <p className="text-sm font-semibold text-gray-300">Expected Units</p>
                        </div>
                    </div>
                    <p className="text-2xl font-mono font-bold text-white mt-1">0.000 <span className="text-sm text-gray-500 font-sans">Units</span></p>
                    <p className="text-xs text-gray-500 mt-1">≈ PKR 0.0/day</p>
                </div>

                {/* Card 2: Actual */}
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                            <svg width="12" height="12" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Today So Far</p>
                            <p className="text-sm font-semibold text-gray-300">Actual Units</p>
                        </div>
                    </div>
                    <p className="text-2xl font-mono font-bold text-white mt-1">0.000 <span className="text-sm text-gray-500 font-sans">Units</span></p>
                    <p className="text-xs text-gray-500 mt-1">≈ PKR 0.0 so far</p>
                </div>

                {/* Card 3: Status */}
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                            <svg width="12" height="12" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 4L12 14.01l-3-3" /></svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">vs Expected</p>
                            <p className="text-sm font-semibold text-gray-300">Status</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-brandGreen mt-1">0.0%</p>
                    <p className="text-xs text-gray-500 mt-1">Within normal range</p>
                </div>

            </div>

            {/* Progress Bar Container */}
            <div className="mb-5">
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400 flex items-center gap-1">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                        Day Progress (15.8h / 24h)
                    </span>
                    <span className="text-gray-500">Expected at this time: 0.000 Units</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 flex overflow-hidden">
                    {/* Blue filled part */}
                    <div className="bg-brandBlue h-1.5" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-600 mt-2 font-mono uppercase">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                </div>
            </div>

            {/* Voltage Safety Alert Box */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 flex items-center gap-3 mb-4">
                <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 4L12 14.01l-3-3" /></svg>
                <span className="text-sm text-gray-300"><span className="text-white font-medium">Voltage Normal:</span> 231.0V (safe range: 190-245V)</span>
            </div>

            {/* Accordion Dropdown (Visual Only) */}
            <div className="border-t border-gray-800 pt-4 mt-2">
                <button onClick={() => setExpandedAccordion(!expandedAccordion)} className="w-full flex justify-between items-center text-sm text-brandBlue hover:text-blue-400 transition-colors">
                    <span className="flex items-center gap-2">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01" /></svg>
                        How does this prediction work?
                    </span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={`transition-transform ${expandedAccordion ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" /></svg>
                </button>
                {expandedAccordion && (
                    <div className="mt-3 p-3 bg-[#0a0a0a] rounded-lg text-xs text-gray-400 border border-gray-800">
                        <p>Our AI-powered forecasting algorithm uses historical consumption data, current usage patterns, weather data, and time-of-day factors to predict your energy consumption. The 7-day moving average smooths out daily fluctuations to provide a reliable baseline.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
