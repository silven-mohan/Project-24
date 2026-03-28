import React from 'react';
import GhostCursor from './GhostCursor';

export default function App() {
  return (
    <div className="app-container">
      {/* The component EXACTLY as given by the user */}
      <div className="canvas-wrapper" style={{ width: '1080px', height: '1080px', position: 'relative' }}>
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
        
        <div className="content-container">
          <h1>Welcome</h1>
          <p className="subtitle">Experience an elegant and dynamic journey in pure React. Hover around to see the ghost cursor effect before you dive in.</p>
          <a href="index.html" className="get-started-btn">Get Started</a>
        </div>
      </div>
    </div>
  );
}
