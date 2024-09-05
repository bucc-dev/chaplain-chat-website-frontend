import { AuthData } from "@/types/auth";
import { atom } from "recoil";

export const AUTH_DATA = atom<{ type: AuthData["type"]; token: string }>({
  key: "auth token",
  default: { type: "official", token: "" },
});
