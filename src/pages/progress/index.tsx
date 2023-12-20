import { Box, Container, CssBaseline, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import useGermanStore from '../../store';
import { getFirstLetterCapitalized } from '../../utils/helpers';
import { auth } from '../../utils/firebase';

const Progress = () => {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const resetProgress = (name: string) => {
    const updatedProgress = store.user?.progress.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          used: [],
          totalGuesses: 0,
          correctGuesses: 0,
        };
      }
      return item;
    });
    const _user = { ...store.user, progress: updatedProgress };
    store.updateUser(_user);
  };
  const updateUser = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/${store.user?._id}`, {
        method: 'PUT',
        body: JSON.stringify(store?.user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await auth.currentUser?.getIdToken(true)),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!store.user) window.location.href = '/';
  }, [store]);
  useEffect(() => {
    updateUser();
  }, [store.user?.progress]);
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
          <Box marginY={2} display={'flex'} justifyContent={'space-between'}>
            <Typography variant="h6" key={p.name}>
              {getFirstLetterCapitalized(p.name)}:{' '}
              <strong>{p.correctGuesses}</strong> /{' '}
              <strong>{p.totalGuesses}</strong>
            </Typography>
            <Button variant="contained" onClick={() => resetProgress(p.name)}>
              Reset
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Progress;
