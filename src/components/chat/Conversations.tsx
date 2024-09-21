import { AUTH_DATA } from "@/atoms/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PAGES } from "@/constants/constants";
import { getConversations } from "@/lib/api_helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTriangleRight } from "react-icons/go";
import { useRecoilValue } from "recoil";
import PageLoader from "../general/PageLoader";
import { ConversationWithMessageId } from "@/types/chat";
import { capitalize } from "@/lib/utils";

const Conversations = () => {
  const { token, type } = useRecoilValue(AUTH_DATA);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<
    ConversationWithMessageId[]
  >([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data, error } = await getConversations(token, type);

      setLoading(false);

      if (error) {
        toast.error(error);
        return;
      }

      setConversations(data);
    })();
  }, []);

  // console.log("66da11f75ebd7f981bcc5301".split("").filter(Number).join(""));

  if (loading) return <PageLoader type="small" />;

  return (
    <div className="flex flex-col pb-4">
      {conversations.map((c, i) => (
        <Link href={PAGES.chat_page(c.id)} key={i}>
          <div className="w-full hover:bg-gray-50 py-2 px-3 flex items-center justify-start gap-4 rounded-xl border border-transparent hover:border-gray-200">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${
                  type === "official" ? c.studentId : c.staff.id
                }`}
                alt="avatar"
                className="border-2 border-main rounded-full"
              />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>

            {type === "official" && (
              <p className="font-medium mr-auto">Student {c.studentId}</p>
            )}

            {type === "student" && (
              <div className="mr-auto">
                <p className="font-medium mr-auto">
                  {c.staff.firstname} {c.staff.lastname}
                </p>

                <p className="text-main">{capitalize(c.staff.type)}</p>
              </div>
            )}

            <GoTriangleRight />
          </div>
        </Link>
      ))}

      {conversations.length === 0 && (
        <p className="text-gray-400 w-full text-center">
          You have no conversations.
        </p>
      )}
    </div>
  );
};

export default Conversations;
