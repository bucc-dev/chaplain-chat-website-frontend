import { AUTH_DATA, INFO } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import { StaffInfo, StudentInfo } from "@/types/chat";
import StaffInformation from "@/components/chat/StaffInformation";
import StudentInformation from "@/components/chat/StudentInformation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { FiPlus } from "react-icons/fi";
import Conversations from "@/components/chat/Conversations";
import { cn } from "@/lib/utils";

const Chat = () => {
  const { type } = useRecoilValue(AUTH_DATA);
  const info = useRecoilValue(INFO);

  return (
    <>
      <div className="my-6 w-full flex items-center justify-center flex-col gap-2">
        {type === "official" ? (
          <StaffInformation info={info as StaffInfo} />
        ) : (
          <StudentInformation info={info as StudentInfo} />
        )}
      </div>

      <div className="my-6 w-full flex items-center justify-center flex-col sm:flex-row gap-4">
        <p
          className={cn("font-medium", type === "student" ? "sm:mr-auto" : "")}
        >
          Conversations
        </p>

        {type === "student" && (
          <Link href={PAGES.start_chat}>
            <Button className="w-full bg-white hover:bg-white shadow-none p-0 text-main rounded-md flex items-center justify-center gap-2">
              <FiPlus /> Start new conversation
            </Button>
          </Link>
        )}
      </div>

      <Conversations />
    </>
  );
};

export default Chat;
