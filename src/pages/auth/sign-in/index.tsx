import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useGermanStore from '../../../store';
import { ToastContainer, toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');
    if (email !== '' && password !== '') {
      try {
        setIsLoading(true);
        const firebaseLogin = signInWithEmailAndPassword(auth, email, password);
        const user = (await firebaseLogin).user;
        const { accessToken } = user;
        const token = await auth.currentUser?.getIdToken(true);

        if (accessToken) {
          try {
            const res = await fetch(`${apiUrl}/auth/signin`, {
              headers: { Authorization: 'Bearer ' + token },
            });
            const response = await res.json();
            token && store.login(response.data, token);
            window.location.href = '/#/progress';
          } catch (err) {
            console.log(err);
            toast.error('Error occurred: ' + err.message);
          }
        }
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          toast.error('Wrong password');
        }
        if (err.code === 'auth/user-not-found') {
          toast.error('User not found');
        }
      } finally {
        setIsLoading(false);
      }
    } else toast.error('Please enter email and password');
  };

  React.useEffect(() => {
    if (store.user) window.location.href = '/#/progress';
    const pingAPI = async () => {
      await fetch(`${apiUrl}/ping`);
    };
    pingAPI();
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '73dvh' }}>
      <CssBaseline />
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/#/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="light"
          />
        </Box>
      </Box>
    </Container>
  );
}
