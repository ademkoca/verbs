import { useCallback, useEffect, useRef, useState } from 'react';
import { createItemQueue } from '../utils/itemQueue';

export const FEEDBACK_DELAY_MS = 3000;

export interface Feedback {
  correct: boolean;
  message: string;
  solution?: string;
}

export interface Score {
  correct: number;
  total: number;
}

const buildQueue = <T>(items: readonly T[], keyOf: (item: T) => string, excluded: readonly string[]) => {
  const done = new Set(excluded);
  return createItemQueue(
    items.filter((item) => !done.has(keyOf(item))),
    { repeat: false }
  );
};

// Runs one quiz session: hands out every remaining item once (skipping `excluded`),
// records at most one answer per item and schedules the next item after feedback.
export function useQuiz<T>(
  items: readonly T[],
  keyOf: (item: T) => string,
  excluded: readonly string[] = []
) {
  const [queue, setQueue] = useState(() => buildQueue(items, keyOf, excluded));
  const [current, setCurrent] = useState<T | null>(() => queue.next());
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });
  // A ref (not state) so two submits in quick succession can't both be counted
  const answered = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const next = useCallback((): T | null => {
    clearTimeout(timer.current);
    answered.current = false;
    setFeedback(null);
    const item = queue.next();
    setCurrent(item);
    return item;
  }, [queue]);

  // Records at most one answer per item; returns false if the item was already answered
  const answer = useCallback(
    (correct: boolean, message: string, solution?: string): boolean => {
      if (answered.current) return false;
      answered.current = true;
      setFeedback({ correct, message, solution });
      setScore((prev) => ({
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1,
      }));
      return true;
    },
    []
  );

  const schedule = useCallback((callback: () => void) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(callback, FEEDBACK_DELAY_MS);
  }, []);

  // Starts over with every item (used by guests after finishing)
  const restart = useCallback((): T | null => {
    const fresh = buildQueue(items, keyOf, []);
    setQueue(fresh);
    clearTimeout(timer.current);
    answered.current = false;
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
    const item = fresh.next();
    setCurrent(item);
    return item;
  }, [items, keyOf]);

  return {
    current,
    completed: current === null,
    feedback,
    score,
    busy: feedback !== null,
    answer,
    next,
    schedule,
    restart,
  };
}
