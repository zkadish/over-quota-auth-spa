import { Router, Switch, Route } from 'react-router-dom';

import VerifyEmail from '../../components/VerifyEmail';

// import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* header */}
      </header>
      <main className="App-main">
        <div className="App-content">
          <VerifyEmail />
        </div>
      </main>
      <footer className="App-footer">
        {/* footer */}
      </footer>
    </div>
  );
}

export default App;
