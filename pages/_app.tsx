import "../styles/globals.css";
import type { AppProps } from "next/app";
import router from "next/router";
import { useCallback } from "react";
import NavBar from "./dashboard/components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
