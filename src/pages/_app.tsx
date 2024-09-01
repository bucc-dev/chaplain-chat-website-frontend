import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import { cn } from "@/lib/utils";
import { Instrument_Sans } from "next/font/google";
import { useRouter } from "next/router";
import Template from "@/components/chat/Template";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import ErrorMessage from "@/components/hoc/ErrorMessage";

export const is = Instrument_Sans({ display: "swap", subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  // the user atom will hold the type of user that is logged in
  // and it will be set from the ProtectedRoute component

  // there will be one login component, the chaplain's data will be created manually
  // and a type of CHAPLAIN will be assigned to it

  // the signup will only allow students to create account

  // the chat page will be dynamic and change based on the user
  // for the chaplain, it will be a list of their chats with the students
  // for the student, it will just be the chat interface that will show their chats with the chaplain

  // there will be a chat/[slug].tsx page that should only be accessible to the chaplain
  // the `slug` corresponds to a collection/document of chats with a student

  return (
    <RecoilRoot>
      <Toaster
        toastOptions={{
          className: is.className,
        }}
      />
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <main
          className={cn(
            "w-full min-h-screen flex items-center justify-center",
            is.className
          )}
        >
          <Head>
            <title>BCW</title>
          </Head>

          {pathname.includes("chat") ? (
            <Template>
              <Component {...pageProps} />
            </Template>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;
