import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useGermanStore from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import Textarea from '@mui/joy/Textarea';

export default function SendFeedback() {
  console.log(Textarea);
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const fullName = data.get('full-name');
    const feedback = data.get('feedback');

    if (email !== '' && feedback !== '') {
      try {
        setIsLoading(true);

        try {
          const res = await fetch(`${apiUrl}/feedback`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
              senderEmail: email,
              message: feedback,
              senderName: fullName ?? null,
            }),
          });
          if (res.ok) {
            const msg = await res.text();
            toast.success(msg);
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          }
        } catch (err) {
          console.log(err);
          toast.error('Error occurred: ' + err.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else toast.error('Please enter email and feedback text');
  };

  React.useEffect(() => {
    const pingAPI = async () => {
      await fetch(`${apiUrl}/ping`);
    };
    pingAPI();
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: '73dvh' }}>
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
          Send feedback
        </Typography>
        <Typography component="h1" variant="body1" mt={2}>
          We value your input! Your feedback is crucial in helping us enhance
          your experience with our app. Whether you've encountered a bug, have a
          suggestion for improvement, or want to share your positive experience,
          we're happy to hear from you!
        </Typography>

        <Box
          component="form"
          maxWidth="sm"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your email"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <TextField
            margin="normal"
            fullWidth
            name="full-name"
            label="Full name (optional)"
            type="text"
            id="full-name"
            autoComplete="full-name"
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={4}
            required
            name="feedback"
            label="Your feedback"
            type="text"
            id="feedback"
            autoComplete="feedback"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Send'}
          </Button>

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
