import { AUTH_DATA } from "@/atoms/atoms";
import PageLoader from "@/components/general/PageLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/constants/constants";
import { getStaffSections, startConversation } from "@/lib/api_helpers";
import { capitalize } from "@/lib/utils";
import { Official, StaffSections } from "@/types/chat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRecoilValue } from "recoil";

const StartConversation = () => {
  const { token, type } = useRecoilValue(AUTH_DATA);
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<StaffSections | null>(null);

  const officials = [
    ...(sections?.academics || []),
    ...(sections?.chaplains || []),
  ];

  useEffect(() => {
    (async () => {
      if (type === "official") push(PAGES.chat); // redirect to the chat page if they are an official

      setLoading(true);

      const { data, error } = await getStaffSections(token);

      setLoading(false);

      if (error) {
        toast.error(error);
        return;
      }

      setSections(data);
    })();
  }, []);

  if (loading) return <PageLoader type="small" />;

  return (
    <div className="flex flex-col pb-4">
      {officials.map((o, i) => (
        <OfficialComp o={o} key={i} />
      ))}
    </div>
  );
};

const OfficialComp = ({ o }: { o: Official }) => {
  // const name = o.email;
  const name = o.firstname + " " + o.lastname;
  const { token } = useRecoilValue(AUTH_DATA);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const start = async () => {
    setLoading(true);

    const { data, error } = await startConversation(token, o.id);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    push(PAGES.chat_page(data.id));
  };

  return (
    <div className="w-full hover:bg-gray-50 py-2 px-3 flex items-center justify-start gap-4 rounded-xl border border-transparent hover:border-gray-200">
      <Avatar>
        <AvatarImage
          src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${name}`}
          alt="avatar"
          className="border-2 border-main rounded-full"
        />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>

      <div className="mr-auto w-fit">
        <p className="font-medium text-main">{name}</p>
        <p className="text-sm">{capitalize(o.type)}</p>
      </div>

      <Button className="bg-main hover:bg-main/90 gap-2" onClick={start}>
        Start chat{" "}
        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </Button>
    </div>
  );
};

export default StartConversation;
