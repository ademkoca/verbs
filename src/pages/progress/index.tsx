import { Box, Container, CssBaseline, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useGermanStore from '../../store';
import { getFirstLetterCapitalized } from '../../utils/helpers';
import { auth } from '../../utils/firebase';
import { useQuery } from 'react-query';
import { Progress as ProgressType } from '../../types/interfaces';
import { IUser } from '../../store/slices/auth';
import BasicTable from '../../components/table';

const Progress = () => {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState<IUser>(null);
  const getUser = async () => {
    const token = await auth.currentUser?.getIdToken(true);
    const jwt = token ? token : store.token;
    try {
      const response = await fetch(`${apiUrl}/users/${store.user?._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setUser(res);
        token && store.updateToken(token);
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const resetProgress = (name: string) => {
    const updatedProgress = user?.progress.map((item) => {
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
    setUser(_user);
    // store.updateUser(_user);
  };
  const updateUser = async () => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const res = await fetch(`${apiUrl}/users/${store.user?._id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token ?? store.token,
        },
      });
      if (res.ok) {
        const _user = await res.json();

        store.updateUser(_user.data);
        token && store.updateToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!store.token,
  });

  useEffect(() => {
    if (!store.user) window.location.href = '/#/sign-in';
  }, [store]);
  useEffect(() => {
    updateUser();
  }, [user?.progress]);

  if (!data)
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
            minHeight: '80vh',
          }}
        >
          No data.
        </Box>
      </Container>
    );
  if (isLoading)
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
            minHeight: '80vh',
          }}
        >
          Loading ...
        </Box>
      </Container>
    );
  if (error)
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
          An error occurred.
        </Box>
      </Container>
    );
  if (data)
    return (
      <Container component="main" maxWidth="sm">
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
          {user?.progress && (
            <BasicTable progress={user?.progress} onReset={resetProgress} />
          )}
        </Box>
      </Container>
    );
};

export default Progress;
