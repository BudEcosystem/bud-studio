import React from 'react';
import Head from 'next/head';
import { Button, ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ConfigProvider
        theme={{
          algorithm: theme['darkAlgorithm']
        }}
      >
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </React.Fragment>
  );
}

export default MyApp;
