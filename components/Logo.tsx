import { Shapes } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <img src="/Kush_Dept_Logo_Icon.png" alt="Logo" className="h-12 w-16
      " />
      <p className="text-3xl font-bold leading-tight tracking-tighter text-white">
        trackr
      </p>
    </a>
  );
}

export function LogoMobile() {
  return (
    <a href="/" className="flex items-center gap-2">
      <p className="text-3xl font-bold leading-tight tracking-tighter text-white">
        trackr
      </p>
    </a>
  );
}

export default Logo;