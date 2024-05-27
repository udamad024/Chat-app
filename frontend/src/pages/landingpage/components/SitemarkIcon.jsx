import * as React from 'react';
import Box from '@mui/material/Box';
import Logo from '/logo.png';

export default function SitemarkIcon() {
  return (
    <Box
      component="img"
      src={Logo}
      alt="Site Logo"
      sx={{ height: 30, width: 30, mr: 2 }}
    />
  );
}