import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Proof from './pages/Proof';
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
      {/* Placeholder routes for new modules */}
      <Route path="/jobs" element={<div style={{padding: '100px', textAlign: 'center'}}><h1>Jobs Module</h1><p>Coming soon...</p></div>} />
      <Route path="/analyze" element={<div style={{padding: '100px', textAlign: 'center'}}><h1>JD Analysis Module</h1><p>Coming soon...</p></div>} />
      <Route path="/applications" element={<div style={{padding: '100px', textAlign: 'center'}}><h1>Applications Module</h1><p>Coming soon...</p></div>} />
      <Route path="/settings" element={<div style={{padding: '100px', textAlign: 'center'}}><h1>Settings</h1><p>Coming soon...</p></div>} />
    </Routes>
  );
}

export default App;
