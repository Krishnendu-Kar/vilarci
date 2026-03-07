import React from 'react';

function App() {
  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#ffffff' }}>
      <iframe 
        src="https://krishnendu-kar.github.io/vilarci/" 
        title="Vilarci App"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0
        }}
        allow="geolocation; microphone; camera"
      />
    </div>
  );
}

export default App;