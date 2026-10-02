import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import useGermanStore from '../../store';
import { User } from '../../store/slices/auth';
import { storage } from '../../utils/firebase';
import { apiFetch } from '../../api/client';
import { getInitials } from '../../utils/helpers';
import CustomSwitch from '../../components/switch';

// Only these fields are sent; progress is saved separately, one guess at a time
type ProfileForm = Pick<
  User,
  'username' | 'firstName' | 'lastName' | 'address' | 'country' | 'zip' | 'profilePicture' | 'subscribed'
>;

const toForm = (user: User): ProfileForm => ({
  username: user.username ?? '',
  firstName: user.firstName ?? '',
  lastName: user.lastName ?? '',
  address: user.address ?? '',
  country: user.country ?? '',
  zip: user.zip ?? '',
  profilePicture: user.profilePicture ?? '',
  subscribed: {
    weeklyNewsletter: !!user.subscribed?.weeklyNewsletter,
    productUpdates: !!user.subscribed?.productUpdates,
  },
});

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const Profile = () => {
  const storedUser = useGermanStore((s) => s.user);
  const updateUser = useGermanStore((s) => s.updateUser);
  const [form, setForm] = useState<ProfileForm | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const { isError } = useQuery({
    queryKey: ['user', storedUser?._id],
    queryFn: () => apiFetch<User>(`/users/${storedUser?._id}`),
    enabled: !!storedUser,
    onSuccess: (fresh) => {
      updateUser(fresh);
      setForm((prev) => prev ?? toForm(fresh));
    },
  });

  // fall back to the cached user if the server can't be reached
  useEffect(() => {
    if (isError && storedUser) setForm((prev) => prev ?? toForm(storedUser));
  }, [isError, storedUser]);

  const preview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const setField = (field: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => (prev ? { ...prev, [field]: e.target.value } : prev));

  const toggleSubscription = (key: keyof ProfileForm['subscribed']) =>
    setForm((prev) =>
      prev ? { ...prev, subscribed: { ...prev.subscribed, [key]: !prev.subscribed[key] } } : prev
    );

  const save = async (values: ProfileForm) => {
    if (!storedUser) return;
    if (!values.username.trim() || !values.firstName.trim() || !values.lastName.trim()) {
      toast.error('Username, first name and last name are required');
      return;
    }
    setIsSaving(true);
    try {
      const res = await apiFetch<{ data: User }>(`/users/${storedUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
      });
      updateUser(res.data);
      setForm(toForm(res.data));
      toast.success('User successfully updated');
    } catch (err) {
      console.error(err);
      toast.error('Error updating user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChooseImage = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Please choose an image smaller than 5 MB');
      return;
    }
    setImage(file);
  };

  const handleUploadImage = async () => {
    if (!image || !form || !storedUser) return;
    setIsSaving(true);
    try {
      const imageRef = ref(storage, `${storedUser._id}-${Date.now()}`);
      const uploaded = await uploadBytes(imageRef, image, { contentType: image.type });
      const profilePicture = await getDownloadURL(uploaded.ref);
      setImage(null);
      await save({ ...form, profilePicture });
    } catch (err) {
      console.error(err);
      toast.error('Could not upload the image');
      setIsSaving(false);
    }
  };

  const handleRemoveImage = () => {
    if (form) save({ ...form, profilePicture: '' });
  };

  if (!form) {
    return (
      <Box display="flex" justifyContent="center" mt={10} minHeight="73dvh">
        <CircularProgress />
      </Box>
    );
  }

  const fullName = `${form.firstName} ${form.lastName}`;
  const textFields: {
    field: keyof ProfileForm;
    label: string;
    autoComplete: string;
    required?: boolean;
  }[] = [
    { field: 'username', label: 'Username', autoComplete: 'username', required: true },
    { field: 'firstName', label: 'First Name', autoComplete: 'given-name', required: true },
    { field: 'lastName', label: 'Last Name', autoComplete: 'family-name', required: true },
    { field: 'address', label: 'Address', autoComplete: 'street-address' },
    { field: 'country', label: 'Country', autoComplete: 'country-name' },
    { field: 'zip', label: 'ZIP', autoComplete: 'postal-code' },
  ];

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '73dvh' }}>
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
          justifyContent={'space-between'}
          my={3}
        >
          <Grid item xs={12} display={'flex'} flex={2} justifyContent={'center'} alignItems={'center'}>
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt={fullName}
              src={preview ?? (form.profilePicture || undefined)}
            >
              <Typography variant="h3">{getInitials(form.firstName, form.lastName)}</Typography>
            </Avatar>
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
                onClick={() => uploadButtonRef.current?.click()}
                disabled={isSaving}
              >
                CHOOSE IMAGE
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                startIcon={<CloudUploadIcon />}
                onClick={handleUploadImage}
                disabled={isSaving}
              >
                Click to upload
              </Button>
            )}
            {!image && form.profilePicture !== '' && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemoveImage}
                disabled={isSaving}
              >
                Remove
              </Button>
            )}
            <input
              accept="image/png, image/gif, image/jpeg"
              ref={uploadButtonRef}
              style={{ display: 'none' }}
              type="file"
              onChange={(e) => handleChooseImage(e.target.files?.[0])}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="profile-email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={storedUser?.email ?? ''}
            disabled
          />
        </Grid>
        {textFields.map(({ field, label, autoComplete, required }) => (
          <Grid item xs={12} md={6} key={field}>
            <TextField
              id={`profile-${field}`}
              label={label}
              required={required}
              fullWidth
              autoComplete={autoComplete}
              variant="standard"
              value={form[field] as string}
              onChange={setField(field)}
            />
          </Grid>
        ))}
        <Grid item xs={12} display={'flex'} flexDirection={'column'} mt={2}>
          <Typography variant="body2" mb={1}>
            Email Subscription:
          </Typography>
          <Grid
            item
            xs={12}
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={{ xs: 'center', md: 'space-between' }}
            alignItems={{ xs: 'space-between', md: 'center' }}
          >
            <CustomSwitch
              justify="space-between"
              value={form.subscribed.weeklyNewsletter}
              left="Weekly newsletter"
              onChange={() => toggleSubscription('weeklyNewsletter')}
            />
            <CustomSwitch
              justify="space-between"
              value={form.subscribed.productUpdates}
              left="Product updates"
              onChange={() => toggleSubscription('productUpdates')}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={() => save(form)}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Update'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Profile;
