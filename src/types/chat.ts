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

export type ConversationWithMessageId = {
  id: string;
  studentId: string;
  messages: string[];
  timestamp: string;
  staff: {
    firstname: string;
    id: string;
    lastname: string;
  };
};

export type ConversationWithMessageDetails = {
  id: string;
  studentId: string;
  messages: Message[];
  timestamp: string;
  staff: {
    firstname: string;
    id: string;
    lastname: string;
  };
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: string;
};

export type ChatTemplateProps = {
  convo: ConversationWithMessageDetails;
  info: StudentInfo | StaffInfo | null;
};
