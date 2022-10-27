// import "@styles/variables.less";
import { ApolloProvider } from "@apollo/client";
import { Layout } from "antd";
import apolloClient from "src/lib/apollo";
// import "@styles/global.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { useState } from "react";

import "src/utils/axios";
// require("@styles/global.less");

interface Props extends AppProps {
  auth: boolean;
  Component: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const [interval, setInterval] = useState(0);
  const Layout = Component.Layout || EmptyLayout;
  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <ApolloProvider client={apolloClient}>
        {
          //@ts-ignore
          Component?.auth ? (
            <HeaderProvider>
              <AppLayout>
                <Layout className="navbar">
                  <Component {...pageProps} />
                  {/* <RefreshTokenHandler setInterval={setInterval} /> */}
                </Layout>
              </AppLayout>
            </HeaderProvider>
          ) : (
            <Component {...pageProps} />
          )
        }
      </ApolloProvider>
    </SessionProvider>
  );
};

const EmptyLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default MyApp;
