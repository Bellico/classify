import React from 'react';
import './scss/main.scss'
import { HomePage } from './layout/home-page';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

export const baseUrlApi = 'http://localhost:3001/api/'


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e0995e'
    }
  }
});



export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <main className="app">
        <HomePage />
      </main>
    </ThemeProvider>
  );
}
