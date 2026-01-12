import React, { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({
  children,
  className = "",
  id = "",
}: SectionProps) {
  return (
    <div className={`py-12 sm:py-16 ${className}`} id={id}>
      {children}
    </div>
  );
}
