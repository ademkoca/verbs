import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import useGermanStore from '../../store';
import { User } from '../../store/slices/auth';
import { apiFetch } from '../../api/client';
import { ProgressName } from '../../types/interfaces';
import BasicTable from '../../components/table';

const Progress = () => {
  const user = useGermanStore((s) => s.user);
  const updateUser = useGermanStore((s) => s.updateUser);

  // show the cached progress right away and refresh it from the server
  const { isLoading, isError } = useQuery({
    queryKey: ['user', user?._id],
    queryFn: async () => {
      const fresh = await apiFetch<User>(`/users/${user?._id}`);
      updateUser(fresh);
      return fresh;
    },
    enabled: !!user,
  });

  const resetProgress = async (name: ProgressName) => {
    if (!user) return;
    try {
      const res = await apiFetch<{ data: User }>(`/users/${user._id}/progress/${name}`, {
        method: 'DELETE',
      });
      updateUser(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not reset your progress. Please try again');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
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
          component="h1"
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, letterSpacing: '.3rem' }}
        >
          MY PROGRESS
        </Typography>
      </Box>

      <Box sx={{ minHeight: '80vh' }}>
        {user?.progress?.length ? (
          <BasicTable progress={user.progress} onReset={resetProgress} />
        ) : isLoading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : null}
        {isError && (
          <Typography color="error" textAlign="center" mt={3}>
            Could not load your latest progress. Showing the last saved copy.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Progress;
