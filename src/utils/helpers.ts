export const getFirstLetterCapitalized = (word: string): string => {
  if (typeof word !== 'string') {
    throw new Error('Input must be a string');
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};
