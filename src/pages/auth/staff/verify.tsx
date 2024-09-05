import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeadTemplate from "@/components/general/HeadTemplate";
import { useRouter } from "next/router";
import { resendOtp, verifyOtp } from "@/lib/api_helpers";
import toast from "react-hot-toast";
import { PAGES } from "@/constants/constants";

const VerifyOtp = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const {
    query: { email },
    push,
  } = useRouter();
  const [timer, setTimer] = useState(60);
  const [reloadTimer, setReloadTimer] = useState("");

  const e = email ? email : emailAddress; // if there's an email in the address query, use it else use the one from the email input

  const verify = async () => {
    setLoading(true);

    const { data, error } = await verifyOtp(code, e as string);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    push(PAGES.staff.login);
  };

  const resend = async () => {
    const { data, error } = await resendOtp(e as string);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    setTimer(60);
    setReloadTimer(`code resent @ ${Date.now()}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [reloadTimer]);

  useEffect(() => setDisabled(timer > 0), [timer]);

  return (
    <>
      <HeadTemplate title="Verify OTP" />

      <div className="max-w-lg w-full bg-white p-4 rounded-lg border shadow-md">
        <p className="text-2xl font-medium mb-5">Verify OTP</p>

        {!email && (
          <>
            <p className="text-lg mb-1">Email address</p>
            <Input
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="john.doe@gmail.com"
              value={emailAddress}
            />
          </>
        )}

        <p className="text-lg mb-1 mt-4">Code</p>
        <Input
          onChange={(e) => setCode(e.target.value)}
          placeholder="A1B2C3D4"
          value={code}
        />

        <Button
          onClick={resend}
          disabled={disabled}
          className="text-main text-sm mt-3 bg-transparent hover:bg-transparent border-none shadow-none gap-2 px-0"
        >
          Resend code {timer > 0 && <p className="text-gray-400">{timer}s</p>}
        </Button>

        <Button
          disabled={loading}
          onClick={verify}
          className="w-full mt-4 bg-main hover:bg-main/90 py-2.5 text-white rounded-md flex items-center justify-center gap-2"
        >
          Verify OTP
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </Button>
      </div>
    </>
  );
};

export default VerifyOtp;
