import { useEffect, useState, useRef, ChangeEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import sentences from '../../../sentences';
import CustomSwitch from '../../components/switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Sentences() {
  const textRef = useRef();
  interface Sentence {
    parts: string[];
    original: string;
    translation?: string;
  }
  //   const data = verbs;
  const data = sentences;
  const totalSentences = data.length;
  const [activeSentence, setActiveSentence] = useState<Sentence>({
    parts: [],
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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setUserInput(newValue);
  };

  const checkUserInput = () => {
    if (shuffled.length === 0) {
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
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //anyway
      setTotalGuesses((prev: number) => prev + 1);
    }
  };

  // useEffect(() => {
  //   if (userInput) {
  //     setIsLoading(true);
  //     //if correct guess
  //     if (activeSentence?.article.toLowerCase() === userInput?.toLowerCase()) {
  //       setMessageClass('success');
  //       setCorrectGuesses((prev: number) => prev + 1);
  //       setSuccessMsg(`${userInput} ${activeSentence?.original} is correct`);
  //       // setUserInput(null);
  //       setTimeout(() => {
  //         resetInputs();
  //       }, 3000);
  //     }
  //     //if incorrect guess
  //     else {
  //       setMessageClass('error');
  //       setSuccessMsg(`${userInput} ${activeSentence?.original} is incorrect`);
  //       // setUserInput(null);
  //       setTimeout(() => {
  //         resetInputs();
  //       }, 3000);
  //     }
  //     //anyway
  //     setTotalGuesses((prev: number) => prev + 1);
  //   }
  // }, [userInput]);

  // useEffect(() => {

  // }, [activeSentenceCopy]);

  useEffect(() => {
    generateNewArticle();
  }, []);
  const generateNewArticle = () => {
    const random = Math.floor(Math.random() * totalSentences);
    if (!usedItems.includes(data[random].original)) {
      setActiveSentence(data[random]);
      setActiveSentenceCopy(data[random]);
      setShuffled(shuffleArray(data[random].parts));

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

  const reset = (): void => {
    setActiveSentenceCopy(activeSentence);
    setShuffled(shuffleArray(activeSentenceCopy.parts));
    setUserInput([]);
  };

  const shuffleArray = (arr: string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleToggleIncludeTranslation = () => {
    setIncludeTranslation((prev) => !prev);
  };
  console.log(userInput?.length);
  const handleUserInputClick = (i: string) => {
    console.log(userInput);
    console.log(activeSentenceCopy);

    const _userInput = userInput ? [...userInput] : [];
    setUserInput(_userInput.filter((u) => u !== i));
    const _shuffled = shuffled ? [...shuffled] : [];
    _shuffled.push(i);
    setShuffled(_shuffled);
    //     ? [...activeSentenceCopy.parts]
    //     : [];

    // console.log(i);
    // e.preventDefault();
    // if (userInput?.length > 0) {
    //   const _activeSentence = activeSentenceCopy.parts
    //     ? [...activeSentenceCopy.parts]
    //     : [];

    //   // const _userInput = userInput ? [...userInput] : [];
    //   _activeSentence.push(i);
    //   setActiveSentenceCopy(_activeSentence);
    //   // const { parts, ...rest } = activeSentenceCopy;
    //   const _userInput = userInput ? [...userInput] : [];
    //   setUserInput(_userInput.filter((s) => s !== i));
    // }
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
          SENTENCE CONSTRUCTION
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <MarkChatReadOutlinedIcon />
        </Avatar>
        <Box my={2}>
          <Typography>
            {correctGuesses}/{totalGuesses} correct
          </Typography>
        </Box>
        <Typography component="h5" variant="h5">
          {activeSentence?.translation}
        </Typography>
        <Box flexDirection={'column'} rowGap={5} minWidth={'100%'}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            my={5}
          >
            {userInput?.map((i) => (
              <Button
                style={{ marginRight: 10 }}
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
            mb={2}
          >
            {shuffled?.map((p) => (
              <Button
                // style={{ marginRight: 10 }}
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
            component="h6"
            variant="h6"
            color={messageClass === 'success' ? 'green' : 'red'}
          >
            {successMsg}
          </Typography>
        )}
        {messageClass !== 'success' && (
          <Typography color="green">
            correct: {activeSentence?.original}
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

            {/* <Grid item xs={12}>
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
            </Grid> */}
          </Grid>
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
