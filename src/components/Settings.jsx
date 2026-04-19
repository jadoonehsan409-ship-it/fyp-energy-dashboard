import { useState } from 'react';

// A reusable custom toggle switch component
const Toggle = ({ enabled, onChange }) => (
    <div
        onClick={() => onChange(!enabled)}
        className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer transition-colors ${enabled ? 'bg-[#0ea5e9]' : 'bg-gray-700'}`}
    >
        <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-5' : ''}`}></div>
    </div>
);

export default function Settings({ onBack }) {
    // State to hold all our settings values
    const [settings, setSettings] = useState({
        unitPrice: 35,
        currency: 'PKR',
        dailyBudget: 1000,
        budgetAlerts: true,
        slabPricing: true,
        slabs: [
            { from: 1, to: 100, rate: 12 },
            { from: 101, to: 300, rate: 35 },
            { from: 301, to: '∞', rate: 55 }
        ],
        fpa: 0,
        qta: 0,
        finCost: 0,
        elecDuty: 1.5,
        gst: 18,
        ptv: 35,
        meterRent: 25,
        powerThreshold: 1000,
        voltageAlerts: true,
        voltageLow: 200,
        voltageHigh: 250,
        milestoneAlerts: true,
        dailyGoal: 10,
        emailAlerts: false,
        refreshInterval: 9
    });

    const updateSetting = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

    return (
        <div className="min-h-screen bg-darkbg text-gray-300 pb-20">
            {/* Top Navigation Bar for Settings */}
            <div className="border-b border-gray-800 bg-[#0a0a0a] sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Dashboard
                    </button>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        jadoonehsan407@gmail.com
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-8">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-sm text-gray-500 mb-8">Customize your energy monitoring dashboard</p>

                {/* --- SECTION 1: Electricity Cost & Budget --- */}
                <div className="bg-cardbg border border-gray-800 rounded-xl p-6 mb-6 shadow-lg">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-1">
                        <svg width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01M17 12h.01M7 12h.01"></path></svg>
                        Electricity Cost & Budget
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">Set your electricity unit price and daily energy budget for cost estimation and alerts</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Unit Price (per kWh)</label>
                            <div className="flex bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden focus-within:border-[#0ea5e9] transition-colors">
                                <input type="number" value={settings.unitPrice} onChange={e => updateSetting('unitPrice', e.target.value)} className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                                <span className="px-3 py-2 text-xs text-gray-500 bg-gray-900 border-l border-gray-800">PKR/kWh</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Pakistan avg: PKR 35-55 per unit (kWh)</p>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Currency</label>
                            <input type="text" value={settings.currency} onChange={e => updateSetting('currency', e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2 text-white outline-none focus:border-[#0ea5e9]" />
                            <p className="text-[10px] text-gray-500 mt-1">e.g., PKR, $, €, £</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Daily Energy Budget</label>
                        <div className="flex bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden focus-within:border-[#0ea5e9]">
                            <input type="number" value={settings.dailyBudget} onChange={e => updateSetting('dailyBudget', e.target.value)} className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                            <span className="px-3 py-2 text-xs text-gray-500 bg-gray-900 border-l border-gray-800">Wh</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Alert when daily usage exceeds this limit. 1000 Wh = 1.0 kWh = ~PKR 35/day</p>
                    </div>

                    <div className="flex items-center justify-between py-3 border-t border-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-200">Budget Alerts</p>
                            <p className="text-xs text-gray-500">Get warned when approaching or exceeding daily budget</p>
                        </div>
                        <Toggle enabled={settings.budgetAlerts} onChange={v => updateSetting('budgetAlerts', v)} />
                    </div>

                    <div className="flex items-center justify-between py-3 border-t border-gray-800">
                        <div>
                            <p className="text-sm font-medium text-brandBlue flex items-center gap-1">
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                WAPDA/LESCO Slab Pricing
                            </p>
                            <p className="text-xs text-gray-500">Calculate bills using tiered rates instead of a flat rate</p>
                        </div>
                        <Toggle enabled={settings.slabPricing} onChange={v => updateSetting('slabPricing', v)} />
                    </div>

                    {/* Slabs Array Visualizer */}
                    {settings.slabPricing && (
                        <div className="mt-4 bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Slab Tiers (Per Month)</p>
                            {settings.slabs.map((slab, i) => (
                                <div key={i} className="flex items-end gap-2 mb-3">
                                    <div className="flex-1"><label className="text-[10px] text-gray-500">From (Units)</label><input type="text" value={slab.from} readOnly className="w-full bg-darkbg border border-gray-800 rounded px-2 py-1 text-sm text-gray-300" /></div>
                                    <div className="flex-1"><label className="text-[10px] text-gray-500">To (Units)</label><input type="text" value={slab.to} readOnly className="w-full bg-darkbg border border-gray-800 rounded px-2 py-1 text-sm text-gray-300" /></div>
                                    <div className="flex-1"><label className="text-[10px] text-gray-500">Rate (PKR)</label><input type="text" value={slab.rate} readOnly className="w-full bg-darkbg border border-gray-800 rounded px-2 py-1 text-sm text-gray-300" /></div>
                                    <button className="p-1.5 text-gray-600 hover:text-red-500 transition-colors"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                </div>
                            ))}
                            <button className="w-full py-2 border border-dashed border-gray-700 rounded text-xs text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center justify-center gap-1 mt-2">
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> Add Slab Tier
                            </button>
                        </div>
                    )}
                </div>

                {/* --- SECTION 2: Taxes & Surcharges --- */}
                <div className="bg-cardbg border border-gray-800 rounded-xl p-6 mb-6 shadow-lg">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-1">
                        <svg width="18" height="18" fill="none" stroke="#eab308" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Taxes & Surcharges (LESCO/WAPDA)
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">Add government taxes, FPA, and fixed monthly fees for an accurate Pakistani electricity bill</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Fuel Price Adjustment (FPA)</label>
                            <div className="flex bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden focus-within:border-[#eab308]">
                                <input type="number" value={settings.fpa} onChange={e => updateSetting('fpa', e.target.value)} className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                                <span className="px-2 py-2 text-[10px] text-gray-500 bg-gray-900 border-l border-gray-800">PKR/Unit</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Quarterly Tariff Adjustment (QTA)</label>
                            <div className="flex bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden focus-within:border-[#eab308]">
                                <input type="number" value={settings.qta} onChange={e => updateSetting('qta', e.target.value)} className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                                <span className="px-2 py-2 text-[10px] text-gray-500 bg-gray-900 border-l border-gray-800">PKR/Unit</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">General Sales Tax (GST)</label>
                            <div className="flex bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden focus-within:border-[#eab308]">
                                <input type="number" value={settings.gst} onChange={e => updateSetting('gst', e.target.value)} className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                                <span className="px-3 py-2 text-xs text-gray-500 bg-gray-900 border-l border-gray-800">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">PTV License Fee</label>
                            <div className="flex bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden focus-within:border-[#eab308]">
                                <input type="number" value={settings.ptv} onChange={e => updateSetting('ptv', e.target.value)} className="w-full bg-transparent px-3 py-2 text-white outline-none" />
                                <span className="px-2 py-2 text-[10px] text-gray-500 bg-gray-900 border-l border-gray-800">PKR/mo</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-yellow-500/5 border border-yellow-500/10 rounded p-3 flex items-center gap-2">
                        <span className="text-yellow-500 text-xs">💡</span>
                        <span className="text-[10px] text-gray-400">Check your latest LESCO/WAPDA bill for current FPA & QTA rates — they change monthly.</span>
                    </div>
                </div>

                {/* --- SECTION 3: Power Alert Threshold --- */}
                <div className="bg-cardbg border border-gray-800 rounded-xl p-6 mb-6 shadow-lg">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-1">
                        <svg width="18" height="18" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Power Alert Threshold
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">Set the power consumption threshold for high power alerts</p>

                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">Threshold Value</span>
                            <span className="text-sm font-bold text-brandBlue">{settings.powerThreshold}W</span>
                        </div>
                        <input type="range" min="50" max="5000" step="50" value={settings.powerThreshold} onChange={e => updateSetting('powerThreshold', e.target.value)} className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brandBlue" />
                        <div className="flex justify-between text-[10px] text-gray-500 mt-2"><span>50W</span><span>5000W</span></div>
                    </div>
                </div>

            </div>

            {/* Sticky Bottom Save Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 p-4 z-50">
                <div className="max-w-3xl mx-auto flex justify-between gap-4">
                    <button className="flex-1 bg-brandBlue hover:bg-blue-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                        Save Settings
                    </button>
                    <button className="px-6 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}