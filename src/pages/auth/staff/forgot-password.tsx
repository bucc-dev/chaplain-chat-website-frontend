import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeadTemplate from "@/components/general/HeadTemplate";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import toast from "react-hot-toast";
import { sendPasswordResetLink } from "@/lib/api_helpers";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendResetLink = async () => {
    setLoading(true);

    const { data, error } = await sendPasswordResetLink(email);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
  };

  return (
    <>
      <HeadTemplate title="Forgot password" />

      <div className="max-w-lg w-full bg-white p-4 rounded-lg border shadow-md">
        <p className="text-2xl font-medium mb-5">Send a password reset link</p>

        <p className="text-lg mb-1 mt-4">Email</p>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />

        <div className="mt-4 flex justify-between items-center flex-col lg:flex-row gap-2 text-sm">
          <Link href={PAGES.staff.login} className="text-main">
            Login
          </Link>
        </div>

        <Button
          disabled={loading}
          onClick={sendResetLink}
          className="w-full mt-4 bg-main hover:bg-main/90 py-2.5 text-white rounded-md flex items-center justify-center gap-2"
        >
          Send password reset link
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </Button>
      </div>
    </>
  );
};

export default ForgotPassword;
