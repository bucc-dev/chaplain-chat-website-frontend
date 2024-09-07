import { AUTH_DATA } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_API_URL } from "@/constants/constants";
import { cn } from "@/lib/utils";
import {
  ChatTemplateProps,
  ConversationWithMessageDetails,
} from "@/types/chat";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { GoPaperAirplane } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";

const StudentChat = ({ convo, info }: ChatTemplateProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    ConversationWithMessageDetails["messages"]
  >(convo.messages);
  const scrollElement = useRef<HTMLSpanElement>(null);
  const { asPath } = useRouter();
  const { type, token } = useRecoilValue(AUTH_DATA);
  const [socket, setSocket] = useState<any>();

  const sendMessage = () => {
    if (!message) return;

    socket.emit("sendMessage", {
      receiverId: type === "official" ? convo.studentId : convo.staff.id,
      content: message,
      conversationId: asPath.split("/")[2],
      senderId: type === "official" ? convo.staff.id : convo.studentId,
    });

    setMessages((k) => [
      ...k,
      {
        id: "",
        conversationId: asPath.split("/")[2],
        senderId: type === "official" ? convo.staff.id : convo.studentId,
        receiverId: type === "official" ? convo.studentId : convo.staff.id,
        content: message,
        timestamp: new Date(Date.now()).toISOString(),
        status: "delivered",
      },
    ]);

    setMessage("");
  };

  useEffect(() => {
    scrollElement.current?.scrollIntoView({ behavior: "smooth" });

    const s = io(BASE_API_URL.replace("/api", ""), {
      auth: { token },
    });

    setSocket(s);
  }, []);

  useEffect(() => {
    socket.on("connect_error", (msg: any) => {
      // show an error message
    });

    socket.on("receiveMessage", (msg: any) => {
      setMessages((k) => [
        ...k,
        {
          id: "",
          conversationId: asPath.split("/")[2],
          senderId: type === "official" ? convo.staff.id : convo.studentId,
          receiverId: type === "official" ? convo.studentId : convo.staff.id,
          content: msg.content,
          timestamp: msg.timestamp,
          status: "delivered",
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

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
