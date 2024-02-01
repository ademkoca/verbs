export const getFirstLetterCapitalized = (word: string): string => {
  if (typeof word !== 'string') {
    throw new Error('Input must be a string');
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getInitials = (firstName?: string, lastName?: string): string => {
  // Get the first character of each name and convert to uppercase
  const firstInitial = firstName?.charAt(0).toUpperCase() ?? '';
  const lastInitial = lastName?.charAt(0).toUpperCase() ?? '';

  // Concatenate the initials and return
  return firstInitial + lastInitial;
};
