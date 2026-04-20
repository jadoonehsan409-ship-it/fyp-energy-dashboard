import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

export default function DailyForecast() {
    // ---> PASTE YOUR NEW AI_FORECAST CSV LINK HERE <---
    const AI_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-6G97-09OKa0ogiNKnMQIKx6-caMw404tz1eAr95HV9yRzwT51_dA5toc7dF3shJdzporH5p2z6sf/pub?gid=51074428&single=true&output=csv";

    const [aiForecastData, setAiForecastData] = useState([]);
    const [totalPredictedKwh, setTotalPredictedKwh] = useState("0.00");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAIData = () => {
            Papa.parse(`${AI_SHEET_CSV_URL}&t=${new Date().getTime()}`, {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    const data = results.data;
                    if (data && data.length > 0) {
                        let totalEnergyWh = 0;
                        let dynamicLoads = {};

                        // Calculate total energy and individual appliance energy
                        data.forEach(row => {
                            if (row.Total_Predicted_Wh) {
                                totalEnergyWh += row.Total_Predicted_Wh;
                            }

                            // Find all columns that end with '_Predicted_Wh'
                            Object.keys(row).forEach(key => {
                                if (key.includes('_Predicted_Wh') && key !== 'Total_Predicted_Wh') {
                                    // Clean up the name for the dashboard (e.g., "Refrigerator_ACTIVE_Predicted_Wh" -> "Refrigerator")
                                    let cleanName = key.replace('_Predicted_Wh', '').replace('_ACTIVE', '').replace('_WASH', '').replace('_', ' ');
                                    if (!dynamicLoads[cleanName]) dynamicLoads[cleanName] = 0;
                                    dynamicLoads[cleanName] += (row[key] || 0);
                                }
                            });
                        });

                        setTotalPredictedKwh((totalEnergyWh / 1000).toFixed(2));

                        // Format data perfectly for the Recharts PieChart
                        const colors = ['#0ea5e9', '#eab308', '#22c55e', '#ef4444', '#a855f7', '#f97316'];
                        let pieData = [];
                        let colorIndex = 0;

                        for (const [key, value] of Object.entries(dynamicLoads)) {
                            if (value > 50) { // Only show appliances that actually use significant power
                                pieData.push({
                                    name: key,
                                    value: parseFloat(((value / totalEnergyWh) * 100).toFixed(1)), // Percentage
                                    rawKwh: (value / 1000).toFixed(2), // Actual kWh
                                    color: colors[colorIndex % colors.length]
                                });
                                colorIndex++;
                            }
                        }

                        // Sort so the biggest slice is first
                        pieData.sort((a, b) => b.value - a.value);
                        setAiForecastData(pieData);
                        setIsLoading(false);
                    }
                }
            });
        };

        fetchAIData();
        // Fetch new AI predictions every 1 hour (3600000 ms)
        const interval = setInterval(fetchAIData, 3600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-cardbg border border-gray-800 rounded-xl p-6 mb-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandBlue/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <svg width="20" height="20" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        AI Appliance Forecasting
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Predicted consumption breakdown for the next 48 hours</p>
                </div>

                <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1">Total Predicted</p>
                    <p className="text-2xl font-bold text-white">
                        {isLoading ? "..." : totalPredictedKwh} <span className="text-sm text-gray-500 font-normal">kWh</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
                {/* The AI Pie Chart */}
                <div className="w-full lg:w-1/2 h-[250px] flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500">Loading AI Data...</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={aiForecastData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {aiForecastData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#1f2937', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                    formatter={(value, name, props) => [`${value}% (${props.payload.rawKwh} kWh)`, 'Predicted']}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* AI Insights & Alerts Panel */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            <h3 className="text-sm font-bold text-white">Slab Warning</h3>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Based on the AI forecast, your top consumer will be the <span className="text-brandBlue font-medium">{aiForecastData[0]?.name || "main load"}</span>. Heavy usage over the next 48 hours increases the risk of crossing your monthly utility slab limit.
                        </p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                            <h3 className="text-sm font-bold text-white">AI Suggestion</h3>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Consider scheduling the <span className="text-purple-500 font-medium">{aiForecastData[1]?.name || "secondary load"}</span> during off-peak hours (10:00 PM - 6:00 AM) to optimize your tariff rate and reduce grid stress.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}