/* eslint-disable @next/next/no-img-element */
import React, { Fragment, ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";

const App = () => {
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Home.home")}</title>
      </Head>
      <div>
        <img
          src="/images/trangchu.png" 
          alt="Mô tả của Hình ảnh"
          width="1300" 
          height="760"
        />
      </div>
    </Fragment>
  );
};

App.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default App;
