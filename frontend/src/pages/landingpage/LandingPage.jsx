import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Teams from './components/Teams.jsx';
import Footer from './components/Footer.jsx';

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Hero />
        <Features />
        <Teams />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
