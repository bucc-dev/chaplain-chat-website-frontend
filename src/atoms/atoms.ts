import { AuthData } from "@/types/auth";
import { StaffInfo, StudentInfo } from "@/types/chat";
import { atom } from "recoil";

export const AUTH_DATA = atom<{ type: AuthData["type"]; token: string }>({
  key: "auth token",
  default: { type: "official", token: "" },
});

export const INFO = atom<StudentInfo | StaffInfo | null>({
  key: "info",
  default: null,
});
