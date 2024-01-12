import { useEffect, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import nouns from '../../../nouns';
import CustomSwitch from '../../components/switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { auth } from '../../utils/firebase';
import useGermanStore from '../../store';

export default function Articles() {
  const store = useGermanStore();
  const textRef = useRef();
  interface Noun {
    article: string;
    original: string;
    translation?: string;
  }
  const articlesProgress = store.user?.progress?.find(
    (p) => p.name === 'articles'
  );
  const apiUrl = import.meta.env.VITE_API_URL;
  //   const data = verbs;
  const removeItemsInSecondArray = (arr1: Noun[], arr2: string[]) => {
    if (arr2?.length > 0) {
      // Use filter to create a new array with items from arr1 that are not in arr2
      const result = arr1.filter((item) => arr2.indexOf(item.original) === -1);
      return result;
    } else return arr1;
  };
  const data = articlesProgress
    ? removeItemsInSecondArray(nouns, articlesProgress?.used)
    : nouns;
  const totalNouns = data.length;
  const [activeNoun, setActiveNoun] = useState<Noun>({
    article: 'der',
    original: '',
    translation: '',
  });
  // const [userInput, setUserInput] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState('success');
  const [usedItems] = useState<string[]>([]);
  // const [isHard, setIsHard] = useState<boolean>(false);
  const [includeTranslation, setIncludeTranslation] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setUserInput(newValue);
  };

  useEffect(() => {
    if (userInput) {
      setIsLoading(true);
      //if correct guess
      if (activeNoun?.article.toLowerCase() === userInput?.toLowerCase()) {
        setMessageClass('success');
        setCorrectGuesses((prev: number) => prev + 1);
        setSuccessMsg(`${userInput} ${activeNoun?.original} is correct`);
        // setUserInput(null);
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //if incorrect guess
      else {
        setMessageClass('error');
        setSuccessMsg(`${userInput} ${activeNoun?.original} is incorrect`);
        // setUserInput(null);
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //anyway
      setTotalGuesses((prev: number) => prev + 1);
      if (store.user) {
        // const progress = store.user?.progress?.find(
        //   (p: Progress) => p.name === 'verbs'
        // );
        updateProgress(
          'articles',
          activeNoun?.original,
          activeNoun?.article.toLowerCase() === userInput?.toLowerCase()
        );
      }
    }
  }, [userInput]);
  const updateProgress = (name: string, guess: string, correct: boolean) => {
    const updatedProgress = store.user?.progress.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          used: [...item.used, guess],
          totalGuesses: item.totalGuesses + 1,
          correctGuesses: correct
            ? item.correctGuesses + 1
            : item.correctGuesses,
        };
      }
      return item;
    });
    const _user = { ...store.user, progress: updatedProgress };
    store.updateUser(_user);
  };
  const updateUser = async () => {
    const token = await auth.currentUser?.getIdToken(true);
    const jwt = token ? token : store.token;
    try {
      const res = await fetch(`${apiUrl}/users/${store.user?._id}`, {
        method: 'PUT',
        body: JSON.stringify(store?.user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateNewArticle();
  }, []);
  useEffect(() => {
    if (store.user) updateUser();
  }, [articlesProgress?.used.length]);
  const generateNewArticle = () => {
    const random = Math.floor(Math.random() * totalNouns);
    if (!usedItems.includes(data[random].original)) {
      setActiveNoun(data[random]);
      usedItems.push(data[random].original);
    } else generateNewArticle();
  };

  const resetInputs = () => {
    setSuccessMsg(null);
    generateNewArticle();
    setMessageClass('success');
    setUserInput(null);
    textRef?.current?.focus();
    setIsLoading(false);
  };

  const handleToggleIncludeTranslation = () => {
    setIncludeTranslation((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '73dvh' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          ARTICLES
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <MarkChatReadOutlinedIcon />
        </Avatar>
        <Box my={2}>
          <Typography>
            {articlesProgress?.correctGuesses ?? correctGuesses}/
            {articlesProgress?.totalGuesses ?? totalGuesses} correct
          </Typography>
        </Box>
        <Typography component="h5" variant="h5">
          {activeNoun?.original}{' '}
          {includeTranslation && `(${activeNoun?.translation})`}
        </Typography>
        {successMsg && (
          <Typography
            component="h6"
            variant="h6"
            color={messageClass === 'success' ? 'green' : 'red'}
          >
            {successMsg}
          </Typography>
        )}
        {messageClass !== 'success' && (
          <Typography color="green">
            correct: {activeNoun?.article + ' ' + activeNoun?.original}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          // onSubmit={checkUserInput}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <CustomSwitch
                value={includeTranslation}
                onChange={handleToggleIncludeTranslation}
                left={'Translation'}
              />
            </Grid>

            <Grid item xs={12}>
              <ToggleButtonGroup
                color="primary"
                value={userInput}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                fullWidth
                sx={{ mb: 3 }}
              >
                <ToggleButton disabled={isLoading} value="der">
                  der
                </ToggleButton>
                <ToggleButton disabled={isLoading} value="die">
                  die
                </ToggleButton>
                <ToggleButton disabled={isLoading} value="das">
                  das
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Check
          </Button> */}
          <Button
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mt: 0, mb: 2 }}
            onClick={resetInputs}
            disabled={isLoading}
          >
            Skip
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
