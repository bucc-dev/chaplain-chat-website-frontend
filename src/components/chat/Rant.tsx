import { Rant } from "@/types/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoTriangleRight } from "react-icons/go";
import { cn } from "@/lib/utils";
import { is } from "@/pages/_app";

const RantDialog = ({ r }: { r: Rant }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer hover:bg-gray-50 py-2 px-3 gap-4 rounded-xl border border-transparent hover:border-gray-200 grid grid-cols-10 items-center justify-center">
          <Avatar className="col-span-1">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${r.studentId}`}
              alt="avatar"
              className="border-2 border-main rounded-full"
            />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>

          <div className="col-span-8 w-full ml-2">
            <p className="font-medium mr-auto w-full truncate">{r.content}</p>

            <p className="text-main text-sm">
              {new Date(r.timestamp).toLocaleString()}
            </p>
          </div>

          <GoTriangleRight className="col-span-1" />
        </div>
      </DialogTrigger>
      <DialogContent className={cn("w-full border", is.className)}>
        <DialogHeader>
          <DialogTitle>Rant</DialogTitle>
          <DialogDescription>
            {new Date(r.timestamp).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex items-center justify-center flex-col gap-4 h-auto max-h-[calc(100vh-10rem)] overflow-x-scroll p-0.5">
          <p className="w-full text-left">{r.content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RantDialog;
