import { Button } from "@/components/ui/button";
import { IMAGES, PAGES } from "@/constants/constants";
import Link from "next/link";

const Home = () => {
  return (
    <section className="w-full max-w-5xl px-6 py-24 relative">
      <div className="mx-auto flex flex-col items-center justify-center gap-10 px-6 z-20">
        <h1 className="text-5xl font-bold text-center text-gray-900 leading-tight">
          Prioritize your <span className="text-main">mental health</span>
        </h1>

        <p className="max-w-xl text-lg text-center text-gray-700">
          You don&apos;t have to control your thoughts, you just have to stop
          letting them control you. Speak to someone and let them know
          what&apos;s on your mind. When a problem is discussed, its weight is
          reduced.
        </p>

        <div className="w-full flex gap-4 items-center justify-center flex-col sm:flex-row">
          <Link href={PAGES.chat} className="w-full max-w-xs">
            <Button className="bg-main hover:bg-main/90 w-full max-w-[20rem]">
              Talk to the chaplain
            </Button>
          </Link>
        </div>
      </div>

      <img
        src={IMAGES.homepage.care.src}
        alt="landing image"
        className="absolute top-0 right-0 w-40 rotate-[30deg] h-auto -z-10 opacity-0 lg:opacity-100"
      />
      <img
        src={IMAGES.homepage.hands.src}
        alt="landing image"
        className="absolute top-0 left-0 w-40 rotate-[-30deg] h-auto -z-10 opacity-0 lg:opacity-100"
      />
      <img
        src={IMAGES.homepage.hug.src}
        alt="landing image"
        className="absolute bottom-0 left-0 w-40 rotate-[-30deg] h-auto -z-10 opacity-0 lg:opacity-100"
      />
      <img
        src={IMAGES.homepage.joined_hands.src}
        alt="landing image"
        className="absolute bottom-0 right-0 w-40 rotate-[30deg] h-auto -z-10 opacity-0 lg:opacity-100"
      />
    </section>
  );
};

export default Home;
