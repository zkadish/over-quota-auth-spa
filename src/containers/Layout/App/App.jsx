import React from 'react';

import './App.scss';

const App = props => {
  const { children } = props;

  return (
    <div className="App">
      <header className="App-header">
        {/* header */}
      </header>
      <main className="App-main">
        <div className="App-content">
          {children}
        </div>
      </main>
      <footer className="App-footer">
        {/* footer */}
      </footer>
    </div>
  );
};

export default App;
