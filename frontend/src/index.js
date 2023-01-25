import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Body from './components/Body';
import Feed from './components/Feed';
import Header from './components/Header';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Posts from './components/Posts';
import Profiles from './components/Profiles';
import Search from './components/Search';
import SignIn from './components/SignIn';
import Error from './components/Error';


const root = createRoot( document.getElementById('root'));
  
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
