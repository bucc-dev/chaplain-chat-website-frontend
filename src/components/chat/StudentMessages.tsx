import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PAGES } from "@/constants/constants";
import Link from "next/link";
import { GoTriangleRight } from "react-icons/go";

const StudentMessages = () => {
  return (
    <div className="flex flex-col pb-4">
      {Array.from({ length: 20 }).map((a, i) => (
        <Link href={PAGES.chaplain_chat(`student-${i + 1}`)} key={i}>
          <div className="w-full hover:bg-gray-50 py-2 px-3 flex items-center justify-start gap-4 rounded-xl border border-transparent hover:border-gray-200">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Student${
                  i + 1
                }`}
                alt="avatar"
                className="border-2 border-main rounded-full"
              />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>

            <p className="font-medium mr-auto">Student {i + 1}</p>

            <GoTriangleRight className="text-ain" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StudentMessages;
