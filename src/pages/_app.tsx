import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BooleanProvider } from "../contexts/BooleanContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BooleanProvider>
        <Component {...pageProps} />
      </BooleanProvider>
    </QueryClientProvider>
  );
}
