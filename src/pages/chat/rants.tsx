import { AUTH_DATA } from "@/atoms/atoms";
import RantDialog from "@/components/chat/Rant";
import PageLoader from "@/components/general/PageLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PAGES } from "@/constants/constants";
import { getRants } from "@/lib/api_helpers";
import { Rant } from "@/types/chat";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTriangleRight } from "react-icons/go";
import { useRecoilValue } from "recoil";

const Rants = () => {
  const { token, type } = useRecoilValue(AUTH_DATA);
  const [loading, setLoading] = useState(true);
  const [rants, setRants] = useState<Rant[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    if (type === "student") push(PAGES.chat);

    (async () => {
      setLoading(true);

      const { data, error } = await getRants(token);

      setLoading(false);

      if (error) {
        toast.error(error);
        return;
      }

      setRants(data);
    })();
  }, []);

  if (loading) return <PageLoader type="small" />;

  return (
    <div className="w-full max-w-4xl gap-4 grid grid-cols-1 md:grid-cols-2">
      {rants.map((r, i) => {
        return <RantDialog r={r} key={i} />;
      })}
    </div>
  );
};

export default Rants;
