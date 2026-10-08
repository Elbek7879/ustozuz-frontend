"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authInputClass } from "@/components/AuthShell";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

// Parol maydoni: ko'z belgisi bilan kiritilgan parolni ko'rsatish/yashirish mumkin
export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={`${authInputClass} pr-12`} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Parolni yashirish" : "Parolni ko'rsatish"}
        className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-gray-600"
      >
        {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
