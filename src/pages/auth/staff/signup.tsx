import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useToggle } from "@/hooks/general";
import { Input } from "@/components/ui/input";
import { alreadyLoggedIn } from "@/components/hoc/ProtectedRoute";
import HeadTemplate from "@/components/general/HeadTemplate";
import { PAGES } from "@/constants/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { registerStaff } from "@/lib/api_helpers";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { StaffRegisterForm } from "@/types/auth";
import PasswordStrength from "@/components/auth/PasswordStrength";

const Signup = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [formData, setFormData] = useState<StaffRegisterForm>({
    email: "",
    password: "",
    full_name: "",
    type: "chaplain",
  });

  const updateFormData = (text: string, which: string) => {
    setFormData((k) => {
      return { ...k, [which]: text };
    });
  };

  const register = async () => {
    setLoading(true);

    const { data, error } = await registerStaff(formData);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    push(PAGES.staff.verify(formData.email));
  };

  return (
    <>
      <HeadTemplate title="Create an account" />

      <div className="max-w-lg w-full bg-white p-4 rounded-lg border shadow-md">
        <p className="text-2xl font-medium mb-5">Create a new account</p>

        <Tabs defaultValue={formData.type} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="chaplain"
              onClick={() => updateFormData("chaplain", "type")}
            >
              Chaplain
            </TabsTrigger>
            <TabsTrigger
              value="academics"
              onClick={() => updateFormData("academics", "type")}
            >
              Academics
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <p className="text-lg mb-1 mt-4">Full name</p>
        <Input
          onChange={(e) => updateFormData(e.target.value, "full_name")}
          placeholder="John Doe"
          value={formData.full_name}
        />

        <p className="text-lg mb-1 mt-4">Email address</p>
        <Input
          onChange={(e) => updateFormData(e.target.value, "email")}
          placeholder="john.doe@gmail.com"
          value={formData.email}
        />

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

        {formData.password && <PasswordStrength password={formData.password} />}

        <div className="mt-4 flex justify-between items-center flex-col lg:flex-row gap-2 text-sm">
          <p>
            Already have an account?{" "}
            <Link href={PAGES.staff.login} className="text-main">
              login
            </Link>
          </p>
        </div>

        <Button
          disabled={loading}
          onClick={register}
          className="w-full mt-4 bg-main hover:bg-main/90 py-2.5 text-white rounded-md flex items-center justify-center gap-2"
        >
          Create account
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </Button>
      </div>
    </>
  );
};

export default alreadyLoggedIn(Signup);
