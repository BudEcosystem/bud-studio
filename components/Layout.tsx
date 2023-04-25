import React, { useState, FunctionComponent } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import Link from "next/link";
import { withRouter, NextRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import OmniSearch from "../components/OmniSearch/OmniSearch";
import {
  DesktopOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const { Sider, Content } = Layout;

interface Router extends NextRouter {
  path: string;
  breadcrumbName: string;
}

interface Props extends WithRouterProps {
  router: Router;
}

function itemRender(route: Router) {
  return route.path === "index" ? (
    <Link href={"/"}>{route.breadcrumbName}</Link>
  ) : (
    <span>{route.breadcrumbName}</span>
  );
}

function routesMaker(pathsplit: string[]) {
  let routes = [
    {
      path: "index",
      breadcrumbName: "home",
    },
  ];
  for (let v of pathsplit) {
    const pathInfo = {
      path: v,
      breadcrumbName: v,
    };
    if (v !== "") routes.push(pathInfo);
  }
  return routes;
}

const AppLayout = (props: React.PropsWithChildren<Props>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onChangeIsCollapsed = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed);
  };

  const pathname = props.router.pathname;
  const pathsplit: string[] = pathname.split("/");
  const routes = routesMaker(pathsplit);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={onChangeIsCollapsed}
        // style={{minWidth:'12.552083333333334vw'}}
      >
        <Link href="/menu1">
          <div className="App-logo" />
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/menu1"]}
          selectedKeys={[pathsplit.pop()]}
          defaultOpenKeys={[pathsplit[1]]}
          mode="inline"
        >
          <Item key="menu1" icon={<DesktopOutlined />}>
            <Link href="/menu1">Dashboard</Link>
          </Item>
          <Item key="menu2" icon={<DashboardOutlined />}>
            <Link href="/menu2">Search</Link>
          </Item>
          <Item key="menu3" icon={<SettingOutlined />}>
            <Link href="/menu3">Notifications</Link>
          </Item>
        </Menu>
        <Menu
          style={{ marginTop: "10.897435897435898vh"}}
          theme="dark"
          defaultSelectedKeys={["/menu1"]}
          selectedKeys={[pathsplit.pop()]}
          defaultOpenKeys={[pathsplit[1]]}
          mode="inline"
        >
          <Item className="work-spaces" key="menu1" icon={<DesktopOutlined />}>
            <Link href="/workspaces">Work spaces</Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Breadcrumb
          style={{ margin: "16px 0" }}
          itemRender={itemRender}
          routes={routes}
        /> */}
        <Content
          style={{
            // padding: 16,
            minHeight: 280,
            // backgroundColor: "#ffffff",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
