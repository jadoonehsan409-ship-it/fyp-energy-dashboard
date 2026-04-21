import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- FIX: Moved ChartWrapper OUTSIDE the main component ---
const ChartWrapper = ({ title, dataKey, color, unit, data }) => (
    <div className="bg-cardbg border border-gray-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">{title}</h3>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis
                        dataKey="time"
                        stroke="#9ca3af"
                        fontSize={10}
                        tick={{ fill: '#9ca3af' }}
                        interval="preserveStartEnd"
                    />
                    <YAxis stroke="#9ca3af" fontSize={10} unit={unit} tick={{ fill: '#9ca3af' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #374151', borderRadius: '8px' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                        name={title.split(' ')[0]}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function GraphsPage({ allData, onBack }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // --- BULLETPROOF DATE FILTER ---
    const filteredData = allData.filter(item => {
        if (!startDate || !endDate) return true;
        if (!item.fullTime) return true;

        try {
            const start = new Date(`${startDate}T00:00:00`);
            const end = new Date(`${endDate}T23:59:59`);

            const sheetDateStr = item.fullTime.split(' ')[0];
            let itemDate = new Date(sheetDateStr);

            if (isNaN(itemDate.getTime()) && sheetDateStr.includes('/')) {
                const parts = sheetDateStr.split('/');
                if (parts.length === 3) {
                    itemDate = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
                }
            }

            if (isNaN(itemDate.getTime())) {
                return true;
            }

            return itemDate >= start && itemDate <= end;

        } catch (error) {
            console.error("Filtering error:", error);
            return true;
        }
    });

    return (
        <div className="min-h-screen bg-darkbg p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2 text-sm font-medium"
                        >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Dashboard
                        </button>
                        <h1 className="text-2xl font-bold text-white">Historical Analysis</h1>
                    </div>

                    <div className="flex items-center gap-3 bg-cardbg p-3 border border-gray-800 rounded-xl">
                        <div className="flex flex-col">
                            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">From</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                className="bg-transparent text-white text-sm border-none focus:ring-0 cursor-pointer outline-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                        </div>
                        <div className="w-[1px] h-8 bg-gray-800 mx-1"></div>
                        <div className="flex flex-col">
                            <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">To</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                className="bg-transparent text-white text-sm border-none focus:ring-0 cursor-pointer outline-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {filteredData.length === 0 ? (
                    <div className="bg-cardbg border border-dashed border-gray-700 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-500">
                        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mb-4 opacity-20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <p>No data found for the selected date range.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartWrapper data={filteredData} title="Voltage (V)" dataKey="voltage" color="#eab308" unit="V" />
                        <ChartWrapper data={filteredData} title="Current (A)" dataKey="current" color="#0ea5e9" unit="A" />
                        <ChartWrapper data={filteredData} title="Power (W)" dataKey="power" color="#22c55e" unit="W" />
                        <ChartWrapper data={filteredData} title="Energy (kWh)" dataKey="energy" color="#a855f7" unit="kWh" />
                    </div>
                )}
            </div>
        </div>
    );
}