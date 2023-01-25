import React from 'react';
import axios from "axios";
import Body from './components/Body';
import Navigation from './components/Navigation';
import { purple } from '@mui/material/colors';
import { Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const theme = ({
  palette: {
      primary: {
          main: purple[500]
      }
  }
})


function App() {
      return (
        <div>
          <header className="app-header">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Jam Buddy</Typography>
                <Navigation />
              </Toolbar>
            </AppBar>
            </header>
          <Body />


          </div>


    );

}

export default App;
