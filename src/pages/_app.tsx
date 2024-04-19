import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "~/styles/globals.scss";
import "~/styles/custom.scss";
import "moment/locale/vi";
import "tippy.js/dist/tippy.css";

import { Fragment, ReactElement, ReactNode } from "react";

import type { AppProps } from "next/app";
import AppProvider from "~/contexts/AppProvider";
import Head from "next/head";
import { NextPage } from "next";
import Script from "next/script";
import SplashScreen from "~/components/layout/SplashScreen";
import trans from "~/locale/i18n";
import { useRouter } from "next/router";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const { locale } = router;
  trans.changeLanguage(locale);

  return (
    <Fragment>
      <Head>
        <title>Map</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale = 1.0"
        />
      </Head>
      <AppProvider pageProps={pageProps}>
        <SplashScreen />
        {getLayout(<Component {...pageProps} />)}
      </AppProvider>
    </Fragment>
  );
}
