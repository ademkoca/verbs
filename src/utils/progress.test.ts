import { describe, expect, it } from 'vitest';
import { applyGuess, completionPercentage, moduleItems } from './progress';
import { Progress } from '../types/interfaces';

describe('completionPercentage', () => {
  it('reaches exactly 100 when every item is done', () => {
    for (const name of ['verbs', 'articles', 'sentences', 'dictionary'] as const) {
      expect(completionPercentage(name, moduleItems[name])).toBe(100);
    }
  });

  it('ignores duplicates and items that no longer exist', () => {
    const [first, second] = moduleItems.verbs;
    expect(completionPercentage('verbs', [first, first, first, 'not-a-verb', second])).toBe(
      Math.round((2 / moduleItems.verbs.length) * 100)
    );
  });

  it('never exceeds 100', () => {
    expect(completionPercentage('articles', [...moduleItems.articles, ...moduleItems.articles])).toBe(100);
  });
});

describe('applyGuess', () => {
  const progress: Progress[] = [
    { name: 'verbs', used: ['gehen'], totalGuesses: 1, correctGuesses: 1 },
  ];

  it('adds a new item and updates the counters', () => {
    expect(applyGuess(progress, 'verbs', 'sehen', false)[0]).toEqual({
      name: 'verbs',
      used: ['gehen', 'sehen'],
      totalGuesses: 2,
      correctGuesses: 1,
    });
  });

  it('counts an item only once', () => {
    expect(applyGuess(progress, 'verbs', 'gehen', true)).toBe(progress);
  });

  it('creates a missing module entry', () => {
    expect(applyGuess(progress, 'articles', 'Hund', true)[1]).toEqual({
      name: 'articles',
      used: ['Hund'],
      totalGuesses: 1,
      correctGuesses: 1,
    });
  });
});
