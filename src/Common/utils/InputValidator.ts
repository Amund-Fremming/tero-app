const textRegex = /^[A-Za-z]+$/;
const numberRegex = /^[0-9]+$/;
const usernameRegex = /^[A-Za-z0-9]+$/;

export const validText = (input: string): boolean => {
  return textRegex.test(input);
};

export const validNumber = (input: string): boolean => {
  return numberRegex.test(input);
};

export const validUsername = (input: string): boolean => {
  return usernameRegex.test(input);
};

export const validPassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Passordet må være minst 8 tegn");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Passordet må inneholde minst én stor bokstav");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Passordet må inneholde minst ett tall");
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Passordet må inneholde minst ett spesialtegn");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default { validText, validNumber, validUsername, validPassword };
