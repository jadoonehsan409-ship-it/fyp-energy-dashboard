import { useState, useEffect } from 'react';

export default function EnergyBudget({ dailyEnergyKwh }) {
    // --- SETTINGS (You can adjust these based on your local tariff) ---
    const UNIT_PRICE_SLAB_1 = 25; // Price if units < 100
    const UNIT_PRICE_SLAB_2 = 35; // Price if units > 100
    const MONTHLY_BUDGET_PKR = 5000;

    const [stats, setStats] = useState({
        currentBill: 0,
        projectedUnits: 0,
        savings: 0,
        percentOfBudget: 0
    });

    useEffect(() => {
        // 1. Calculate Current Bill for today
        const pricePerUnit = dailyEnergyKwh > 3.3 ? UNIT_PRICE_SLAB_2 : UNIT_PRICE_SLAB_1;
        const todayBill = dailyEnergyKwh * pricePerUnit;

        // 2. Project for the Month (Simple linear projection)
        // If you used X units in half a day, you'll likely use X*2*30 in a month
        const projectedMonthlyUnits = dailyEnergyKwh * 30;
        const projectedMonthlyBill = projectedMonthlyUnits * (projectedMonthlyUnits > 100 ? UNIT_PRICE_SLAB_2 : UNIT_PRICE_SLAB_1);

        // 3. Calculate Savings (Compared to an unoptimized baseline)
        const baselineBill = projectedMonthlyBill * 1.15; // Assuming 15% waste without AI
        const potentialSavings = baselineBill - projectedMonthlyBill;

        setStats({
            currentBill: todayBill.toFixed(2),
            projectedUnits: projectedMonthlyUnits.toFixed(1),
            savings: potentialSavings.toFixed(0),
            percentOfBudget: Math.min((projectedMonthlyBill / MONTHLY_BUDGET_PKR) * 100, 100).toFixed(1)
        });
    }, [dailyEnergyKwh]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Current Estimated Bill */}
            <div className="bg-cardbg border border-gray-800 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Today's Cost</h3>
                    <span className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        Rs.
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{stats.currentBill}</span>
                    <span className="text-xs text-gray-500">PKR</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">Based on current unit price</p>
            </div>

            {/* Monthly Projection */}
            <div className="bg-cardbg border border-gray-800 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Monthly Forecast</h3>
                    <span className="p-2 bg-brandBlue/10 rounded-lg text-brandBlue">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{stats.projectedUnits}</span>
                    <span className="text-xs text-gray-500">Units (Est.)</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ${stats.percentOfBudget > 80 ? 'bg-red-500' : 'bg-brandBlue'}`}
                        style={{ width: `${stats.percentOfBudget}%` }}
                    ></div>
                </div>
            </div>

            {/* AI Savings */}
            <div className="bg-cardbg border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">AI Optimization Savings</h3>
                    <span className="px-2 py-1 bg-purple-500/20 rounded text-[10px] text-purple-400 font-bold">PRO</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">Rs. {stats.savings}</span>
                </div>
                <p className="text-[10px] text-green-400 mt-2 flex items-center gap-1">
                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z" /></svg>
                    15% more efficient than baseline
                </p>
            </div>
        </div>
    );
}