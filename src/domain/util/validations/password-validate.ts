export const validatePassword = (password: string) => {
  if (!validateLength(password)) return false;

  return true;
};

const validateLength = (value: string) => {
  if (value.length < 5 || value.length > 20) return false;

  return true;
};
