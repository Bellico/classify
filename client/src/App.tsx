import React, { useState } from 'react';
import { HomePage } from './layout/home-page';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { WorkingPage } from './layout/working-page';
import './scss/main.scss'


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffa115'
    }
  }
});


export const App = () => {

  const [startPath, setStartPath] = useState();

  return (
    <ThemeProvider theme={theme}>
      <main className="app">
        {!startPath || startPath === '' ?
          <HomePage startWorkingOn={setStartPath} />
          :
          <WorkingPage startPath={startPath} setStartPath={setStartPath} />}
      </main>
    </ThemeProvider>
  );
}
