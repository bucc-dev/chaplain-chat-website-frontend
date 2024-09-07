import { useRouter } from "next/router";
import { useState, useEffect, JSX } from "react";
import { PAGES } from "@/constants/constants";
import PageLoader from "../general/PageLoader";
import { AuthData } from "@/types/auth";
import { useSetRecoilState } from "recoil";
import { AUTH_DATA } from "@/atoms/atoms";

// Check if user is logged in
export const checkAuthentication = (ProtectedComponent: any) => {
  return function CheckIfTheUserIsLoggedIn(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const setAuthData = useSetRecoilState(AUTH_DATA);
    const { push } = useRouter();

    useEffect(() => {
      const { expires_at, token, type }: AuthData = JSON.parse(
        localStorage.getItem("auth-data") || "{}"
      );

      // if the token has expired, push to login page
      if (expires_at <= Date.now()) {
        push(type === "official" ? PAGES.staff.login : PAGES.student.login);
        return;
      }

      setAuthData({ token, type });
      push(PAGES.chat);

      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};

// Prevents already logged in user access to auth modals
export const alreadyLoggedIn = (ProtectedComponent: () => JSX.Element) => {
  return function StopLoggedInUsersAccessToAuthModals(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const setAuthData = useSetRecoilState(AUTH_DATA);
    const { push } = useRouter();

    useEffect(() => {
      const { expires_at, token, type }: AuthData = JSON.parse(
        localStorage.getItem("auth-data") || "{}"
      );

      // if the token has not expired, push to chat page
      if (expires_at > Date.now()) {
        setAuthData({ token, type });

        push(PAGES.chat);
      }

      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};
