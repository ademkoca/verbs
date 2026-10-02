import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../../utils/firebase';
import useGermanStore from '../../../store';
import { User } from '../../../store/slices/auth';
import { ApiError, apiFetch } from '../../../api/client';

const signInErrorMessage = (err: unknown): string => {
  if (err instanceof ApiError && err.status === 404) {
    return 'No Glasklar account exists for this email';
  }
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Wrong email or password';
      case 'auth/invalid-email':
        return 'Please enter a valid email';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
    }
  }
  return 'Could not sign in. Please try again';
};

export default function SignIn() {
  const isSignedIn = useGermanStore((s) => !!s.user);
  const login = useGermanStore((s) => s.login);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const response = await apiFetch<{ data: User }>('/auth/signin');
      login(response.data);
      navigate('/');
    } catch (err) {
      // don't keep a Firebase session without a usable account
      if (auth.currentUser) await signOut(auth).catch(() => {});
      toast.error(signInErrorMessage(err));
      setIsLoading(false);
    }
  };

  if (isSignedIn) return <Navigate to="/progress" replace />;

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '73dvh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
