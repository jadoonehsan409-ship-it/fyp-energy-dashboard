export default function StatisticsOverview() {
    // We store the data in a simple array to make generating the table rows easy
    const stats = [
        { name: 'Voltage', min: '0.00 V', max: '239.70 V', avg: '196.44 V', color: '#eab308' },
        { name: 'Current', min: '0.00 A', max: '0.59 A', avg: '0.29 A', color: '#0ea5e9' },
        { name: 'Power', min: '0.00 W', max: '138.24 W', avg: '66.21 W', color: '#22c55e' },
        { name: 'Energy', min: '0.00 Units', max: '87601.48 Units', avg: '74884.17 Units', color: '#a855f7' },
    ];

    return (
        <div className="bg-cardbg p-6 rounded-xl border border-gray-800 mb-8 shadow-lg">

            {/* Header section of the table */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    {/* Simple Chart SVG Icon */}
                    <svg width="20" height="20" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 17V9a2 2 0 00-2-2m0 0a2 2 0 00-2 2v4m4-4H9m9 0h-9m0 0a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6z" />
                    </svg>
                    Statistics Overview
                </h2>
                <span className="text-xs text-gray-500 font-mono">200 points</span>
            </div>

            {/* The Table itself */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-gray-500 border-b border-gray-800">
                            <th className="pb-3 font-medium uppercase tracking-wider">Metric</th>
                            <th className="pb-3 font-medium uppercase tracking-wider">Min</th>
                            <th className="pb-3 font-medium uppercase tracking-wider">Max</th>
                            <th className="pb-3 font-medium uppercase tracking-wider">Avg</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {stats.map((stat) => (
                            <tr key={stat.name} className="hover:bg-white/5 transition-colors">
                                <td className="py-4 flex items-center gap-3">
                                    {/* Colored dot matching the metric */}
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }}></div>
                                    <span className="font-semibold text-gray-200">{stat.name}</span>
                                </td>
                                <td className="py-4 text-gray-400 font-mono text-sm">~ {stat.min}</td>
                                <td className="py-4 text-gray-400 font-mono text-sm">~ {stat.max}</td>
                                <td className="py-4 text-gray-400 font-mono text-sm">~ {stat.avg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}