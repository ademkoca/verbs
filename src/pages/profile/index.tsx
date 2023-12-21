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
import TextField from '@mui/material/TextField';
import { useState, useRef, useEffect } from 'react';
import { IUser } from '../../store/slices/auth';
import { auth, storage } from '../../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes } from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState<IUser>(null);
  const [image, setImage] = useState(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const uploadButtonRef = useRef();
  const notify = (message: string) => toast(message);
  const getUser = async () => {
    const response = await fetch(`${apiUrl}/users/${store.user?._id}`, {
      headers: {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    setUser(res);
  };
  const handleUploadImage = async () => {
    if (!image) return;
    const imageRef = ref(storage, image.name + new Date().getTime());
    const res = await uploadBytes(imageRef, image);

    if (res.metadata.name && user) {
      setUser({
        ...user,
        profilePicture:
          'https://firebasestorage.googleapis.com/v0/b/consistency-12769.appspot.com/o/' +
          res.metadata.name +
          '?alt=media',
      });
      setImageUploaded(true);
    }
  };
  const handleRemoveImage = () => {
    if (user) {
      setUser({
        ...user,
        profilePicture: '',
      });
      setImageUploaded(true);
    }
  };
  const handleUpdateProfile = async () => {
    if (user) {
      try {
        const response = await fetch(`${apiUrl}/users/${user._id}`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + (await auth.currentUser?.getIdToken(true)),
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
    }
  };
  // const { data, isLoading, error } = useQuery('user', getUser);
  useEffect(() => {
    imageUploaded && handleUpdateProfile();
    setImageUploaded(false);
    setImage(null);
  }, [imageUploaded]);
  const getToken = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => setJwt(token));
      }
    });
  };
  useEffect(() => {
    getToken();
    if (jwt) getUser();
  }, [jwt]);

  // useEffect(() => {
  //   if (!user) window.location.href = '/sign-in';
  // }, [user]);

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
        <Grid
          item
          xs={12}
          gap={{ xs: 2, md: 0 }}
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'space-between', md: 'space-between' }}
          justifyContent={{ xs: 'space-between', md: 'space-between' }}
          my={3}
        >
          <Grid
            item
            xs={12}
            display={'flex'}
            flex={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt={user?.firstName}
              src={image ? URL.createObjectURL(image) : user?.profilePicture}
            />
          </Grid>
          <Grid
            flex={1}
            gap={{ xs: 2, md: 0 }}
            item
            xs={12}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-around'}
          >
            {!image ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                onClick={() => uploadButtonRef?.current?.click()}
              >
                CHOOSE IMAGE
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                startIcon={<CloudUploadIcon />}
                onClick={handleUploadImage}
              >
                Click to upload
              </Button>
            )}
            {!image && user?.profilePicture !== '' && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemoveImage}
              >
                Remove
              </Button>
            )}
            <input
              accept="image/png, image/gif, image/jpeg"
              ref={uploadButtonRef}
              style={{ display: 'none' }}
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {/* <button type="button" onClick={handleUpload}>
              Upload
            </button> */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label={'Email Address'}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={user?.email || ''}
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
            value={user?.username || ''}
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
            value={user?.firstName || ''}
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
            value={user?.lastName || ''}
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
            value={user?.address || ''}
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
            value={user?.country || ''}
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
            value={user?.zip || ''}
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
