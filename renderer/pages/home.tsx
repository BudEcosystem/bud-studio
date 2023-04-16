import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  readDirectory,
  createOrReplaceFile,
  readFileContent,
  deleteFileOrFolder,
} from "../utils/fs-utils";

import { retrieveSecret, storeSecret } from "../utils/fs-secrets";

import { Layout, Form, Select } from "antd";
import SideMenuLayout from "../components/layouts/side-menu-layout";
import BudImageEditor from "../components/BudImageEditor";

const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {
  useEffect(() => {
    console.log("Page Loaded");
    // store secret
    storeSecret("google-credentials", {
      username: "my-username",
      password: "my-password",
    });
    console.log("Secret stored", retrieveSecret("google-credentials"));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

      <SideMenuLayout>
      <a href="/projects/test/file">Page</a>
      </SideMenuLayout>

     
{/* 
      <BudImageEditor /> */}
    </React.Fragment>
  );
}

export default Home;
