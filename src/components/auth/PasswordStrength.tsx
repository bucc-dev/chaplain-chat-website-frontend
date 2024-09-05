import { checkPasswordStrength } from "@/lib/utils";
import { PasswordStrengthProps } from "@/types/auth";
import { useState, useEffect } from "react";

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const [conditions, setConditions] = useState({
    hasMinChar: false,
    hasNum: false,
    hasSym: false,
    hasUpp: false,
  });

  useEffect(() => {
    const conds = checkPasswordStrength(password) as {
      hasMinChar: boolean;
      hasNum: boolean;
      hasSym: boolean;
      hasUpp: boolean;
    };

    setConditions(conds);
  }, [password]);

  return (
    <div className="flex gap-3 mt-2 flex-wrap text-sm">
      <p className={conditions.hasMinChar ? "text-green-600" : "text-red-600"}>
        At least 8 characters
      </p>
      <p className={conditions.hasNum ? "text-green-600" : "text-red-600"}>
        1 number
      </p>
      <p className={conditions.hasSym ? "text-green-600" : "text-red-600"}>
        1 symbol
      </p>
      <p className={conditions.hasUpp ? "text-green-600" : "text-red-600"}>
        1 uppercase letter
      </p>
    </div>
  );
};

export default PasswordStrength;
