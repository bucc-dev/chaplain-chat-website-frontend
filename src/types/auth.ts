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

export type AuthData = {
  token: string;
  expires_at: number;
  type: "student" | "official";
};
