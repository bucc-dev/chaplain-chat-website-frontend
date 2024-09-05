export type StaffRegisterForm = {
  email: string;
  password: string;
  full_name: string;
  type: string;
};

export type StaffLoginForm = {
  email: string;
  password: string;
};

export type PasswordStrengthProps = {
  password: string;
};
