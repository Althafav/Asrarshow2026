import Link from "next/link";
import React from "react";

type CTAButtonProps = {
  buttonname: string;
  buttonlink?: string;
  isexternal?: "true" | "false";
  variant?: "Primary" | "Secondary" | "Outline";
};

export default function CTAButton({
  buttonname,
  buttonlink = "#",
  isexternal = "false",
  variant = "Primary",
}: CTAButtonProps) {
  const baseStyles = "px-8 py-2 font-semibold rounded transition duration-300";

  const Btnvariants = {
    Primary: "bg-gradient-primary text-black",
    Secondary: "bg-black text-white",
    Outline:
      "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };

  const target = isexternal === "true" ? "_blank" : "_self";

  return (
    <a
      target={target}
      href={buttonlink}
      className={`rounded-full ${baseStyles} ${Btnvariants[variant]}`}
    >
      {buttonname}
    </a>
  );
}
