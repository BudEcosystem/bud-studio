import React, { useEffect } from 'react';
import Head from 'next/head';
import SideMenuLayout from '../components/layouts/side-menu-layout';


export default function Canvas() {

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

      <SideMenuLayout>
        HOME PAGE
      </SideMenuLayout>

    </React.Fragment>
  );
};

