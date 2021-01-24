import React from 'react';

const Auth = props => {
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

export default Auth;
