import { AUTH_DATA } from "@/atoms/atoms";
import StudentMessages from "@/components/chat/StudentMessages";
import ChatTemplate from "@/components/chat/ChatTemplate";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const auth_data = useRecoilValue(AUTH_DATA);

  return auth_data.type === "student" ? (
    <ChatTemplate sender="STUDENT" />
  ) : (
    <StudentMessages />
  );
};

export default Chat;
