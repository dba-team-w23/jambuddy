import React from 'react';
import Body from './components/Body';
import Navbar from './components/partials/Navbar';

function App() {
      return (
        <div>
          <header className="app-header">
            <Navbar />
            </header>
          <Body />
        </div>
    );
}

export default App;
