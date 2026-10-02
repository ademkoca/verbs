import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Feedback, Score } from '../../hooks/useQuiz';

interface Props {
  title: ReactNode;
  description: string;
  // what the congrats message counts, e.g. "verbs"
  itemLabel: string;
  score: Score;
  completed: boolean;
  // guests can start over directly; signed-in users reset on the Progress page
  onRestart?: () => void;
  prompt: ReactNode;
  feedback: Feedback | null;
  // rendered between the prompt and the feedback message
  board?: ReactNode;
  children: ReactNode;
}

const QuizLayout = ({
  title,
  description,
  itemLabel,
  score,
  completed,
  onRestart,
  prompt,
  feedback,
  board,
  children,
}: Props) => (
  <Container component="main" maxWidth="xs" sx={{ minHeight: '73dvh' }}>
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{ mb: 2, fontWeight: 700, letterSpacing: '.3rem' }}
        >
          {title}
        </Typography>
        <Typography variant="body2" component="p" textAlign="center">
          {description}
        </Typography>
      </Box>
      {!completed ? (
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          <Box my={2}>
            <Typography>
              {score.correct}/{score.total} correct
            </Typography>
          </Box>
          <Typography component="h2" variant="h5" textAlign="center">
            {prompt}
          </Typography>
          {board}
          {feedback && (
            <Typography
              component="p"
              variant="h6"
              mt={2}
              textAlign="center"
              color={feedback.correct ? 'green' : 'error'}
            >
              {feedback.message}
            </Typography>
          )}
          {feedback && !feedback.correct && feedback.solution && (
            <Typography color="green" mt={2} textAlign="center">
              correct: {feedback.solution}
            </Typography>
          )}
          {children}
        </Box>
      ) : (
        <Alert severity="success" sx={{ mt: 10 }}>
          <Typography mb={2}>
            CONGRATS! You've guessed {score.correct} out of {score.total} {itemLabel}{' '}
            correct.
          </Typography>
          {onRestart ? (
            <Typography>
              <Button variant="text" size="small" onClick={onRestart}>
                Start again
              </Button>
            </Typography>
          ) : (
            <Typography>
              You can
              <Button variant="text" size="small" component={RouterLink} to="/progress">
                Reset
              </Button>
              your progress and start again
            </Typography>
          )}
        </Alert>
      )}
    </Box>
  </Container>
);

export default QuizLayout;
