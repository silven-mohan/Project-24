import React from 'react';
import GhostCursor from './GhostCursor';
import './App.css';

export default function App() {
  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', backgroundColor: 'black', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Full-screen GhostCursor Background (Overrides the 1080px to full-screen as requested) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <GhostCursor
            trailLength={60}
            inertia={0.5}
            grainIntensity={0.05}
            bloomStrength={0.1}
            bloomRadius={1}
            brightness={2}
            color="#B19EEF"
            edgeIntensity={0}
        />
      </div>

      {/* Content overlay */}
      <div className="content-container" style={{ zIndex: 10, position: 'relative' }}>
        <h1>Welcome</h1>
        <p className="subtitle">Experience an elegant and dynamic journey in pure React.</p>
        <a href="index.html" className="get-started-btn">Get Started</a>
      </div>
      
    </div>
  );
}
