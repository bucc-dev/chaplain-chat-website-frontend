import { INFO } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_API_URL } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { ConversationWithMessageDetails } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import { GoPaperAirplane } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";

const socket = io(BASE_API_URL.replace("/api", ""));

const StudentChat = ({ convo }: { convo: ConversationWithMessageDetails }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    ConversationWithMessageDetails["messages"]
  >(convo.messages);
  const info = useRecoilValue(INFO);
  const scrollElement = useRef<HTMLSpanElement>(null);

  const sendMessage = () => {
    if (!message) return;

    alert(message);
    setMessage("");
  };

  useEffect(() => {
    scrollElement.current?.scrollIntoView({ behavior: "smooth" });

    socket.on("message", (msg) => {
      setMessages((k) => [...k, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">
      <div className="w-full overflow-y-scroll h-full max-h-[calc(100vh-7rem)] flex flex-col gap-2">
        {messages.map((m, i) => {
          const date_time = new Date(m.timestamp).toLocaleString();

          return (
            <div
              key={i}
              className={cn(
                "w-full max-w-sm",
                m.receiverId === info?.id ? "self-start" : "self-end"
              )}
            >
              <p
                className={cn(
                  "p-3 w-full mb-1",
                  m.receiverId === info?.id
                    ? "self-start bg-gray-100 rounded-e-xl rounded-t-xl"
                    : "self-end bg-main text-white rounded-s-xl rounded-t-xl"
                )}
              >
                {m.content}
              </p>

              <p
                className={cn(
                  "text-xs text-gray-400 w-full",
                  m.receiverId === info?.id ? "text-left" : "text-right"
                )}
              >
                {date_time}
              </p>
            </div>
          );
        })}
        <span ref={scrollElement} />
      </div>

      <div className="w-full relative flex gap-2">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />

        <Button className="bg-main hover:bg-main/90" onClick={sendMessage}>
          <GoPaperAirplane />
        </Button>
      </div>
    </div>
  );
};

export default StudentChat;
