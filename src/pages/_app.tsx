import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: AppType = ({ pageProps, Component }) => {
  
  return (
    <QueryClientProvider client={queryClient}>

      <Component {...pageProps} />

    </QueryClientProvider>
  );
};

export default App;
