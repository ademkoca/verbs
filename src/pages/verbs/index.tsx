import { useEffect, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { verbsWithTranslation } from '../../../verbsWithTranslation';
import CustomSwitch from '../../components/switch';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://ademkoca.github.io/portfolio-react"
        target="_blank"
        {...props}
      >
        Adem Koca
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Verbs() {
  const preteriteTextRef = useRef();
  const participleTextRef = useRef();
  interface Verb {
    infinitive: string;
    preterite: string;
    pastParticiple: string;
    translation?: string;
  }
  //   const data = verbs;
  const data = verbsWithTranslation;
  const totalVerbs = data.length;
  const [activeVerb, setActiveVerb] = useState<Verb>();
  const [userInputParticiple, setUserInputParticiple] = useState<string>('');
  const [userInputPreterite, setUserInputPreterite] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState('success');
  const [isHard, setIsHard] = useState<boolean>(false);
  const [usedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [includeTranslation, setIncludeTranslation] = useState<boolean>(false);
  useEffect(() => {
    generateNewVerb();
  }, []);
  const generateNewVerb = () => {
    const random = Math.floor(Math.random() * totalVerbs);
    if (!usedItems.includes(data[random].infinitive)) {
      setActiveVerb(data[random]);
      usedItems.push(data[random].infinitive);
    } else generateNewVerb();
  };

  const resetInputs = () => {
    setSuccessMsg(null);
    generateNewVerb();
    setMessageClass('success');
    setIsLoading(false);
    isHard
      ? preteriteTextRef?.current?.focus()
      : participleTextRef?.current?.focus();
  };

  const checkUserInput = (e: any) => {
    e.preventDefault();
    // easy mode
    if (userInputParticiple != '' && !isHard) {
      setIsLoading(true);
      //if correct guess
      if (
        activeVerb?.pastParticiple.toLowerCase() ===
        userInputParticiple.toLowerCase()
      ) {
        setMessageClass('success');
        setCorrectGuesses((prev: number) => prev + 1);
        setSuccessMsg(`${userInputParticiple} is correct`);
        setUserInputParticiple('');
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //if incorrect guess
      else {
        setMessageClass('error');
        setSuccessMsg(`${userInputParticiple} is incorrect`);
        setUserInputParticiple('');
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //anyway
      setTotalGuesses((prev: number) => prev + 1);
    }
    //hard mode
    if (userInputParticiple != '' && userInputPreterite !== '') {
      setIsLoading(true);
      const _verb = data.find(
        (v: Verb) => v.infinitive === activeVerb?.infinitive
      );
      //if correct guess
      if (
        _verb?.pastParticiple.toLowerCase() ===
          userInputParticiple.toLowerCase() &&
        _verb?.preterite.toLowerCase() === userInputPreterite.toLowerCase()
      ) {
        setMessageClass('success');
        setCorrectGuesses((prev: number) => prev + 1);
        setSuccessMsg(
          `${userInputPreterite} > ${userInputParticiple} is correct`
        );
        setUserInputParticiple('');
        setUserInputPreterite('');
        setTimeout(() => {
          resetInputs();
        }, 3000);
      }
      //if incorrect guess
      else {
        setMessageClass('error');
        setSuccessMsg(
          `${userInputPreterite} > ${userInputParticiple} is incorrect`
        );
        setUserInputParticiple('');
        setUserInputPreterite('');
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
  const handleToggleIncludeTranslation = () => {
    setIncludeTranslation((prev) => !prev);
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
          VERBS
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
          {activeVerb?.infinitive}{' '}
          {includeTranslation && `(${activeVerb?.translation})`}
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
            correct: {isHard && activeVerb?.preterite + ' > '}
            {activeVerb?.pastParticiple}
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
            <Grid item xs={6} sm={6}>
              <CustomSwitch
                value={includeTranslation}
                onChange={handleToggleIncludeTranslation}
                left={'Translation'}
              />
            </Grid>

            {isHard && (
              <Grid item xs={12}>
                <TextField
                  inputRef={preteriteTextRef}
                  autoFocus={isHard}
                  required
                  fullWidth
                  id="preterite"
                  label="Preterite"
                  name="preterite"
                  autoComplete="preterite"
                  value={userInputPreterite}
                  onChange={(e) =>
                    setUserInputPreterite(e.target.value.toLowerCase())
                  }
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                inputRef={participleTextRef}
                autoFocus={!isHard}
                required
                fullWidth
                id="particip"
                label="Participle"
                name="particip"
                autoComplete="particip"
                value={userInputParticiple}
                onChange={(e) =>
                  setUserInputParticiple(e.target.value.toLowerCase())
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Check
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
