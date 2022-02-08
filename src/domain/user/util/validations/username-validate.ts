export const validateUsername = (username: string) => {
  if (!validateLength(username)) return false;

  if (!validateFormat(username)) return false;

  return true;
};

const validateLength = (value: string) => {
  if (value.length < 1 || value.length > 15) return false;

  return true;
};

const validateFormat = (value: string) => {
  const blankSpace = value.indexOf(' ');

  if (blankSpace !== -1) return false;

  return true;
};
