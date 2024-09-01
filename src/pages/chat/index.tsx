import { USER } from "@/atoms/atoms";
import ChaplainChat from "@/components/chat/ChaplainChat";
import StudentChat from "@/components/chat/StudentChat";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const user = useRecoilValue(USER);

  return user === "STUDENT" ? <StudentChat /> : <ChaplainChat />;
};

export default Chat;
