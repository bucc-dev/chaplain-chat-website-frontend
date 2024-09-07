import { AUTH_DATA } from "@/atoms/atoms";
import ChatTemplate from "@/components/chat/ChatTemplate";
import PageLoader from "@/components/general/PageLoader";
import { getConversation } from "@/lib/api_helpers";
import { ConversationWithMessageDetails } from "@/types/chat";
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

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data, error } = await getConversation(token, type, id as string);

      setLoading(false);

      if (error) {
        toast.error(error);
        return;
      }

      // console.log(data);
      setConversation(data);
    })();
  }, [id]);

  if (loading) return <PageLoader type="small" />;

  return <ChatTemplate convo={conversation!} />;
};

export default ChaplainChat;
