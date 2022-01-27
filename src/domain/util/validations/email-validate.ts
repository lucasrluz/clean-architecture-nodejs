export const validateEmail = (email: string) => {
  if (!validateFormat(email)) return false;

  return true;
};

const validateFormat = (value: string) => {
  const [local, domain] = value.split('@');

  const maxLocalSize = 64;
  const maxDomainSize = 255;

  if (
    !emptyOrTooLarge(local, maxLocalSize) ||
    !emptyOrTooLarge(domain, maxDomainSize)
  )
    return false;

  return true;
};

const emptyOrTooLarge = (value: string, maxSize: number) => {
  if (!value || value.length > maxSize) return false;
  return true;
};
