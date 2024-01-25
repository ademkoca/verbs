export const getFirstLetterCapitalized = (word: string): string => {
  if (typeof word !== 'string') {
    throw new Error('Input must be a string');
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const accentColors = {
  verbs: '#006D77',
  articles: '#EF7A06',
  sentences: '#9A5B5E',
  dictionary: '#3A0F80',
};
