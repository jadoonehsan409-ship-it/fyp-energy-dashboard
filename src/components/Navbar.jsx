import { useState, useEffect } from 'react';

export default function Navbar({ onLogout, alerts, onOpenSettings }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showDevices, setShowDevices] = useState(false);
    const [showBill, setShowBill] = useState(false);
    // Safety check just in case alerts is undefined initially
    const unreadCount = alerts ? alerts.length : 0;

    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved) setIsDarkMode(JSON.parse(saved));
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
        document.documentElement.classList.toggle('dark');
    };

    const clearAllAlerts = () => {
        // This would need to be passed from parent to actually clear
        setShowNotifications(false);
    };

    return (
        <nav className="flex justify-between items-center py-4 mb-6 border-b border-gray-800 relative">

            {/* --- LEFT SIDE: Title & Logout --- */}
            <div className="flex items-center gap-6">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-wide">Energy Monitor</h1>
                    <p className="text-xs text-gray-400 hidden sm:block">Real-time electrical parameter tracking</p>
                </div>

                {/* Logout Button (Moved to the left to match your UI screenshot) */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors pl-6 border-l border-gray-800"
                >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>

            {/* --- RIGHT SIDE: Tools, Icons & Profile --- */}
            <div className="flex items-center gap-5">

                {/* Live Status Badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 bg-brandGreen rounded-full animate-pulse"></div>
                    <span className="text-xs text-brandGreen font-medium">Live</span>
                </div>

                {/* 1. Notification Bell */}
                <div className="relative flex items-center">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="text-gray-400 hover:text-white transition-colors relative"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                        {unreadCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-darkbg">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Dropdown Box */}
                    {showNotifications && (
                        <div className="absolute right-0 top-8 mt-2 w-72 bg-cardbg border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center">
                                <span className="text-sm font-bold text-white">Alerts</span>
                                <button onClick={clearAllAlerts} className="text-xs text-[#0ea5e9] cursor-pointer hover:underline">Clear all</button>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {unreadCount === 0 ? (
                                    <div className="px-4 py-6 text-center text-xs text-gray-500">No new alerts</div>
                                ) : (
                                    alerts.map((alert, index) => (
                                        <div key={index} className="px-4 py-3 border-b border-gray-800 hover:bg-white/5 transition-colors">
                                            <p className="text-xs text-gray-300">{alert.message}</p>
                                            <span className="text-[10px] text-gray-500 mt-1 block">{alert.time}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Dark Mode / Moon Icon */}
                <button onClick={toggleDarkMode} className="text-gray-400 hover:text-white transition-colors">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                </button>

                {/* 3. Settings / Gear Icon (Triggers the routing!) */}
                <button
                    onClick={onOpenSettings}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                </button>

                {/* 4. Devices / Microchip */}
                <div className="relative">
                    <button onClick={() => setShowDevices(!showDevices)} className="hidden lg:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-medium text-sm ml-2">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                        </svg>
                        <span>Devices</span>
                    </button>
                    {showDevices && (
                        <div className="absolute right-0 top-8 mt-2 w-64 bg-cardbg border border-gray-800 rounded-xl shadow-2xl z-50">
                            <div className="px-4 py-3 border-b border-gray-800">
                                <span className="text-sm font-bold text-white">Connected Devices</span>
                            </div>
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors">
                                    <div className="w-8 h-8 bg-green-500/10 rounded flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-white">ESP32 Energy Meter</p>
                                        <p className="text-[10px] text-gray-500">Last seen: 2 min ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 5. Bill / Receipt */}
                <div className="relative">
                    <button onClick={() => setShowBill(!showBill)} className="hidden lg:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-medium text-sm">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Bill</span>
                    </button>
                    {showBill && (
                        <div className="absolute right-0 top-8 mt-2 w-72 bg-cardbg border border-gray-800 rounded-xl shadow-2xl z-50">
                            <div className="px-4 py-3 border-b border-gray-800">
                                <span className="text-sm font-bold text-white">Monthly Bill Summary</span>
                            </div>
                            <div className="px-4 py-4 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Current Month Usage:</span>
                                    <span className="text-white font-mono">12.50 kWh</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Estimated Bill:</span>
                                    <span className="text-white font-mono">PKR 450</span>
                                </div>
                                <div className="pt-2 border-t border-gray-800 flex justify-between text-xs">
                                    <span className="text-gray-400">Billing Date:</span>
                                    <span className="text-white font-mono">15th of month</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 6. User Email Profile */}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-800 ml-1">
                    <span className="text-sm text-gray-400 hidden xl:inline">jadoonehsan407@gmail.com</span>
                    <div className="w-8 h-8 bg-[#0ea5e9] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-[0_0_8px_rgba(14,165,233,0.5)]">
                        J
                    </div>
                </div>

            </div>
        </nav>
    );
}
