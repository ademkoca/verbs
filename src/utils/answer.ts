// Lets learners without a German keyboard type ss / ae / oe / ue
const ASCII_FOLDS: [RegExp, string][] = [
  [/ß/g, 'ss'],
  [/ä/g, 'ae'],
  [/ö/g, 'oe'],
  [/ü/g, 'ue'],
];

export function normalize(value: string): string {
  return ASCII_FOLDS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value.trim().replace(/\s+/g, ' ').toLowerCase()
  );
}

export function isCorrect(input: string, expected: string): boolean {
  return normalize(input) === normalize(expected);
}

// Mobile keyboards should not capitalize or autocorrect German answers
export const answerInputProps = {
  autoCapitalize: 'none',
  autoCorrect: 'off',
  spellCheck: false,
};

// Returns the accepted version of a sentence that matches the attempt (ignoring
// capitalisation, which changes when a phrase moves to the front), or null
export function matchSentence(
  attempt: string,
  sentence: { original: string; alternatives?: string[] }
): string | null {
  const wanted = attempt.trim().toLowerCase();
  return (
    [sentence.original, ...(sentence.alternatives ?? [])].find(
      (accepted) => accepted.toLowerCase() === wanted
    ) ?? null
  );
}
