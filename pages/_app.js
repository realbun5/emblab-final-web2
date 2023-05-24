import "@/styles/globals.css";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <title>Plantmeter</title>
                <link href="https://fonts.googleapis.com/css2?family=Aleo&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
