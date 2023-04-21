import { Layout } from "antd";
import classes from "./dashboard.module.css";
import React, { useState } from "react";
import SideBar from "./sidebar";
import HeaderComp from "./header";
const { Content } = Layout;

export default function Dashboard(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={classes["main-layout"]}>
      <SideBar isCollapsed={collapsed} />
      <Layout className={classes["site-layout"]}>
        <HeaderComp
          slideFn={() => setCollapsed(!collapsed)}
          isCollapsed={collapsed}
        />
        <Content className={classes["site-layout-content"]}>
        {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
