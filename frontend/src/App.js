import React from 'react';
import Body from './components/Body';
import Navbar from './components/partials/Navbar';

function App() {
      return (
        <div>
          <BrowserRouter {... window.__REACT_DEVTOOLS_GLOBAL_HOOK__}></BrowserRouter>
          <Body />
        </div>
    );
}

export default App;
