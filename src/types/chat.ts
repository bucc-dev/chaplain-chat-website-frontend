import React from "react";
import { AuthData } from "./auth";

export type TemplateProps = {
  children: React.ReactNode;
};

export type StudentInfo = {
  conversations: any[];
  id: string;
  username: string;
};

export type StaffInfo = {
  id: string;
  type: string;
  firstname: string;
  lastname: string;
  email: string;
  confirmed: boolean;
  conversations: any[];
};

export type StaffSections = {
  chaplains: Official[];
  academics: Official[];
};

export type Official = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  type: AuthData["type"];
};

export type Conversation = {
  id: string;
  studentId: string;
  staffId: string;
  messages: string[];
  timestamp: string;
};
