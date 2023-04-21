import { Layout } from "antd";
import classes from "./dashboard.module.css";
import React, { useState } from "react";
import SideBar from "./sidebar";
import HeaderComp from "./header";
import Image from "next/image";
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
          <div className={classes["site-layout-common-menu"]}>
            <Image
              className="hover-effect"
              src={"/images/other/launcher-icon.png"}
              alt={"#"}
              width={30}
              height={30}
            />
            <Image
              className="hover-effect"
              src={"/images/logo/name.png"}
              alt={"#"}
              width={50}
              height={20}
            />
            <Image
              className="hover-effect"
              src={"/images/other/pitch-icon.png"}
              alt={"#"}
              width={20}
              height={20}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
