import { atom } from "recoil";

export const USER = atom<"STUDENT" | "CHAPLAIN">({
  key: "user",
  //   default: "STUDENT",
  default: "CHAPLAIN",
});

export const AUTH_TOKEN = atom({
  key: "auth token",
  default: { type: "", token: "" },
});
