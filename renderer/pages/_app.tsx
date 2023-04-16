import React from "react";
import Head from "next/head";
import { Button, ConfigProvider, theme } from "antd";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "theme/global.css";
import "theme/editorjs.css";
import { DataProvider } from "context/StorageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //TODO: THEME PROVIDER IMPLEMENTATION
    <React.Fragment>
      <DataProvider>
        <ThemeProvider defaultTheme="dark">
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#181818",
                colorPrimaryBg: "#000000",
              },
              algorithm: theme["darkAlgorithm"],
            }}
          >
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </ConfigProvider>
        </ThemeProvider>
      </DataProvider>
    </React.Fragment>
  );
}

export default MyApp;
