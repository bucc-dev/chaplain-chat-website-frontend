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
          You don&apos;t need to control your thoughts; you just need to stop
          letting them control you. If you&apos;re facing academic challenges or
          struggling with your mental health, don&apos;t hesitate to talk to
          someone. Sharing your concerns can lighten the burden and help you
          find support.
        </p>

        <div className="w-full flex gap-4 items-center justify-center flex-col sm:flex-row">
          <Link href={PAGES.student.login} className="w-full max-w-[15rem]">
            <Button className="bg-main hover:bg-main/90 w-full">
              Talk to someone
            </Button>
          </Link>
          {/* <Link href={PAGES.staff.login} className="w-full max-w-[15rem]">
            <Button className="bg-main hover:bg-main/90 w-full">
              Staff login
            </Button>
          </Link> */}
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
