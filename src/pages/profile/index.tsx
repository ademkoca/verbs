import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Button,
} from '@mui/material';
import useGermanStore from '../../store';
import { Grid } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { IUser } from '../../store/slices/auth';
import { auth } from '../../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState<IUser>(store.user);
  const notify = (message: string) => toast(message);
  const handleUpdateProfile = async () => {
    if (user)
      try {
        const response = await fetch(`${apiUrl}/users/${user._id}`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + (await auth.currentUser?.getIdToken()),
          },
        });
        if (response.status === 200) {
          const res = await response.json();
          notify('User successfully updated');
          store.updateUser(res.data);
        } else notify('Error updating user');
      } catch (error) {
        notify('Error updating user');
      }
  };
  if (!user) return null;
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
          MY PROFILE
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <Avatar alt={user?.firstName} src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label={'Email Address'}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={user?.email}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Username"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="First Name"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={user?.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Last Name"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={user?.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="Address"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={user?.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="Country"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={user?.country}
            onChange={(e) => setUser({ ...user, country: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="ZIP"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={user?.zip}
            onChange={(e) => setUser({ ...user, zip: e.target.value })}
          />
        </Grid>

        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveCard"
                value="yes"
                checked={user?.isAdmin}
              />
            }
            label="Remember credit card details for next time"
          />
        </Grid> */}
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={handleUpdateProfile}
          >
            Update
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
