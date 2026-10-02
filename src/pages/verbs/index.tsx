import { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import verbsWithTranslation from '../../data/verbsWithTranslation';
import CustomSwitch from '../../components/switch';
import UmlautKeys from '../../components/umlaut-keys';
import QuizLayout from '../../components/quiz-layout';
import { useQuiz } from '../../hooks/useQuiz';
import { useProgress } from '../../hooks/useProgress';
import { answerInputProps, isCorrect } from '../../utils/answer';
import { Verb } from '../../types/interfaces';

const keyOf = (verb: Verb) => verb.original;

export default function Verbs() {
  const { progress, isSignedIn, record } = useProgress('verbs');
  const quiz = useQuiz(verbsWithTranslation, keyOf, progress?.used);
  const verb = quiz.current;
  const preteriteTextRef = useRef<HTMLInputElement>(null);
  const participleTextRef = useRef<HTMLInputElement>(null);
  const [userInputParticiple, setUserInputParticiple] = useState('');
  const [userInputPreterite, setUserInputPreterite] = useState('');
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isHard, setIsHard] = useState(false);
  const [includeTranslation, setIncludeTranslation] = useState(false);

  useEffect(() => {
    (isHard ? preteriteTextRef : participleTextRef).current?.focus();
  }, [verb, isHard]);

  const clearInputs = () => {
    setUserInputParticiple('');
    setUserInputPreterite('');
    setValidationMsg(null);
  };

  const goToNextVerb = () => {
    clearInputs();
    quiz.next();
  };

  const checkUserInput = (e: FormEvent) => {
    e.preventDefault();
    if (!verb || quiz.busy) return;
    const participle = userInputParticiple.trim();
    const preterite = userInputPreterite.trim();
    if (!participle || (isHard && !preterite)) {
      setValidationMsg(
        isHard ? 'Enter both the preterite and the participle' : 'Enter the participle'
      );
      return;
    }

    const correct =
      isCorrect(participle, verb.pastParticiple) &&
      (!isHard || isCorrect(preterite, verb.preterite));
    const solution = isHard
      ? `${verb.preterite} > ${verb.pastParticiple}`
      : verb.pastParticiple;
    const guess = isHard ? `${preterite} > ${participle}` : participle;
    // On success show the proper spelling, in case the answer was typed as ss/ae/oe/ue
    const message = correct ? `${solution} is correct` : `${guess} is incorrect`;
    if (!quiz.answer(correct, message, solution)) return;

    record(verb.original, correct);
    clearInputs();
    quiz.schedule(goToNextVerb);
  };

  const score = progress
    ? { correct: progress.correctGuesses, total: progress.totalGuesses }
    : quiz.score;

  return (
    <QuizLayout
      title="VERBS"
      description="Guess the correct preterite and participle for the given verb"
      itemLabel="verbs"
      score={score}
      completed={quiz.completed}
      onRestart={isSignedIn ? undefined : quiz.restart}
      feedback={quiz.feedback}
      prompt={
        <>
          {verb?.original} {includeTranslation && `(${verb?.translation})`}
        </>
      }
    >
      <Box component="form" noValidate onSubmit={checkUserInput} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <CustomSwitch
              value={isHard}
              onChange={() => setIsHard((prev) => !prev)}
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
              onChange={() => setIncludeTranslation((prev) => !prev)}
              left={'Translation'}
            />
          </Grid>
          {isHard && (
            <Grid item xs={12}>
              <TextField
                inputRef={preteriteTextRef}
                required
                fullWidth
                id="preterite"
                label="Preterite"
                name="preterite"
                autoComplete="off"
                inputProps={answerInputProps}
                value={userInputPreterite}
                onChange={(e) => setUserInputPreterite(e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              inputRef={participleTextRef}
              required
              fullWidth
              id="particip"
              label="Participle"
              name="particip"
              autoComplete="off"
              inputProps={answerInputProps}
              value={userInputParticiple}
              onChange={(e) => setUserInputParticiple(e.target.value)}
            />
            <UmlautKeys
              disabled={quiz.busy}
              targets={[
                ...(isHard
                  ? [{ ref: preteriteTextRef, value: userInputPreterite, setValue: setUserInputPreterite }]
                  : []),
                { ref: participleTextRef, value: userInputParticiple, setValue: setUserInputParticiple },
              ]}
            />
          </Grid>
        </Grid>
        {validationMsg && (
          <Typography color="error" variant="body2" mt={1}>
            {validationMsg}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={quiz.busy}
        >
          Check
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 0, mb: 2 }}
          onClick={goToNextVerb}
          disabled={quiz.busy}
        >
          Skip
        </Button>
      </Box>
    </QuizLayout>
  );
}
