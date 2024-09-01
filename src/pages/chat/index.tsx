import { USER } from "@/atoms/atoms";
import StudentMessages from "@/components/chat/StudentMessages";
import ChatTemplate from "@/components/chat/ChatTemplate";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const user = useRecoilValue(USER);

  return user === "STUDENT" ? (
    <ChatTemplate sender="STUDENT" />
  ) : (
    <StudentMessages />
  );
};

export default Chat;
