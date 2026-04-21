import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import LineChartBox from './components/LineChartBox';
import StatisticsOverview from './components/StatisticsOverview';
import EnergyBudget from './components/EnergyBudget';
import DailyForecast from './components/DailyForecast';
import Settings from './components/Settings';
import ExportReport from './components/ExportReport';
import GraphsPage from './components/GraphsPage'; // <-- New Import

const BoltIcon = <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
const WaveIcon = <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>;

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-6G97-09OKa0ogiNKnMQIKx6-caMw404tz1eAr95HV9yRzwT51_dA5toc7dF3shJdzporH5p2z6sf/pub?output=csv";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [chartData, setChartData] = useState([]);
  const [historyData, setHistoryData] = useState([]); // <-- State for full history
  const [alerts, setAlerts] = useState([]);
  const [latestData, setLatestData] = useState({
    voltage: "0.0",
    current: "0.000",
    power: "0.0",
    energy: "0.000"
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchLiveData = () => {
      const cacheBusterUrl = `${GOOGLE_SHEET_CSV_URL}&t=${new Date().getTime()}`;

      Papa.parse(cacheBusterUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const rawData = results.data;
          const validData = rawData.filter(row => row['Voltage'] != null && row['Voltage'] !== "");

          if (validData.length > 0) {
            const now = new Date();
            const todayStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

            const firstEntryToday = validData.find(row =>
              row['Time'] && row['Time'].toString().startsWith(todayStr)
            );

            const dailyBaseEnergy = firstEntryToday ? Number(firstEntryToday['Energy'] || 0) : Number(validData[validData.length - 1]['Energy'] || 0);

            const formattedData = validData.map(row => {
              const cumulativeEnergy = Number(row['Energy'] || 0);
              const isToday = row['Time'] && row['Time'].toString().startsWith(todayStr);

              let dailyEnergyWh = isToday ? (cumulativeEnergy - dailyBaseEnergy) : 0;
              if (dailyEnergyWh < 0) dailyEnergyWh = 0;

              return {
                fullTime: row['Time'] || "", // Keep full time for filtering
                time: row['Time'] ? row['Time'].split(' ')[1].substring(0, 5) : "00:00",
                voltage: Number(row['Voltage'] || 0).toFixed(1),
                current: Number(row['Current'] || 0).toFixed(3),
                power: Number(row['Power'] || 0).toFixed(1),
                energy: (dailyEnergyWh / 1000).toFixed(3),
                frequency: Number(row['Frequency'] || 0).toFixed(1),
                powerFactor: Number(row['Power Factor'] || 0).toFixed(2),
                load: row['Load'] || "N/A"
              };
            });

            const newLatest = formattedData[formattedData.length - 1];
            setLatestData(newLatest);
            setChartData(formattedData.slice(-30)); // Small subset for live dashboard
            setHistoryData(formattedData.slice(-2000)); // Larger subset for Graphs page

            // Alert logic...
            const newAlerts = [];
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            if (Number(newLatest.voltage) > 245) newAlerts.push({ message: `High Voltage: ${newLatest.voltage}V`, time: currentTime });
            if (Number(newLatest.power) > 2000) newAlerts.push({ message: `High Power: ${newLatest.power}W`, time: currentTime });
            if (newAlerts.length > 0) setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
          }
        }
      });
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 9000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Auth onLogin={() => setIsAuthenticated(true)} />;
  if (currentView === 'settings') return <Settings onBack={() => setCurrentView('dashboard')} />;

  // --- SHOW GRAPHS VIEW ---
  if (currentView === 'graphs') {
    return <GraphsPage allData={historyData} onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-darkbg p-6">
      <div className="max-w-7xl mx-auto">
        <Navbar onLogout={() => setIsAuthenticated(false)} alerts={alerts} onOpenSettings={() => setCurrentView('settings')} />

        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">System Overview</h2>
            <div className="flex gap-4 mt-1">
              <p className="text-xs text-gray-500 hidden sm:block">Live data tracking and analysis</p>
              {/* BUTTON TO GO TO GRAPHS */}
              <button
                onClick={() => setCurrentView('graphs')}
                className="text-xs text-brandBlue hover:underline font-bold flex items-center gap-1"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                View Detailed History
              </button>
            </div>
          </div>
          <ExportReport targetId="printable-dashboard" filename="Energy-Report" />
        </div>

        <div id="printable-dashboard" className="pb-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="VOLTAGE" value={latestData.voltage} unit="V" icon={BoltIcon} colorHex="#eab308" />
            <StatCard title="CURRENT" value={latestData.current} unit="A" icon={WaveIcon} colorHex="#0ea5e9" />
            <StatCard title="POWER" value={latestData.power} unit="W" icon={BoltIcon} colorHex="#22c55e" />
            <StatCard title="DAILY ENERGY" value={latestData.energy} unit="kWh" icon={WaveIcon} colorHex="#a855f7" />
          </div>

          <EnergyBudget dailyEnergyKwh={latestData.energy} />
          <DailyForecast />
          <StatisticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            <LineChartBox title="Voltage Over Time" data={chartData} dataKey="voltage" unit="V" colorHex="#eab308" />
            <LineChartBox title="Current Over Time" data={chartData} dataKey="current" unit="A" colorHex="#0ea5e9" />
            <LineChartBox title="Power Over Time" data={chartData} dataKey="power" unit="W" colorHex="#22c55e" />
            <LineChartBox title="Energy (Today)" data={chartData} dataKey="energy" unit="kWh" colorHex="#a855f7" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;