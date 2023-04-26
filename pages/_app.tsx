import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import "../styles/globals.css";
import "../styles/index.css";
import "../components/Layout.css";
import "../components/OmniSearch/OmniSearch.css"
import "../components/OmniSearch/SearchBar/SearchBar.css"
import "../components/OmniSearch/Panel/Panel.css";
import "../components/OmniSearch/Panel/PanelOption/PanelOption.css"
import "../components/OmniSearch/Panel/Button/Button.css"
//redux
import { store } from "../redux/store";
import { Provider } from "react-redux";
import OmniSearch from "../components/OmniSearch/OmniSearch";

const AppLayout = dynamic(() => import("../components/Layout"), { ssr: false });
const AppLayout2 = dynamic(() => import("../components/Dashboard/index"), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "var(--selected-color)",
          },
        }}
      >
        {" "}
        <AppLayout2>
          <Head>
            <title>NextJs Antdesign Typescript</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
          <OmniSearch />
        </AppLayout2>
      </ConfigProvider>
    </Provider>
  );
}