import { AUTH_DATA } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAutosizeTextArea } from "@/hooks/general";
import { saveRant } from "@/lib/api_helpers";
import { cn } from "@/lib/utils";
import { is } from "@/pages/_app";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRecoilValue } from "recoil";

const RantDialog = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { token } = useRecoilValue(AUTH_DATA);

  useAutosizeTextArea(textAreaRef.current, content);

  const save = async () => {
    setLoading(true);

    const { data, error } = await saveRant(token, content);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-xs md:text-sm bg-main text-white py-0.5 px-3 rounded-sm cursor-pointer">
          Rant
        </button>
      </DialogTrigger>
      <DialogContent className={cn("w-full border", is.className)}>
        <DialogHeader>
          <DialogTitle>New rant</DialogTitle>
        </DialogHeader>

        <div className="w-full flex items-center justify-center flex-col gap-4 my-2 h-auto max-h-[calc(100vh-10rem)] overflow-x-scroll p-0.5">
          <textarea
            className="w-full border-2 px-3 pb-3 py-2 outline-none focus-within:border-main rounded-md"
            ref={textAreaRef}
            value={content}
            placeholder="Type your rant here..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <DialogFooter className="flex flex-col justify-center gap-4 sm:gap-2">
          <Button
            className="bg-main font-normal text-white w-full max-w-[10rem] hover:bg-main/90 gap-2"
            disabled={loading}
            onClick={save}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RantDialog;
