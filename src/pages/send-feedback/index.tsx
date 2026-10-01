import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import useGermanStore from '../../store';
import { ApiError, apiFetch } from '../../api/client';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SendFeedback() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const store = useGermanStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fullName, setFullName] = useState(
    store.user ? store.user?.firstName + ' ' + store.user?.lastName : ''
  );
  const [email, setEmail] = useState(store.user?.email ?? '');
  const [feedback, setFeedback] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    if (!EMAIL_REGEX.test(email.trim()) || feedback.trim() === '') {
      toast.error('Please enter a valid email and your feedback');
      return;
    }
    setIsLoading(true);
    try {
      // signed-in users send their token; the API then uses the account's email
      const msg = await apiFetch<string>(
        '/feedback',
        {
          method: 'POST',
          body: JSON.stringify({
            senderEmail: email.trim(),
            message: feedback,
            senderName: fullName.trim() || undefined,
          }),
        },
        { auth: 'optional' }
      );
      toast.success(msg);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : 'Could not send your feedback'
      );
      setIsLoading(false);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!store.user}
            helperText={store.user ? 'Sent from your account email' : undefined}
          />
          <TextField
            margin="normal"
            fullWidth
            name="full-name"
            label="Full name (optional)"
            type="text"
            id="full-name"
            autoComplete="full-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
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
