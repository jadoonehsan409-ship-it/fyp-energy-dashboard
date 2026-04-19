import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function LineChartBox({ title, data, dataKey, colorHex, unit }) {
    return (
        <div className="bg-cardbg p-5 rounded-xl border border-gray-800 shadow-lg h-72 flex flex-col">

            {/* Chart Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">{title}</h3>
                <span className="text-xs text-gray-500 tracking-wider uppercase">-- Predicted {unit}</span>
            </div>

            {/* The Actual Graph */}
            <div className="flex-grow w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        {/* X and Y Axes (Time and Values) */}
                        <XAxis dataKey="time" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} width={35} />

                        {/* The popup when you hover over the line */}
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: colorHex, fontWeight: 'bold' }}
                        />

                        {/* The colored line itself */}
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={colorHex}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false} /* Turned off for better performance with live ESP32 data later */
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}