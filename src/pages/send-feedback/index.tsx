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
import { useTranslation } from 'react-i18next';

export default function SendFeedback() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const store = useGermanStore();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fullName, setFullName] = useState(
    store.user ? store.user?.firstName + ' ' + store.user?.lastName : ''
  );
  const [email, setEmail] = useState(store.user?.email);
  const [feedback, setFeedback] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    // const email = data.get('email');
    // const fullName = data.get('full-name');
    // const feedback = data.get('feedback');

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
            toast.success(t(msg));
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
    } else toast.error(t('please_enter_email_and_feedback'));
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
          {t('send_feedback')}
        </Typography>
        <Typography component="h1" variant="body1" mt={2}>
          {t('feedback_text')}
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
            label={t('your_email')}
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="full-name"
            label={t('full_name_optional')}
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
            label={t('your_feedback')}
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
            {isLoading ? `${t('please_wait')}...` : t('send')}
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
