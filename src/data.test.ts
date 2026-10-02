import { describe, expect, it } from 'vitest';
import verbs from './data/verbsWithTranslation';
import nouns from './data/nouns';
import dictionary from './data/dictionary';
import sentences from './data/sentences';

const duplicates = (values: string[]) =>
  values.filter((value, index) => values.indexOf(value) !== index);

describe('verbs data', () => {
  it('has no duplicate verbs', () => {
    expect(duplicates(verbs.map((v) => v.original))).toEqual([]);
  });

  it('has every form filled in without stray whitespace', () => {
    for (const verb of verbs) {
      for (const form of [verb.original, verb.preterite, verb.pastParticiple, verb.translation]) {
        expect(form, verb.original).toBe(form.trim());
        expect(form, verb.original).not.toBe('');
      }
    }
  });
});

describe('nouns data', () => {
  it('has no duplicate nouns', () => {
    expect(duplicates(nouns.map((n) => n.original))).toEqual([]);
  });
});

describe('dictionary data', () => {
  it('has no duplicate words', () => {
    expect(duplicates(dictionary.map((w) => w.original))).toEqual([]);
  });

  it('has exactly one correct option and distinct options per word', () => {
    for (const word of dictionary) {
      const options = word.translation.map((t) => t.possibleTranslation.toLowerCase());
      expect(word.translation.filter((t) => t.isCorrectTranslation), word.original).toHaveLength(1);
      expect(duplicates(options), word.original).toEqual([]);
    }
  });

  it('agrees with the articles quiz on every shared noun', () => {
    const articleOf = new Map(nouns.map((n) => [n.original, n.article]));
    for (const word of dictionary) {
      const article = articleOf.get(word.original);
      if (article) expect(word.article, word.original).toBe(article);
    }
  });
});

describe('sentences data', () => {
  it('has no duplicate sentences', () => {
    expect(duplicates(sentences.map((s) => s.original))).toEqual([]);
  });

  it('has alternatives that use exactly the same word tiles', () => {
    const tiles = (text: string) => text.toLowerCase().split(' ').sort().join(' ');
    for (const sentence of sentences) {
      for (const alternative of sentence.alternatives ?? []) {
        expect(tiles(alternative), alternative).toBe(tiles(sentence.original));
        expect(alternative.toLowerCase(), alternative).not.toBe(sentence.original.toLowerCase());
      }
    }
  });

  it('splits into words on single spaces only', () => {
    for (const sentence of sentences) {
      expect(sentence.original, sentence.original).toBe(sentence.original.trim());
      expect(sentence.original, sentence.original).not.toMatch(/\s{2,}/);
      expect(sentence.translation, sentence.original).not.toBe('');
    }
  });
});
