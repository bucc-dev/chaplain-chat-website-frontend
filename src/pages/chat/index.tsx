import { USER } from "@/atoms/atoms";
import ChaplainChat from "@/components/chat/ChaplainChat";
import StudentChat from "@/components/chat/StudentChat";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const user = useRecoilValue(USER);

  // the user atom will hold the type of user that is logged in
  // and it will be set from the ProtectedRoute component

  return user === "STUDENT" ? <StudentChat /> : <ChaplainChat />;
};

export default Chat;
