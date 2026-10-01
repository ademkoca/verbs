import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiError, apiFetch } from '../../api/client';

type Status = 'loading' | 'done' | 'expired' | 'error';

const Unsubscribe = () => {
  const { id: token } = useParams();
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('expired');
      return;
    }
    apiFetch(`/email/unsubscribe/${token}`, { method: 'POST' }, { auth: 'none' })
      .then(() => setStatus('done'))
      .catch((err) =>
        setStatus(err instanceof ApiError && err.status === 410 ? 'expired' : 'error')
      );
  }, [token]);

  const profileLink = (
    <Button variant="text" href="/#/profile" size="small">
      Profile settings
    </Button>
  );

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: '80dvh' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {status === 'loading' && <CircularProgress sx={{ alignSelf: 'center' }} />}
        {status === 'done' && (
          <>
            <Typography variant="body1" mb={2}>
              You have successfully unsubscribed from receiving emails from Glasklar.
            </Typography>
            <Alert severity="info" sx={{ mt: { xs: 0, md: 3 } }}>
              <Typography>
                In case you changed your mind, you can always turn email
                notifications back on in your {profileLink}
              </Typography>
            </Alert>
          </>
        )}
        {status === 'expired' && (
          <Alert severity="warning">
            <Typography>
              This unsubscribe link is no longer valid. You can turn off emails
              in your {profileLink}
            </Typography>
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error">
            <Typography>
              Something went wrong. Please try again later, or turn off emails in
              your {profileLink}
            </Typography>
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Unsubscribe;
