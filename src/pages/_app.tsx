import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import MainLayout from "@/components/layout/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <NextNProgress
        height={2}
        options={{ showSpinner: false }}
        color="white"
      />
      <Component {...pageProps} />
    </MainLayout>
  );
}
