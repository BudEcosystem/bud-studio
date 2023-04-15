import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { readDirectory , createOrReplaceFile, readFileContent,deleteFileOrFolder} from '../utils/fs-utils';

import {retrieveSecret, storeSecret} from '../utils/fs-secrets';

import {
  Layout,
  Form,
  Select
} from 'antd';
import SideMenuLayout from '../components/layouts/side-menu-layout';

const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {

  useEffect(() => {

    console.log("Page Loaded");

    // Load the directory structure
    // const directoryPath = '/Users/rahulvramesh/Bud/Bud-Studiod/test';
    // const directoryStructure = readDirectory(directoryPath);
    // console.log(JSON.stringify(directoryStructure, null, 2));

    // Create a file
    // const filePath = '/Users/rahulvramesh/Bud/Bud-Studio/test-3/file.json';
    // const content = {ping: "pong"};
    // createOrReplaceFile(filePath, JSON.stringify(content));

    // Read the file
    // const contentRead = readFileContent(filePath);
    // console.log(contentRead);

    // delete file
    // const deletrResponse = deleteFileOrFolder(filePath);

    // store secret
    storeSecret('google-credentials', { username: 'my-username', password: 'my-password' });
    console.log("Secret stored",retrieveSecret('google-credentials'));


  },[]);

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

