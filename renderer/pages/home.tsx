import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Layout,
  Form,
  Select
} from 'antd';
import SideMenuLayout from '../components/layouts/side-menu-layout';

const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

      <SideMenuLayout></SideMenuLayout>

    </React.Fragment>
  );
};

export default Home;
