import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import useGermanStore from '../../store';
import { Alert, CircularProgress } from '@mui/material';
import { getFirstLetterCapitalized } from '../../utils/helpers';
import verbsWithTranslation from '../../../verbsWithTranslation';

import { sentencesWithoutParts } from '../../../sentences';
import nounsWithMultipleTranslations from '../../../dictionary';
import nounsWithTranslation from '../../../nouns';
import { ButtonColors } from '../../types/interfaces';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const store = useGermanStore();
  const { t } = useTranslation();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [greeting, setGreeting] = React.useState('Hello');

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
  type Lengths = {
    [key: string]: number;
  };
  const totalLength: Lengths = {
    verbs: verbsWithTranslation.length,
    // verbs: 2.5,
    articles: nounsWithTranslation.length,
    // articles: 4,
    sentences: sentencesWithoutParts.length,
    // sentences: 3,
    dictionary: nounsWithMultipleTranslations.length,
    // dictionary: 3,
  };
  const pages = [
    {
      name: 'verbs',
      url: '/verbs',
      description:
        'Guess the correct preterite and participle for the given verb',
    },
    {
      name: 'articles',
      url: '/articles',
      description: 'Select the appropriate article for the given word',
    },
    {
      name: 'sentences',
      url: '/sentences',
      description: 'Put the words in the correct order to form a sentence',
    },
    {
      name: 'dictionary',
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
            {t(greeting)}
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
                    {getFirstLetterCapitalized(t(page.name))}
                    {/* {getFirstLetterCapitalized(page.name)} */}
                  </Typography>
                  <Typography variant="body1">{page.description}</Typography>
                  <Button
                    color={page.name.toLowerCase() as ButtonColors}
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
          {t(greeting)}, {store.user?.firstName}
        </Typography>
        <Typography component="h2" variant="h6">
          {t('here_current_progress')}:
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
                key={p.name}
                variant="elevation"
                sx={{
                  width: { xs: '100%', sm: '45%', md: '23%' },
                  marginBottom: { xs: 5, sm: 0 },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {getFirstLetterCapitalized(t(p.name))}
                  </Typography>
                  <Box position={'relative'}>
                    {/* Filled portion */}
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={150}
                      thickness={7}
                      // color="grey"
                      style={{
                        color: store.darkMode ? 'grey' : 'lightgrey',
                        position: 'absolute',
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={solvedPercentage}
                      size={150}
                      thickness={7}
                      sx={{ color: p.name as ButtonColors, zIndex: 100 }}
                    />
                  </Box>
                  <Typography variant="h6">{`${solvedPercentage.toFixed(
                    0
                  )}%`}</Typography>
                  <Button
                    color={p.name as ButtonColors}
                    variant="contained"
                    href={`/#/${
                      solvedPercentage === 100 ? 'progress' : p.name
                    }`}
                    sx={{ color: 'white', marginTop: 2 }}
                  >
                    {solvedPercentage === 100
                      ? 'Reset progress'
                      : solvedPercentage === 0
                      ? t('start_practicing')
                      : t('continue_practicing')}
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
