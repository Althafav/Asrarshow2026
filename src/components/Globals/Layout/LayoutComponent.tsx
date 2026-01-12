import React from "react";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";

export default function LayoutComponent({ children }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <MenuComponent />

      <main className="grow">{children}</main>
      
      <FooterComponent />
    </div>
  );
}
