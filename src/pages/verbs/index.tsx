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
import CustomSwitch from '../../components/switch';
import useGermanStore from '../../store';
import { auth } from '../../utils/firebase';

export default function Verbs() {
  const store = useGermanStore();
  const verbsProgress = store.user?.progress?.find((p) => p.name === 'verbs');
  // console.log('user: ', store.user);
  const apiUrl = import.meta.env.VITE_API_URL;
  const preteriteTextRef = useRef();
  const participleTextRef = useRef();
  interface Verb {
    original: string;
    preterite: string;
    pastParticiple: string;
    translation?: string;
  }
  //   const data = verbs;
  const removeItemsInSecondArray = (arr1: Verb[], arr2: string[]) => {
    if (arr2?.length > 0) {
      // Use filter to create a new array with items from arr1 that are not in arr2
      const result = arr1.filter((item) => arr2.indexOf(item.original) === -1);
      return result;
    } else return arr1;
  };
  const data = verbsProgress
    ? removeItemsInSecondArray(verbsWithTranslation, verbsProgress?.used)
    : verbsWithTranslation;
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
    if (!usedItems.includes(data[random].original)) {
      setActiveVerb(data[random]);
      usedItems.push(data[random].original);
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

      //if user is logged in
      if (store.user) {
        // const progress = store.user?.progress?.find(
        //   (p: Progress) => p.name === 'verbs'
        // );
        updateProgress(
          'verbs',
          activeVerb?.original,
          activeVerb?.pastParticiple.toLowerCase() ===
            userInputParticiple.toLowerCase()
        );
      }
    }
    //hard mode
    if (userInputParticiple != '' && userInputPreterite !== '') {
      setIsLoading(true);
      const _verb = data?.find(
        (v: Verb) => v.original === activeVerb?.original
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
      //if user is logged in
      if (store.user) {
        // const progress = store.user?.progress?.find(
        //   (p: Progress) => p.name === 'verbs'
        // );
        updateProgress(
          'verbs',
          activeVerb?.original,
          activeVerb?.pastParticiple.toLowerCase() ===
            userInputParticiple.toLowerCase()
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
  const handleToggleLevel = () => {
    setIsHard((prev) => !prev);
  };
  const handleToggleIncludeTranslation = () => {
    setIncludeTranslation((prev) => !prev);
  };

  useEffect(() => {
    if (store.user) updateUser();
  }, [verbsProgress?.used.length]);

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '73dvh' }}>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70dvh',
        }}
      >
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
          <Typography variant="body2" component="p">
            Guess the correct preterite and participle for the given verb
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Box my={2}>
            <Typography>
              {verbsProgress?.correctGuesses ?? correctGuesses}/
              {verbsProgress?.totalGuesses ?? totalGuesses} correct
            </Typography>
          </Box>
          <Typography component="h5" variant="h5">
            {activeVerb?.original}{' '}
            {includeTranslation && `(${activeVerb?.translation})`}
          </Typography>
          {successMsg && (
            <Typography
              component="h6"
              variant="h6"
              mt={2}
              color={messageClass === 'success' ? 'green' : 'error'}
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
                  options={[
                    {
                      title: 'Easy',
                      description: 'Only past participle',
                    },
                    {
                      title: 'Hard',
                      description: 'Preterite and past participle',
                    },
                  ]}
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
      </Box>
    </Container>
  );
}
