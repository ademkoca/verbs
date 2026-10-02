import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import sentences from '../../data/sentences';
import QuizLayout from '../../components/quiz-layout';
import { useQuiz } from '../../hooks/useQuiz';
import { useProgress } from '../../hooks/useProgress';
import { shuffle } from '../../utils/shuffle';
import { matchSentence } from '../../utils/answer';
import { Sentence } from '../../types/interfaces';

// Tiles are tracked by their position in the sentence, so repeated words stay separate
interface Tile {
  id: number;
  word: string;
}

const keyOf = (sentence: Sentence) => sentence.original;

const toShuffledTiles = (sentence: Sentence | null): Tile[] =>
  sentence ? shuffle(sentence.original.split(' ').map((word, id) => ({ id, word }))) : [];

const tileRowProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 2,
} as const;

export default function Sentences() {
  const { progress, isSignedIn, record } = useProgress('sentences');
  const quiz = useQuiz(sentences, keyOf, progress?.used);
  const sentence = quiz.current;
  const [pool, setPool] = useState<Tile[]>(() => toShuffledTiles(sentence));
  const [picked, setPicked] = useState<Tile[]>([]);
  const isWrongAnswer = quiz.feedback?.correct === false;

  const loadBoard = (next: Sentence | null) => {
    setPool(toShuffledTiles(next));
    setPicked([]);
  };

  const goToNextSentence = () => loadBoard(quiz.next());
  const restart = () => loadBoard(quiz.restart());

  const pickTile = (tile: Tile) => {
    setPool((prev) => prev.filter((t) => t.id !== tile.id));
    setPicked((prev) => [...prev, tile]);
  };

  const unpickTile = (tile: Tile) => {
    setPicked((prev) => prev.filter((t) => t.id !== tile.id));
    setPool((prev) => [...prev, tile]);
  };

  const checkUserInput = () => {
    if (!sentence || quiz.busy || pool.length > 0) return;
    const attempt = picked.map((t) => t.word).join(' ');
    const match = matchSentence(attempt, sentence);
    const correct = match !== null;
    const message = correct ? `Correct! ${match}` : `Incorrect: ${attempt}`;
    if (!quiz.answer(correct, message, sentence.original)) return;
    record(sentence.original, correct);
    if (correct) quiz.schedule(goToNextSentence);
  };

  const score = progress
    ? { correct: progress.correctGuesses, total: progress.totalGuesses }
    : quiz.score;

  return (
    <QuizLayout
      title={
        <>
          SENTENCE <br /> CONSTRUCTION
        </>
      }
      description="Put the words in the correct order to form a sentence"
      itemLabel="sentences"
      score={score}
      completed={quiz.completed}
      onRestart={isSignedIn ? undefined : restart}
      feedback={quiz.feedback}
      prompt={sentence?.translation}
      board={
        <Box maxWidth="sm" minWidth="100%">
          <Box {...tileRowProps} my={5}>
            {picked.map((tile) => (
              <Button
                style={{ textTransform: 'none' }}
                key={tile.id}
                variant="contained"
                disabled={quiz.busy}
                onClick={() => unpickTile(tile)}
              >
                {tile.word}
              </Button>
            ))}
          </Box>
          <Box {...tileRowProps} mb={2}>
            {pool.map((tile) => (
              <Button
                style={{ textTransform: 'none' }}
                key={tile.id}
                variant="outlined"
                disabled={quiz.busy}
                onClick={() => pickTile(tile)}
              >
                {tile.word}
              </Button>
            ))}
          </Box>
        </Box>
      }
    >
      <Box sx={{ mt: 3, width: '100%' }}>
        {isWrongAnswer ? (
          <Button
            type="button"
            onClick={goToNextSentence}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            onClick={checkUserInput}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={quiz.busy || pool.length > 0}
          >
            Check
          </Button>
        )}
        <Button
          startIcon={<RefreshIcon />}
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 0, mb: 2 }}
          onClick={() => loadBoard(sentence)}
          disabled={quiz.busy}
        >
          Reset
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 0, mb: 2 }}
          onClick={goToNextSentence}
          disabled={quiz.busy}
        >
          Skip
        </Button>
      </Box>
    </QuizLayout>
  );
}
