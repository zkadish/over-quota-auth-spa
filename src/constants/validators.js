const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = email => {
  return emailRegex.test(email);
};

const validatePassword = password => {
  const result = {
    eightChars: false,
    upLetter: false,
    lowLetter: false,
    number: false,
    special: false,
  };
  if (/.{8,}/.test(password)) result.eightChars = true; // eightChars
  if (/[A-Z]/.test(password)) result.upLetter = true; 
  if (/[a-z]/.test(password)) result.lowLetter = true;
  if (/[0-9]/.test(password)) result.number = true;
  if (/[^A-Za-z0-9]/.test(password)) result.special = true;
  return result;
};

export {
  isValidEmail,
  validatePassword,
};
