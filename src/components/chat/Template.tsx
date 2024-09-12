import { TemplateProps } from "@/types/chat";
import { checkAuthentication } from "../hoc/ProtectedRoute";
import { PAGES } from "@/constants/constants";
import { AUTH_DATA } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signOutUser } from "@/lib/api_helpers";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import RantDialog from "./Rant";

const DashboardTemplate = ({ children }: TemplateProps) => {
  const auth_data = useRecoilValue(AUTH_DATA);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const signOut = async () => {
    setLoading(true);

    const { data, error } = await signOutUser(auth_data.token, auth_data.type);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    push(PAGES.home);
  };

  return (
    <section className="w-full min-h-screen flex items-center flex-col">
      <div className="w-full bg-white border-b p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl flex items-center justify-between gap-4">
          {/* <Image
            src={IMAGES.logo.src}
            width={IMAGES.logo.w}
            height={IMAGES.logo.h}
            alt="Logo"
            className="w-8"
            priority={true}
          /> */}
          <Link href={PAGES.chat} className="mr-auto">
            <div className="flex gap-2 items-center justify-center">
              <p className="font-medium">CHAT</p>

              <p className="text-xs md:text-sm bg-main text-white py-0.5 px-1.5 rounded-sm">
                :{auth_data.type}:
              </p>
            </div>
          </Link>

          <RantDialog />

          <Button
            onClick={signOut}
            disabled={loading}
            className="text-sm bg-transparent hover:bg-transparent text-black shadow-none px-0 gap-2"
          >
            Sign out{" "}
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        </div>
      </div>

      <div className="w-full min-h-[calc(100vh-4rem)]-hold h-auto px-4 pt-4 overflow-scroll flex items-center flex-col">
        <div className="w-full max-w-4xl min-h-full">{children}</div>
      </div>
    </section>
  );
};

export default checkAuthentication(DashboardTemplate);
