import { atom } from "recoil";

export const USER = atom<"STUDENT" | "CHAPLAIN">({
  key: "user",
  //   default: "STUDENT",
  default: "CHAPLAIN",
});
