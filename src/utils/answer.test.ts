import { describe, expect, it } from 'vitest';
import { isCorrect, normalize } from './answer';

describe('normalize', () => {
  it('trims, collapses whitespace and lowercases', () => {
    expect(normalize('  Nahm   AN ')).toBe('nahm an');
  });

  it('folds ß and umlauts to their ASCII spellings', () => {
    expect(normalize('Aß')).toBe('ass');
    expect(normalize('gehört')).toBe('gehoert');
    expect(normalize('Übung')).toBe('uebung');
    expect(normalize('ärgerte')).toBe('aergerte');
  });
});

describe('isCorrect', () => {
  it('accepts exact answers and trailing spaces from mobile keyboards', () => {
    expect(isCorrect('gemacht', 'gemacht')).toBe(true);
    expect(isCorrect('gemacht ', 'gemacht')).toBe(true);
    expect(isCorrect('Gemacht', 'gemacht')).toBe(true);
  });

  it('accepts ASCII spellings of ß and umlauts', () => {
    expect(isCorrect('ass', 'aß')).toBe(true);
    expect(isCorrect('geaergert', 'geärgert')).toBe(true);
    expect(isCorrect('stiess', 'stieß')).toBe(true);
  });

  it('rejects wrong answers', () => {
    expect(isCorrect('gemachen', 'gemacht')).toBe(false);
    expect(isCorrect('', 'gemacht')).toBe(false);
    expect(isCorrect('as', 'aß')).toBe(false);
  });
});
