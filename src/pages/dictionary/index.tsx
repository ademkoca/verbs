import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import nounsWithMultipleTranslations from '../../../dictionary';
import CustomSwitch from '../../components/switch';
import QuizLayout from '../../components/quiz-layout';
import { useQuiz } from '../../hooks/useQuiz';
import { useProgress } from '../../hooks/useProgress';
import { answerInputProps, isCorrect } from '../../utils/answer';
import { DictionaryWord } from '../../types/interfaces';

const keyOf = (word: DictionaryWord) => word.original;

export default function Dictionary() {
  const { progress, isSignedIn, record } = useProgress('dictionary');
  const quiz = useQuiz(nounsWithMultipleTranslations, keyOf, progress?.used);
  const word = quiz.current;
  const correctTranslation =
    word?.translation.find((t) => t.isCorrectTranslation)?.possibleTranslation ?? '';
  const textRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState('');
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isHard, setIsHard] = useState(false);

  useEffect(() => {
    if (isHard) textRef.current?.focus();
  }, [word, isHard]);

  const goToNextWord = () => {
    setUserInput('');
    setValidationMsg(null);
    quiz.next();
  };

  const submitAnswer = (answer: string) => {
    if (!word) return;
    const correct = isCorrect(answer, correctTranslation);
    const message = correct
      ? `${correctTranslation} is correct`
      : `${answer} is incorrect`;
    if (!quiz.answer(correct, message, correctTranslation)) return;
    record(word.original, correct);
    setValidationMsg(null);
    quiz.schedule(goToNextWord);
  };

  const handleOptionChange = (_event: MouseEvent<HTMLElement>, option: string | null) => {
    if (!option || quiz.busy) return;
    setUserInput(option);
    submitAnswer(option);
  };

  const checkUserInput = (e: FormEvent) => {
    e.preventDefault();
    if (quiz.busy) return;
    const answer = userInput.trim();
    if (!answer) {
      setValidationMsg('Enter the translation');
      return;
    }
    submitAnswer(answer);
  };

  const score = progress
    ? { correct: progress.correctGuesses, total: progress.totalGuesses }
    : quiz.score;

  return (
    <QuizLayout
      title="DICTIONARY"
      description="Guess the correct translation of the given word"
      itemLabel="words"
      score={score}
      completed={quiz.completed}
      onRestart={isSignedIn ? undefined : quiz.restart}
      feedback={quiz.feedback}
      prompt={word ? `${word.article} ${word.original}` : ''}
    >
      <Box component="form" noValidate onSubmit={checkUserInput} sx={{ mt: 3, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <CustomSwitch
              value={isHard}
              onChange={() => {
                setIsHard((prev) => !prev);
                if (!quiz.busy) setUserInput('');
              }}
              left={'Easy'}
              right={'Hard'}
              options={[
                {
                  title: 'Easy',
                  description: 'Pick the translation from the 3 possible options',
                },
                {
                  title: 'Hard',
                  description: 'Enter the translation manually',
                },
              ]}
            />
          </Grid>
          {isHard ? (
            <Grid item xs={12}>
              <TextField
                inputRef={textRef}
                required
                fullWidth
                id="translation"
                label="Translation"
                name="translation"
                autoComplete="off"
                inputProps={answerInputProps}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <ToggleButtonGroup
                color="primary"
                value={userInput}
                exclusive
                onChange={handleOptionChange}
                aria-label="Translation"
                fullWidth
                sx={{ mb: 3 }}
              >
                {word?.translation.map((t) => (
                  <ToggleButton
                    key={t.possibleTranslation}
                    disabled={quiz.busy}
                    value={t.possibleTranslation}
                  >
                    {t.possibleTranslation}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          )}
        </Grid>
        {validationMsg && (
          <Typography color="error" variant="body2" mt={1}>
            {validationMsg}
          </Typography>
        )}
        {isHard && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={quiz.busy}
          >
            Check
          </Button>
        )}
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 0, mb: 2 }}
          onClick={goToNextWord}
          disabled={quiz.busy}
        >
          Skip
        </Button>
      </Box>
    </QuizLayout>
  );
}
