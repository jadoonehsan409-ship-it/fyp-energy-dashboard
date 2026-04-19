import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import LineChartBox from './components/LineChartBox';
import StatisticsOverview from './components/StatisticsOverview';
import EnergyBudget from './components/EnergyBudget';
import DailyForecast from './components/DailyForecast';
import Settings from './components/Settings'; // <-- Imported your new Settings page!

const BoltIcon = <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
const WaveIcon = <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>;

// Your live ESP32 Data Stream!
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-6G97-09OKa0ogiNKnMQIKx6-caMw404tz1eAr95HV9yRzwT51_dA5toc7dF3shJdzporH5p2z6sf/pub?output=csv";

function App() {
  // 1. Authentication & Routing State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // <-- New Router State

  // 2. Data & Alert States
  const [chartData, setChartData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [latestData, setLatestData] = useState({
    voltage: "0.0",
    current: "0.000",
    power: "0.0",
    energy: "0.00"
  });

  useEffect(() => {
    // Stop fetching data if the user isn't logged in
    if (!isAuthenticated) return;

    const fetchLiveData = () => {
      // CACHE BUSTER: This forces the browser to download fresh data every single time
      const cacheBusterUrl = `${GOOGLE_SHEET_CSV_URL}&t=${new Date().getTime()}`;

      Papa.parse(cacheBusterUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const rawData = results.data;
          const validData = rawData.filter(row => row['Voltage'] != null && row['Voltage'] !== "");

          if (validData.length > 0) {
            const formattedData = validData.map(row => ({
              time: row['Time'] || new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
              voltage: Number(row['Voltage'] || 0).toFixed(1),
              current: Number(row['Current'] || 0).toFixed(3),
              power: Number(row['Power'] || 0).toFixed(1),
              energy: Number(row['Energy'] || 0).toFixed(2),
              frequency: Number(row['Frequency'] || 0).toFixed(1),
              powerFactor: Number(row['Power Factor'] || 0).toFixed(2),
              load: row['Load'] || "N/A"
            }));

            const newLatest = formattedData[formattedData.length - 1];

            // Update the dashboard UI
            setLatestData(newLatest);
            setChartData(formattedData.slice(-30));

            // --- SMART ALERT LOGIC ---
            const newAlerts = [];
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            // Check for unsafe voltage
            if (Number(newLatest.voltage) > 245) {
              newAlerts.push({ message: `High Voltage Detected: ${newLatest.voltage}V`, time: currentTime });
            } else if (Number(newLatest.voltage) < 200 && Number(newLatest.voltage) > 0) {
              newAlerts.push({ message: `Low Voltage Detected: ${newLatest.voltage}V`, time: currentTime });
            }

            // Check for high power consumption
            if (Number(newLatest.power) > 2000) {
              newAlerts.push({ message: `High Power Consumption: ${newLatest.power}W`, time: currentTime });
            }

            // Only update alerts if we found new ones, keeping the 10 most recent
            if (newAlerts.length > 0) {
              setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
            }

          } else {
            console.log("Warning: No valid data rows found in the sheet.");
          }
        },
        error: (error) => {
          console.error("Error fetching Google Sheet data:", error);
        }
      });
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 9000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // 3. THE LOGIN GATE
  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  // 4. THE SETTINGS PAGE ROUTE
  if (currentView === 'settings') {
    return <Settings onBack={() => setCurrentView('dashboard')} />;
  }

  // 5. THE MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-darkbg p-6">
      <div className="max-w-7xl mx-auto">

        {/* Pass the logout, alerts, and settings functions to the Navbar */}
        <Navbar
          onLogout={() => setIsAuthenticated(false)}
          alerts={alerts}
          onOpenSettings={() => setCurrentView('settings')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="VOLTAGE" value={latestData.voltage} unit="V" trend="-" isIncrease={true} icon={BoltIcon} colorHex="#eab308" />
          <StatCard title="CURRENT" value={latestData.current} unit="A" trend="-" isIncrease={true} icon={WaveIcon} colorHex="#0ea5e9" />
          <StatCard title="POWER" value={latestData.power} unit="W" trend="-" isIncrease={true} icon={BoltIcon} colorHex="#22c55e" />
          <StatCard title="ENERGY" value={latestData.energy} unit="kWh" trend="-" isIncrease={false} icon={WaveIcon} colorHex="#a855f7" />
        </div>

        <EnergyBudget />
        <DailyForecast />
        <StatisticsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <LineChartBox title="Voltage Over Time" data={chartData} dataKey="voltage" unit="V" colorHex="#eab308" />
          <LineChartBox title="Current Over Time" data={chartData} dataKey="current" unit="A" colorHex="#0ea5e9" />
          <LineChartBox title="Power Over Time" data={chartData} dataKey="power" unit="W" colorHex="#22c55e" />
          <LineChartBox title="Energy Over Time" data={chartData} dataKey="energy" unit="kWh" colorHex="#a855f7" />
        </div>

      </div>
    </div>
  )
}

export default App