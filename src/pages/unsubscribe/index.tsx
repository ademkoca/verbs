import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Unsubscribe = () => {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    const unsubscribeHandler = async (id: string) => {
      const res = await fetch(`${apiUrl}/email/unsubscribe/${id}`, {
        method: 'POST',
        headers: {},
      });
      if (res.status === 200) {
        const response = await res.text();
        setEmail(response);
      }
    };
    id && unsubscribeHandler(id);
  }, [id]);
  if (!email) return null;
  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: '80dvh' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,

          display: 'flex',
          flexDirection: 'column',
          //   alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1" mb={2}>
          You have successfully unsubscribed{' '}
          <span style={{ fontWeight: 700 }}>{email}</span> from receiving emails
          from Glasklar.{' '}
        </Typography>

        <Alert severity="info" sx={{ mt: { xs: 0, md: 3 } }}>
          <Typography>
            In case you changed your mind, you can always turn email
            notifications back on in your{' '}
            <Button variant="text" href="/#/profile" size="small">
              Profile settings
            </Button>
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
};

export default Unsubscribe;
