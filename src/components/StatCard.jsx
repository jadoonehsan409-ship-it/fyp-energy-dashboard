export default function StatCard({ title, value, unit, trend, isIncrease, icon, colorHex }) {
    return (
        <div className="bg-cardbg p-5 rounded-xl border border-gray-800 flex flex-col justify-between h-36 shadow-lg">

            {/* Top Row: Icon, Title, and Colored Dot */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">{icon}</span>
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">{title}</h3>
                </div>
                <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" style={{ backgroundColor: colorHex }}></div>
            </div>

            {/* Bottom Row: Main Value and Trend */}
            <div>
                <div className="flex items-baseline gap-1">
                    {/* The main number gets the custom color passed in */}
                    <span className="text-4xl font-bold" style={{ color: colorHex }}>{value}</span>
                    <span className="text-lg text-gray-500 font-medium">{unit}</span>
                </div>

                {/* The small percentage change text */}
                <div className="mt-1 text-xs font-medium">
                    <span className={isIncrease ? "text-red-500" : "text-green-500"}>
                        {isIncrease ? '↗' : '↘'} {trend}%
                    </span>
                    <span className="text-gray-500 ml-2">vs prev</span>
                </div>
            </div>

        </div>
    );
}