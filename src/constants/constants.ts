export const BASE_URL = "https://chaplaincy-helpdesk.vercel.app";

export const BASE_API_URL = "https://chaplain-backend-test.onrender.com/api/v1";
export const BASE_STAFF_URL = `${BASE_API_URL}/staffs`;
export const BASE_STUDENT_URL = `${BASE_API_URL}/students`;

export const IMAGES = {
  logo: { src: "/logo.jpeg", w: 128, h: 140 },

  homepage: {
    care: { src: "/care.png", w: 350, h: 263 },
    hands: { src: "/hands.png", w: 350, h: 263 },
    hug: { src: "/hug.png", w: 400, h: 300 },
    joined_hands: { src: "/joined_hands.png", w: 300, h: 225 },
  },
};

export const PAGES = {
  staff: {
    login: "/auth/staff/login",
    signup: "/auth/staff/signup",
    verify: (email: string) => `/auth/staff/verify?email=${email}`,
  },
  student: { login: "/auth/student/login", signup: "/auth/student/signup" },
  // forgot_password: "/auth/forgot-password",

  home: "/",
  chat: "/chat",
  start_chat: "/chat/start",
  rants: "/chat/rants",
  chat_page: (slug: string) => `/chat/${slug}`,
};

export const MOCK_CHAT = [
  {
    timestamp: "2024-08-27T14:00:00Z",
    sender: "Alice",
    message: "Hey Bob! How's your day going?",
  },
  {
    timestamp: "2024-08-27T14:00:15Z",
    sender: "Bob",
    message:
      "Hey Alice! It's going well, just finished a meeting. How about you?",
  },
  {
    timestamp: "2024-08-27T14:01:00Z",
    sender: "Alice",
    message:
      "Pretty good! I’ve been working on that project we discussed last week. Got some good progress.",
  },
  {
    timestamp: "2024-08-27T14:01:30Z",
    sender: "Bob",
    message: "That's awesome! Any challenges so far?",
  },
  {
    timestamp: "2024-08-27T14:02:15Z",
    sender: "Alice",
    message:
      "A few, but nothing too difficult. Mostly just getting the UI right. I think it’s almost there though.",
  },
  {
    timestamp: "2024-08-27T14:02:45Z",
    sender: "Bob",
    message: "UI can be tricky. Let me know if you need a second pair of eyes.",
  },
  {
    timestamp: "2024-08-27T14:03:00Z",
    sender: "Alice",
    message:
      "Will do, thanks! How’s your end? Any updates on the new feature you were working on?",
  },
  {
    timestamp: "2024-08-27T14:03:30Z",
    sender: "Bob",
    message:
      "Yeah, we’re almost ready for testing. Just need to iron out a few bugs.",
  },
  {
    timestamp: "2024-08-27T14:04:00Z",
    sender: "Alice",
    message:
      "Great to hear! Let me know when you’re ready, I can help test if you need.",
  },
  {
    timestamp: "2024-08-27T14:04:30Z",
    sender: "Bob",
    message: "Will do! Thanks, Alice.",
  },
  {
    timestamp: "2024-08-27T14:05:00Z",
    sender: "Alice",
    message:
      "No problem. Anyway, I’ve got to hop on another call. Catch you later!",
  },
  {
    timestamp: "2024-08-27T14:05:15Z",
    sender: "Bob",
    message: "Alright, talk to you later. Take care!",
  },
];
