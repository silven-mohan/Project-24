import React from 'react';
import GhostCursor from './GhostCursor';

export default function App() {
  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Full-screen Background Ghost Cursor */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <GhostCursor
            trailLength={50}
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
      <div className="content-container" style={{ position: 'relative', zIndex: 10 }}>
        <h1>Welcome</h1>
        <p className="subtitle">Experience an elegant and dynamic journey in pure React. Hover around to see the ghost cursor effect before you dive in.</p>
        <a href="index.html" className="get-started-btn">Get Started</a>
      </div>
      
    </div>
  );
}
