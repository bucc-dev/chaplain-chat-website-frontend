import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_CHAT } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { GoPaperAirplane } from "react-icons/go";

const Chat = () => {
  // put an event listener on the input that sends the message when 'enter' is clicked

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">
      <div className="w-full overflow-y-scroll h-full max-h-[calc(100vh-9.5rem)] flex flex-col gap-2">
        {MOCK_CHAT.map((m, i) => {
          const date_time = new Date(m.timestamp).toLocaleString();

          return (
            <div
              key={i}
              className={cn(
                "w-full max-w-sm",
                m.sender === "Bob" ? "self-start" : "self-end"
              )}
            >
              <p
                className={cn(
                  "p-3 w-full mb-1",
                  m.sender === "Bob"
                    ? "self-start bg-gray-100 rounded-e-xl rounded-t-xl"
                    : "self-end bg-main text-white rounded-s-xl rounded-t-xl"
                )}
              >
                {m.message}
              </p>

              <p
                className={cn(
                  "text-xs text-gray-400 w-full",
                  m.sender === "Bob" ? "text-left" : "text-right"
                )}
              >
                {date_time}
              </p>
            </div>
          );
        })}
      </div>

      <div className="w-full relative flex gap-2">
        <Input placeholder="Type a message..." />

        <Button className="bg-main hover:bg-main/90">
          <GoPaperAirplane />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
