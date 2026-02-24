import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Proof from './pages/Proof';
import Jobs from './pages/Jobs';
import Analyze from './pages/Analyze';
import Applications from './pages/Applications';
import Settings from './pages/Settings';
import { initAutomationEngine } from './utils/automationEngine';
import './App.css';

// Initialize automation engine
function App() {
  useEffect(() => {
    initAutomationEngine();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/resume" element={<Builder />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/proof" element={<Proof />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
