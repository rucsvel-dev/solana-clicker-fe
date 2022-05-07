import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import SolanaProvider from "../src/providers/SolanaProvider";
import ProgramProvider from "../src/providers/ProgramProvider";

const darkTheme = createTheme({
  type: "dark",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <SolanaProvider>
        <ProgramProvider>
          <Component {...pageProps} />
        </ProgramProvider>
      </SolanaProvider>
    </NextUIProvider>
  );
}

export default MyApp;
