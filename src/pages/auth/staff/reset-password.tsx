import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useToggle } from "@/hooks/general";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeadTemplate from "@/components/general/HeadTemplate";
import { PAGES } from "@/constants/constants";
import { updatePassword } from "@/lib/api_helpers";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { checkPasswordStrength } from "@/lib/utils";

const ResetPassword = () => {
  const {
    query: { token },
    push,
  } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const updateFormData = (text: string, which: string) => {
    setFormData((k) => {
      return { ...k, [which]: text };
    });
  };

  const reset = async () => {
    if (!checkPasswordStrength(formData.password, true)) {
      toast.error("Please enter a valid password.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Your passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await updatePassword(
      formData.password,
      token as string
    );

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    push(PAGES.staff.login);
  };

  return (
    <>
      <HeadTemplate title="Reset password" />

      <div className="max-w-lg w-full bg-white p-4 rounded-lg border shadow-md">
        <p className="text-2xl font-medium mb-5">Reset your password</p>

        <p className="text-lg mt-4 mb-1">Password</p>
        <div className="relative flex items-center justify-center">
          <Input
            onChange={(e) => updateFormData(e.target.value, "password")}
            placeholder="•••••••••••••"
            value={formData.password}
            type={showPassword ? "text" : "password"}
          />
          <button
            className="absolute right-2 text-main"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <LuEyeOff className="text-lg" />
            ) : (
              <LuEye className="text-lg" />
            )}
          </button>
        </div>

        <p className="text-lg mt-4 mb-1">Confirm password</p>
        <div className="relative flex items-center justify-center">
          <Input
            onChange={(e) => updateFormData(e.target.value, "confirm_password")}
            placeholder="•••••••••••••"
            value={formData.confirm_password}
            type={showPassword ? "text" : "password"}
          />
          <button
            className="absolute right-2 text-main"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <LuEyeOff className="text-lg" />
            ) : (
              <LuEye className="text-lg" />
            )}
          </button>
        </div>

        {formData.password && <PasswordStrength password={formData.password} />}

        <div className="mt-4 flex justify-between items-center flex-col lg:flex-row gap-2 text-sm">
          <Link href={PAGES.staff.login} className="text-main">
            Login
          </Link>
        </div>

        <Button
          disabled={loading}
          onClick={reset}
          className="w-full mt-4 bg-main hover:bg-main/90 py-2.5 text-white rounded-md flex items-center justify-center gap-2"
        >
          Update password
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </Button>
      </div>
    </>
  );
};

export default ResetPassword;
