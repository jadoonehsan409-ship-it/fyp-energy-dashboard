import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnergyBudget() {
    // Mock data for the daily consumption bar chart
    const barData = Array.from({ length: 20 }, (_, i) => ({
        day: i + 1,
        units: (Math.random() * 2 + 0.2).toFixed(2)
    }));

    return (
        <div className="bg-cardbg p-6 rounded-xl border border-gray-800 mb-8 shadow-lg">

            {/* Header & Title */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg width="20" height="20" fill="none" stroke="#eab308" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Energy Budget & Cost
                </h2>
                <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-white transition-colors">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>
                    Settings
                </button>
            </div>
            <p className="text-xs text-gray-500 mb-6">Track monthly usage, compare periods, and estimate your electricity bill</p>

            {/* The 3 Timeline Tabs */}
            <div className="flex bg-[#0a0a0a] rounded-lg p-1 mb-6 border border-gray-800">
                <button className="flex-1 bg-cardbg py-2 rounded-md text-sm font-medium text-white shadow">This Month</button>
                <button className="flex-1 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">Last Month</button>
                <button className="flex-1 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">All</button>
            </div>

            {/* Progress Bar Container */}
            <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-300 flex items-center gap-2">
                        <div className="w-2 h-2 bg-brandBlue rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                        Current Budget Progress
                    </span>
                    <span className="text-white font-mono font-bold">12.50 / 30.0 Units</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-brandBlue h-1.5 rounded-full" style={{ width: '41%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-2 text-gray-500">
                    <span>0 Units</span>
                    <span>30.0 Units</span>
                </div>
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                {/* Card 1: This Month */}
                <div className="p-5 rounded-lg border border-gray-800 bg-[#0a0a0a]">
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                        <svg width="16" height="16" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        This Month
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Total Used</span><span className="text-white font-mono">12.50 Units</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Peak Power</span><span className="text-white font-mono">138.2 W</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Avg Power</span><span className="text-white font-mono">66.2 W</span></div>
                    </div>
                </div>

                {/* Card 2: Last Month (Empty State) */}
                <div className="p-5 rounded-lg border border-gray-800 bg-[#0a0a0a] flex flex-col justify-center items-center text-gray-500">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mb-2 opacity-30"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span className="text-xs">No data for last month</span>
                </div>

                {/* Card 3: Monthly Cost */}
                <div className="p-5 rounded-lg border border-gray-800 bg-[#0a0a0a] flex flex-col justify-between">
                    <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <svg width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01M17 12h.01M7 12h.01"></path></svg>
                        Monthly Cost
                    </h3>
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-1">This month so far</p>
                        <p className="text-3xl font-bold text-brandGreen font-mono">PKR 450</p>
                    </div>
                </div>

            </div>

            {/* Daily Consumption Bar Chart */}
            <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <svg width="14" height="14" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Daily Consumption
                </h3>
                <div className="w-full h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <XAxis dataKey="day" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: '#262626' }}
                                contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#d4d4d8', fontWeight: 'bold' }}
                            />
                            {/* The bars themselves. White when active/hovered, dark gray normally */}
                            <Bar dataKey="units" fill="#3f3f46" radius={[4, 4, 0, 0]} activeBar={{ fill: '#f4f4f5' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}