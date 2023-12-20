import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { sentencesWithoutParts } from '../../../sentences';
import RefreshIcon from '@mui/icons-material/Refresh';
import useGermanStore from '../../store';
import { auth } from '../../utils/firebase';

export default function Sentences() {
  const store = useGermanStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  interface Sentence {
    original: string;
    translation?: string;
  }
  //   const data = verbs;
  const sentencesProgress = store.user?.progress?.find(
    (p) => p.name === 'sentences'
  );
  const removeItemsInSecondArray = (arr1: Sentence[], arr2: string[]) => {
    if (arr2?.length > 0) {
      // Use filter to create a new array with items from arr1 that are not in arr2
      const result = arr1.filter((item) => arr2.indexOf(item.original) === -1);
      return result;
    } else return arr1;
  };
  const data = sentencesProgress
    ? removeItemsInSecondArray(sentencesWithoutParts, sentencesProgress?.used)
    : sentencesWithoutParts;
  const totalSentences = data.length;
  console.log(totalSentences);
  const [activeSentence, setActiveSentence] = useState<Sentence>({
    original: '',
    translation: '',
  });
  const [activeSentenceCopy, setActiveSentenceCopy] =
    useState<Sentence>(activeSentence);
  // const [userInput, setUserInput] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState('success');
  const [usedItems] = useState<string[]>([]);
  // const [isHard, setIsHard] = useState<boolean>(false);
  const [includeTranslation, setIncludeTranslation] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string[] | null>(null);
  const [shuffled, setShuffled] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);

  const checkUserInput = () => {
    if (shuffled?.length === 0) {
      if (userInput?.join(' ') === activeSentence.original) {
        setMessageClass('success');
        setCorrectGuesses((prev: number) => prev + 1);
        setSuccessMsg(`Correct! ${activeSentence.original}`);
        setUserInput(null);
        setTimeout(() => {
          resetInputs();
        }, 3000);
      } else {
        setMessageClass('error');
        setSuccessMsg(`${userInput?.join(' ')} is incorrect`);
        // setUserInput(null);
        setIsWrongAnswer(true);

        // setTimeout(() => {
        //   resetInputs();
        // }, 3000);
      }
      //anyway
      setTotalGuesses((prev: number) => prev + 1);
      //if user is logged in
      if (store.user) {
        // const progress = store.user?.progress?.find(
        //   (p: Progress) => p.name === 'verbs'
        // );
        updateProgress(
          'sentences',
          activeSentence?.original,
          userInput?.join(' ') === activeSentence.original
        );
      }
    }
  };
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
    try {
      const res = await fetch(`${apiUrl}/users/${store.user?._id}`, {
        method: 'PUT',
        body: JSON.stringify(store?.user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await auth.currentUser?.getIdToken(true)),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const proceed = () => {
    setIsWrongAnswer(false);
    resetInputs();
  };

  useEffect(() => {
    generateNewArticle();
  }, []);
  const generateNewArticle = () => {
    const random = Math.floor(Math.random() * totalSentences);
    if (!usedItems.includes(data[random].original)) {
      setActiveSentence(data[random]);
      setActiveSentenceCopy(data[random]);
      setShuffled(shuffleArray(data[random].original.split(' ')));

      usedItems.push(data[random].original);
    } else generateNewArticle();
  };

  useEffect(() => {
    if (store.user) updateUser();
  }, [sentencesProgress?.used.length]);

  const resetInputs = () => {
    setSuccessMsg(null);
    generateNewArticle();
    setMessageClass('success');
    setUserInput(null);
    // textRef?.current?.focus();
    setIsLoading(false);
  };

  const reset = (): void => {
    setActiveSentenceCopy(activeSentence);
    setShuffled(shuffleArray(activeSentenceCopy.original.split(' ')));
    setUserInput([]);
  };

  const shuffleArray = (arr: string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleUserInputClick = (i: string) => {
    const _userInput = userInput ? [...userInput] : [];
    setUserInput(_userInput.filter((u) => u !== i));
    const _shuffled = shuffled ? [...shuffled] : [];
    _shuffled.push(i);
    setShuffled(_shuffled);
  };
  const handleActiveSentenceClick = (e: string) => {
    // e.preventDefault();
    if (shuffled?.length > 0) {
      const _userInput = userInput ? [...userInput] : [];
      _userInput.push(e);
      setUserInput(_userInput);
      const _shuffled = shuffled ? [...shuffled] : [];

      setShuffled(_shuffled.filter((s) => s !== e));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          textAlign={'center'}
          // href="/"

          sx={{
            // maxWidth: 400,
            mb: 2,
            flexGrow: 1,
            // fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          SENTENCE <br /> CONSTRUCTION
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <MarkChatReadOutlinedIcon />
        </Avatar>
        <Box my={2}>
          <Typography>
            {sentencesProgress?.correctGuesses ?? correctGuesses}/
            {sentencesProgress?.totalGuesses ?? totalGuesses} correct
          </Typography>
        </Box>
        <Typography component="h5" variant="h5">
          {activeSentence?.translation}
        </Typography>
        <Box
          maxWidth={'sm'}
          flexDirection={'column'}
          rowGap={5}
          minWidth={'100%'}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            my={5}
            gap={2}
          >
            {userInput?.map((i) => (
              <Button
                style={{ textTransform: 'none' }}
                key={i}
                variant="contained"
                onClick={() => handleUserInputClick(i)}
              >
                {i}
              </Button>
            ))}
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={2}
            justifyContent={'center'}
            flexWrap={'wrap'}
            mb={2}
          >
            {shuffled?.map((p) => (
              <Button
                style={{ textTransform: 'none' }}
                key={p}
                variant="outlined"
                onClick={() => handleActiveSentenceClick(p)}
              >
                {p}
              </Button>
            ))}
          </Box>
        </Box>

        {successMsg && (
          <Typography
            mb={2}
            component="h6"
            variant="h6"
            color={messageClass === 'success' ? 'green' : 'red'}
          >
            {successMsg}
          </Typography>
        )}
        {messageClass !== 'success' && (
          <Typography component="h6" variant="h6" color="green">
            correct: {activeSentence?.original}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          // onSubmit={checkUserInput}
          sx={{ mt: 3 }}
        >
          {/* <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <CustomSwitch
                value={includeTranslation}
                onChange={handleToggleIncludeTranslation}
                left={'Translation'}
              />
            </Grid>
          </Grid> */}
          {!isWrongAnswer && (
            <Button
              type="button"
              onClick={checkUserInput}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={shuffled?.length > 0}
            >
              Check
            </Button>
          )}
          {isWrongAnswer && (
            <Button
              type="button"
              onClick={proceed}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
          )}
          <Button
            startIcon={<RefreshIcon />}
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mt: 0, mb: 2 }}
            onClick={reset}
            disabled={isLoading}
          >
            Reset
          </Button>
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
