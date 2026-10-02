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
