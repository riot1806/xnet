import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import MainLayout from "@/components/layout/MainLayout";
import { CartProvider } from "react-use-cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <MainLayout>
        <NextNProgress
          height={2}
          options={{ showSpinner: false }}
          color="white"
        />
        <Component {...pageProps} />
      </MainLayout>
    </CartProvider>
  );
}
