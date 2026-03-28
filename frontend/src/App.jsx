import React from 'react';

export default function App() {
  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      
      {/* Content overlay */}
      <div className="content-container" style={{ zIndex: 10 }}>
        <h1>Welcome</h1>
        <p className="subtitle">Experience an elegant and dynamic journey in pure React.</p>
        <a href="index.html" className="get-started-btn">Get Started</a>
      </div>
      
    </div>
  );
}
