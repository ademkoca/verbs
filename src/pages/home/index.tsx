import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { ToastContainer, toast } from 'react-toastify';
import useGermanStore from '../../store';
import { Alert, CircularProgress } from '@mui/material';
import { getFirstLetterCapitalized } from '../../utils/helpers';
import verbsWithTranslation from '../../../verbsWithTranslation';
import nouns from '../../../../nouns';
import { sentencesWithoutParts } from '../../../sentences';
import nounsWithMultipleTranslations from '../../../dictionary';
import { accentColors } from '../../utils/helpers';

export default function Home() {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = React.useState(false);
  const [greeting, setGreeting] = React.useState('Hello');
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
    const pingAPI = async () => {
      await fetch(`${apiUrl}/ping`);
    };
    pingAPI();
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setGreeting('Good morning');
    } else if (currentTime >= 12 && currentTime < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);
  const totalLength = {
    verbs: verbsWithTranslation.length,
    // verbs: 2.5,
    articles: nounsWithMultipleTranslations.length,
    // articles: 4,
    sentences: sentencesWithoutParts.length,
    // sentences: 3,
    dictionary: verbsWithTranslation.length,
    // dictionary: 3,
  };
  const pages = [
    {
      name: 'Verbs',
      url: '/verbs',
      description:
        'Guess the correct preterite and participle for the given verb',
    },
    {
      name: 'Articles',
      url: '/articles',
      description: 'Select the appropriate article for the given word',
    },
    {
      name: 'Sentences',
      url: '/sentences',
      description: 'Put the words in the correct order to form a sentence',
    },
    {
      name: 'Dictionary',
      url: '/dictionary',
      description: 'Guess the correct translation of the given word',
    },
  ];
  if (!store.user)
    return (
      <Container component="main" maxWidth="lg" sx={{ minHeight: '73dvh' }}>
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
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {greeting}
          </Typography>
          <Typography component="h2" variant="h6" mt={2}>
            Let's start learning German.
          </Typography>
          <Typography component="h2" variant="body1" mt={2}>
            Please choose one of the following modules:
          </Typography>
          <Box
            mt={4}
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={{ sm: 5, md: 0 }}
            width={'100%'}
          >
            {pages.map((page) => (
              <Card
                variant="elevation"
                sx={{
                  width: { xs: '100%', sm: '45%', md: '23%' },
                  height: { md: '17rem', lg: '15rem' },
                  marginBottom: { xs: 5, sm: 0 },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {getFirstLetterCapitalized(page.name)}
                  </Typography>
                  <Typography variant="body1">{page.description}</Typography>
                  <Button
                    color={page.name.toLowerCase()}
                    variant="contained"
                    href={`/#${page.url}`}
                    sx={{ color: 'white', marginTop: 4 }}
                  >
                    Start practicing
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Alert severity="error" sx={{ mt: { xs: 0, md: 3 } }}>
              <Typography lineHeight={'-5'}>
                Please note that your progress will not be saved unless you{' '}
                <Button variant="text" href="/#/sign-up" size="small">
                  Sign up
                </Button>
                or
                <Button variant="text" href="/#/sign-in" size="small">
                  Sign in
                </Button>
              </Typography>
            </Alert>
          </Box>
        </Box>
      </Container>
    );
  return (
    <Container component="main" maxWidth="lg" sx={{ minHeight: '73dvh' }}>
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
          <HomeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {greeting}, {store.user?.firstName}
        </Typography>
        <Typography component="h2" variant="h6">
          Here is your current progress:
        </Typography>
        <Box
          mt={4}
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={{ sm: 5, md: 0 }}
          width={'100%'}
        >
          {store.user?.progress.map((p) => {
            const solvedPercentage =
              (p.used.length / totalLength[p.name]) * 100;
            return (
              <Card
                variant="elevation"
                sx={{
                  width: { xs: '100%', sm: '45%', md: '23%' },
                  marginBottom: { xs: 5, sm: 0 },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {getFirstLetterCapitalized(p.name)}
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    value={solvedPercentage}
                    size={150}
                    thickness={7}
                    sx={{ color: accentColors[p.name] }}
                  />
                  <Typography variant="h6">{`${solvedPercentage.toFixed(
                    0
                  )}%`}</Typography>
                  <Button
                    color={p.name}
                    variant="contained"
                    href={`/#/${p.name}`}
                    sx={{ color: 'white', marginTop: 2 }}
                  >
                    Continue practicing
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
