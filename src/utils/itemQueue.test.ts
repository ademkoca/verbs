import { describe, expect, it } from 'vitest';
import { createItemQueue } from './itemQueue';

const drain = <T>(queue: { next(): T }, count: number) =>
  Array.from({ length: count }, () => queue.next());

describe('createItemQueue', () => {
  it('returns every item exactly once per round', () => {
    const items = ['a', 'b', 'c', 'd', 'e'];
    const queue = createItemQueue(items);
    expect(drain(queue, items.length).sort()).toEqual(items);
    expect(queue.round).toBe(1);
  });

  it('starts a new round instead of throwing when all items are used', () => {
    const items = [1, 2, 3];
    const queue = createItemQueue(items);
    const seen = drain(queue, 30);
    expect(queue.round).toBe(10);
    for (let round = 0; round < 10; round++) {
      expect(seen.slice(round * 3, round * 3 + 3).sort()).toEqual(items);
    }
  });

  it('never repeats the same item twice in a row across rounds', () => {
    const queue = createItemQueue(['x', 'y']);
    const seen = drain(queue, 200);
    for (let i = 1; i < seen.length; i++) {
      expect(seen[i]).not.toBe(seen[i - 1]);
    }
  });

  it('keeps returning the only item of a single-item list', () => {
    const queue = createItemQueue(['only']);
    expect(drain(queue, 3)).toEqual(['only', 'only', 'only']);
  });

  it('does not mutate the source array', () => {
    const items = [1, 2, 3, 4];
    drain(createItemQueue(items), 8);
    expect(items).toEqual([1, 2, 3, 4]);
  });

  it('rejects an empty list', () => {
    expect(() => createItemQueue([])).toThrow();
  });
});

describe('createItemQueue with repeat: false', () => {
  it('hands out every item exactly once, then null', () => {
    const items = Array.from({ length: 50 }, (_, i) => i);
    const queue = createItemQueue(items, { repeat: false });
    const seen = drain(queue, 50);
    expect([...seen].sort((a, b) => (a as number) - (b as number))).toEqual(items);
    expect(queue.next()).toBeNull();
    expect(queue.next()).toBeNull();
  });

  it('reaches items at the end of the list (the old picker never did)', () => {
    const items = Array.from({ length: 200 }, (_, i) => i);
    const seen = drain(createItemQueue(items, { repeat: false }), 200);
    expect(seen).toContain(199);
    expect(seen).toContain(198);
  });

  it('returns null right away for an empty list', () => {
    expect(createItemQueue([], { repeat: false }).next()).toBeNull();
  });
});
