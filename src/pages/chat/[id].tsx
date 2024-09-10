import { AUTH_DATA } from "@/atoms/atoms";
import ChatTemplate from "@/components/chat/ChatTemplate";
import PageLoader from "@/components/general/PageLoader";
import { getConversation } from "@/lib/api_helpers";
import {
  ConversationWithMessageDetails,
  StaffInfo,
  StudentInfo,
} from "@/types/chat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";

const ChaplainChat = () => {
  const { token, type } = useRecoilValue(AUTH_DATA);
  const {
    query: { id },
  } = useRouter();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] =
    useState<ConversationWithMessageDetails | null>(null);
  const [info, setInfo] = useState<StudentInfo | StaffInfo | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (id) {
        const { data, error } = await getConversation(
          token,
          type,
          id as string
        );

        setLoading(false);

        if (error) {
          toast.error(error);
          return;
        }

        setConversation(data?.conversation);
        if (data) setInfo(data.info);
      }
    })();
  }, [id, token, type]);

  if (loading) return <PageLoader type="small" />;

  return <ChatTemplate convo={conversation!} info={info} />;
};

export default ChaplainChat;
