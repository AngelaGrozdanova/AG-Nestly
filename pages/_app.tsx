import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import Navbar from "./components/navbar/Navbar";

import { SessionProvider } from "next-auth/react";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
}
