import { Box, Container, CssBaseline, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useGermanStore from '../../store';

const Progress = () => {
  const store = useGermanStore();
  useEffect(() => {
    if (!store.user) window.location.href = '/';
  }, [store]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="a"
          // href="/"
          sx={{
            mb: 2,
            flexGrow: 1,
            // fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          MY PROGRESS
        </Typography>
      </Box>

      <Box sx={{ minHeight: '80vh' }}>
        {store.user?.progress.map((p) => (
          <Typography variant="h6" key={p.name}>
            {p.name}: {p.correctGuesses} / {p.totalGuesses}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default Progress;
