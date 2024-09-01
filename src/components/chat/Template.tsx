import { TemplateProps } from "@/types/chat";
import Image from "next/image";
// import { checkAuthentication } from "../hoc/ProtectedRoute";
import { IMAGES } from "@/constants/constants";
import { USER } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";

const DashboardTemplate = ({ children }: TemplateProps) => {
  const user = useRecoilValue(USER);

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

          <div className="flex gap-2 items-center justify-center">
            <p className="font-medium">CHAT</p>

            <p className="text-xs md:text-sm bg-main text-white py-0.5 px-1.5 rounded-sm">
              :{user.toLowerCase()}:
            </p>
          </div>

          <button
            className="text-sm py-1 px-2.5 rounded-md hover:bg-gray-100"
            // onClick={signOutUser}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="w-full min-h-[calc(100vh-4rem)]-hold h-auto px-4 pt-4 overflow-scroll flex items-center flex-col">
        <div className="w-full max-w-4xl min-h-full">{children}</div>
      </div>
    </section>
  );
};

export default DashboardTemplate;
// export default checkAuthentication(DashboardTemplate);
