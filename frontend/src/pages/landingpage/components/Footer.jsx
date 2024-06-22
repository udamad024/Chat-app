import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link href="https://kusalthiwanka.com">Collabor8</Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          pt: { xs: 12, sm: 12 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Copyright />
      </Box>
    </Container>
  );
}
