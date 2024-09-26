import {
  BASE_API_URL,
  BASE_STAFF_URL,
  BASE_STUDENT_URL,
} from "@/constants/constants";
import { checkPasswordStrength, isValidEmail } from "./utils";
import {
  AuthData,
  StaffLoginForm,
  StaffRegisterForm,
  StudentLoginForm,
  StudentRegisterForm,
} from "@/types/auth";
import { StaffInfo, StudentInfo } from "@/types/chat";

export const registerStaff = async (data: StaffRegisterForm) => {
  const { email, full_name, password, type } = data;
  const splitted_full_name = full_name.split(" ");

  if (!isValidEmail(email))
    return { data: null, error: "Your email address is invalid." };

  if (splitted_full_name.length < 2)
    return { data: null, error: "Please enter your full name." };

  if (!checkPasswordStrength(password, true))
    return {
      data: null,
      error: "Please enter a valid password.",
    };

  try {
    const req = await fetch(BASE_STAFF_URL + "/register", {
      method: "POST",
      body: JSON.stringify({
        firstname: splitted_full_name[0],
        lastname: splitted_full_name[1],
        email,
        password,
        type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "An OTP has been sent to your email.", error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const loginStaff = async (data: StaffLoginForm) => {
  const { email, password } = data;

  if (!isValidEmail(email))
    return { data: null, error: "Your email address is invalid." };

  if (password.length < 8)
    return {
      data: null,
      error: "Your password must be at least 8 characters long.",
    };

  try {
    const req = await fetch(BASE_STAFF_URL + "/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.token, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const verifyOtp = async (code: string, email: string) => {
  if (!isValidEmail(email))
    return { data: null, error: "Your email address is invalid." };

  if (!code)
    return { data: null, error: "Please enter your verification code." };

  try {
    const req = await fetch(BASE_STAFF_URL + "/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp: code,
      }),
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "OTP has been confirmed.", error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const resendOtp = async (email: string) => {
  if (!isValidEmail(email))
    return { data: null, error: "Your email address is invalid." };

  try {
    const req = await fetch(BASE_STAFF_URL + "/resendOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Another OTP has been sent to your email.", error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const signOutUser = async (token: string, type: AuthData["type"]) => {
  const BASE_URL = type === "official" ? BASE_STAFF_URL : BASE_STUDENT_URL;

  try {
    const req = await fetch(BASE_URL + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    localStorage.removeItem("auth-data");
    return { data: res.message + ".", error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const registerStudent = async (data: StudentRegisterForm) => {
  const { username, password } = data;

  if (!username)
    return {
      data: null,
      error: "Please enter your username.",
    };

  if (!checkPasswordStrength(password, true))
    return {
      data: null,
      error: "Please enter a valid password.",
    };

  try {
    const req = await fetch(BASE_STUDENT_URL + "/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.token, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const loginStudent = async (data: StudentLoginForm) => {
  const { username, password } = data;

  if (!username)
    return {
      data: null,
      error: "Please enter your username.",
    };

  if (!checkPasswordStrength(password, true))
    return {
      data: null,
      error: "Please enter a valid password.",
    };

  try {
    const req = await fetch(BASE_STUDENT_URL + "/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.token, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const getInfo = async (token: string, type: AuthData["type"]) => {
  const BASE_URL = type === "official" ? BASE_STAFF_URL : BASE_STUDENT_URL;

  try {
    const req = await fetch(BASE_URL + "/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    const data: StudentInfo | StaffInfo =
      type === "official" ? res.data.staff : res.data.student;

    return { data, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const getStaffSections = async (token: string) => {
  try {
    const req = await fetch(BASE_STAFF_URL + "/getsections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occurred.", message: e };
  }
};

export const getConversations = async (
  token: string,
  type: AuthData["type"]
) => {
  const BASE_URL = type === "official" ? BASE_STAFF_URL : BASE_STUDENT_URL;

  try {
    const req = await fetch(BASE_URL + "/conversations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.conversations, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const startConversation = async (token: string, staff_id: string) => {
  try {
    const req = await fetch(BASE_STUDENT_URL + "/startconversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ staffId: staff_id }),
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.conversation, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const getConversation = async (
  token: string,
  type: AuthData["type"],
  id: string
) => {
  const BASE_URL = type === "official" ? BASE_STAFF_URL : BASE_STUDENT_URL;

  try {
    const req = await fetch(BASE_URL + `/conversations/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await req.json()) as any;

    const { data, error } = await getInfo(token, type);

    if (error) return { data: null, error };

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return {
      data: { conversation: res.data.conversation, info: data },
      error: null,
    };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const saveRant = async (token: string, content: string) => {
  try {
    const req = await fetch(BASE_API_URL + "/rants/saveRant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Your rant has been sent.", error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const getRants = async (token: string) => {
  try {
    const req = await fetch(BASE_API_URL + "/rants/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.rants, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const sendPasswordResetLink = async (email: string) => {
  if (!isValidEmail(email))
    return { data: null, error: "Your email address is invalid." };

  try {
    const req = await fetch(BASE_STAFF_URL + "/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};

export const updatePassword = async (password: string, token: string) => {
  try {
    const req = await fetch(BASE_STAFF_URL + "/updatePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
        confirmPassword: password,
      }),
    });
    const res = (await req.json()) as any;

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message, error: null };
  } catch (e: unknown) {
    return { data: null, error: "A server error occured.", message: e };
  }
};
