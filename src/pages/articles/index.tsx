import { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import nouns from '../../../nouns';
import CustomSwitch from '../../components/switch';
import QuizLayout from '../../components/quiz-layout';
import { useQuiz } from '../../hooks/useQuiz';
import { useProgress } from '../../hooks/useProgress';
import { Article, Noun } from '../../types/interfaces';

const ARTICLES: Article[] = ['der', 'die', 'das'];
const keyOf = (noun: Noun) => noun.original;

export default function Articles() {
  const { progress, isSignedIn, record } = useProgress('articles');
  const quiz = useQuiz(nouns, keyOf, progress?.used);
  const noun = quiz.current;
  const [userInput, setUserInput] = useState<Article | null>(null);
  const [includeTranslation, setIncludeTranslation] = useState(false);

  const goToNextNoun = () => {
    setUserInput(null);
    quiz.next();
  };

  const handleChange = (_event: MouseEvent<HTMLElement>, article: Article | null) => {
    if (!noun || !article || quiz.busy) return;
    const correct = article === noun.article;
    const solution = `${noun.article} ${noun.original}`;
    const message = correct
      ? `${solution} is correct`
      : `${article} ${noun.original} is incorrect`;
    if (!quiz.answer(correct, message, solution)) return;
    setUserInput(article);
    record(noun.original, correct);
    quiz.schedule(goToNextNoun);
  };

  const score = progress
    ? { correct: progress.correctGuesses, total: progress.totalGuesses }
    : quiz.score;

  return (
    <QuizLayout
      title="ARTICLES"
      description="Select the appropriate article for the given word"
      itemLabel="articles"
      score={score}
      completed={quiz.completed}
      onRestart={isSignedIn ? undefined : quiz.restart}
      feedback={quiz.feedback}
      prompt={
        <>
          {noun?.original} {includeTranslation && `(${noun?.translation})`}
        </>
      }
    >
      <Box sx={{ mt: 3, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <CustomSwitch
              value={includeTranslation}
              onChange={() => setIncludeTranslation((prev) => !prev)}
              left={'Translation'}
            />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              color="primary"
              value={userInput}
              exclusive
              onChange={handleChange}
              aria-label="Article"
              fullWidth
              sx={{ mb: 3 }}
            >
              {ARTICLES.map((article) => (
                <ToggleButton key={article} disabled={quiz.busy} value={article}>
                  {article}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 0, mb: 2 }}
          onClick={goToNextNoun}
          disabled={quiz.busy}
        >
          Skip
        </Button>
      </Box>
    </QuizLayout>
  );
}
