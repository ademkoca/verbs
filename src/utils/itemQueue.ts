import { shuffle } from './shuffle';

export interface ItemQueue<T> {
  // null once a finite queue has handed out every item
  next(): T | null;
  readonly round: number;
}

// Hands out every item once per round in random order. With repeat: false it stops
// after one round (used for "you've completed this module"); otherwise it reshuffles.
export function createItemQueue<T>(
  items: readonly T[],
  { repeat = true, random = Math.random }: { repeat?: boolean; random?: () => number } = {}
): ItemQueue<T> {
  if (repeat && items.length === 0) {
    throw new Error('createItemQueue needs at least one item');
  }
  let pending: T[] = [];
  let last: T | undefined;
  let round = 0;

  return {
    next() {
      if (pending.length === 0) {
        if (!repeat && round > 0) return null;
        pending = shuffle(items, random);
        round++;
        // Items are popped from the end, so avoid repeating the previous round's last item
        if (pending.length > 1 && pending[pending.length - 1] === last) {
          [pending[0], pending[pending.length - 1]] = [
            pending[pending.length - 1],
            pending[0],
          ];
        }
      }
      const item = pending.pop();
      if (item === undefined) return null;
      last = item;
      return item;
    },
    get round() {
      return round;
    },
  };
}
