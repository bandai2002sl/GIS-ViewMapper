import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store  } from "~/redux/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppProvider({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
        <div>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ToastContainer autoClose={3000} />
              {children}
            </Hydrate>
          </QueryClientProvider>
        </div>

    </Provider>
  );
}

export default AppProvider;
