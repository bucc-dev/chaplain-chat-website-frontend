import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email);

export const checkPasswordStrength = (
  password: string,
  checkStrength = false
) => {
  const hasMinChar = password.length >= 8;
  const hasNum = /\d/.test(password);
  const hasSym = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
  const hasUpp = /[A-Z]/.test(password);

  if (checkStrength)
    return [hasMinChar, hasNum, hasSym, hasUpp].every((k) => k === true);

  return { hasMinChar, hasNum, hasSym, hasUpp };
};

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export const getNumberFromId = (id: string) => {
  return id.split("").map(Number);
};
