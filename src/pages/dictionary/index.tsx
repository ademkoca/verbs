import { useEffect, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import verbsWithTranslation from '../../../verbsWithTranslation';
import nounsWithTranslation from '../../../nouns';
import CustomSwitch from '../../components/switch';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import nounsWithMultipleTranslations from '../../../dictionary';

export default function Dictionary() {
  const preteriteTextRef = useRef();
  const textRef = useRef();

  interface Word {
    article: string;
    original: string;
    translation: Translation[];
  }

  interface Translation {
    possibleTranslation: string;
    isCorrectTranslation: boolean;
  }

  //   const data = verbs;
  const _verbs = verbsWithTranslation;
  const _nouns = nounsWithTranslation;
  const verbs = _verbs.map((v) => ({
    original: v.original,
    translation: v.translation,
  }));
  const nouns = _nouns.map((n) => ({
    original: n.original,
    translation: n.translation,
  }));

  const words = nounsWithMultipleTranslations;
  const totalWords = words.length;
  const [activeWord, setActiveWord] = useState<Word>();
  const [userInput, setUserInput] = useState<string>('');
  const [userInputPreterite, setUserInputPreterite] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState('success');
  const [correctAnswer, setCorrectAnswer] = useState<string | null>();
  const [isHard, setIsHard] = useState<boolean>(false);
  const [usedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [includeTranslation, setIncludeTranslation] = useState<boolean>(false);
  useEffect(() => {
    generateNewWord();
  }, []);
  const generateNewWord = () => {
    const random = Math.floor(Math.random() * totalWords);
    if (!usedItems.includes(words[random].original)) {
      setActiveWord(words[random]);
      usedItems.push(words[random].original);
    } else generateNewWord();
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setUserInput(newValue);
  };
  const resetInputs = () => {
    setSuccessMsg(null);
    generateNewWord();
    setMessageClass('success');
    setIsLoading(false);
    setUserInput('');
    isHard ? preteriteTextRef?.current?.focus() : textRef?.current?.focus();
  };

  useEffect(() => {
    if (userInput && !isHard) {
      const correct: string | undefined = activeWord?.translation?.find(
        (word) => word.isCorrectTranslation === true
      )?.possibleTranslation;
      setCorrectAnswer(correct);
      setIsLoading(true);
      //if correct guess
      if (correct?.toLowerCase() === userInput?.toLowerCase()) {
        setMessageClass('success');
        setCorrectGuesses((prev: number) => prev + 1);
        setSuccessMsg(`${userInput} is correct`);
        // setUserInput(null);
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //if incorrect guess
      else {
        setMessageClass('error');
        setSuccessMsg(`${userInput} is incorrect`);
        // setUserInput(null);
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //anyway
      setTotalGuesses((prev: number) => prev + 1);
    }
  }, [userInput]);

  const checkUserInput = (e: any) => {
    e.preventDefault();
    const correct: string | undefined = activeWord?.translation?.find(
      (word) => word.isCorrectTranslation === true
    )?.possibleTranslation;
    setCorrectAnswer(correct);
    // easy mode
    if (isHard) {
      setIsLoading(true);
      //if correct guess
      if (correct?.toLowerCase() === userInput.toLowerCase().trim()) {
        setMessageClass('success');
        setCorrectGuesses((prev: number) => prev + 1);
        setSuccessMsg(`${userInput} is correct`);
        setUserInput('');
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //if incorrect guess
      else {
        setMessageClass('error');
        setSuccessMsg(`${userInput} is incorrect`);
        setUserInput('');
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //anyway
      setTotalGuesses((prev: number) => prev + 1);
    }
  };
  const handleToggleLevel = () => {
    setIsHard((prev) => !prev);
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
          justifyContent: 'center',
          // minHeight: '80vh',
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
          DICTIONARY
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
          {activeWord?.article + ' ' + activeWord?.original}
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
          <Typography color="green" sx={{ mt: 2 }}>
            correct: {correctAnswer}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={checkUserInput}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <CustomSwitch
                value={isHard}
                onChange={handleToggleLevel}
                left={'Easy'}
                right={'Hard'}
                tooltip
              />
            </Grid>

            {isHard && (
              <Grid item xs={12}>
                <TextField
                  inputRef={textRef}
                  autoFocus={!isHard}
                  required
                  fullWidth
                  id="translation"
                  label="Translation"
                  name="translation"
                  autoComplete="translation"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value.toLowerCase())}
                />
              </Grid>
            )}
            {!isHard && (
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
                  {activeWord?.translation.map((w) => (
                    <ToggleButton
                      disabled={isLoading}
                      value={w.possibleTranslation}
                    >
                      {w.possibleTranslation}
                    </ToggleButton>
                  ))}
                  {/* <ToggleButton disabled={isLoading} value="die">
                    die
                  </ToggleButton>
                  <ToggleButton disabled={isLoading} value="das">
                    das
                  </ToggleButton> */}
                </ToggleButtonGroup>
              </Grid>
            )}
          </Grid>
          {isHard && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Check
            </Button>
          )}
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
