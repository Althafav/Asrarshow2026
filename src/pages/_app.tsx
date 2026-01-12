import LayoutComponent from "@/components/Globals/Layout/LayoutComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </main>
  );
}
