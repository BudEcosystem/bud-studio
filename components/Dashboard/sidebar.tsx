import { Layout, Menu } from "antd";
import classes from "./dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const { Sider } = Layout;

interface SideBarProps {
  isCollapsed: boolean;
}

const sidebarOptions = [
  {
    key: "1",
    icon: (
      <Image
        src={"/images/other/dashboardIcon.png"}
        alt={"#"}
        width={14}
        height={14}
      />
    ),
    label: "Dashboard",
    link: "/menu1",
  },
  {
    key: "2",
    icon: (
      <Image
        src={"/images/other/search.png"}
        alt={"#"}
        width={14}
        height={14}
      />
    ),
    label: "Search",
    link: "/menu2",
  },
  {
    key: "3",
    icon: (
      <Image
        src={"/images/other/notificationIcon.png"}
        alt={"#"}
        width={18}
        height={18}
      />
    ),
    label: "Notifications",
    link: "/menu3",
  },
];

function SideBar({ isCollapsed }: SideBarProps) {
  const [activeClassName, setActiveClassName] = useState("0");

  return (
    <Sider
      width={240}
      className={classes["main-sidebar"]}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <div className={classes["logo"]}>
        <Image
          src={"/images/logo/logo.png"}
          alt={"Logo"}
          width={28}
          height={28}
        />
        <p>
          {isCollapsed ? (
            ""
          ) : (
            <Image
              src={"/images/logo/name.png"}
              alt={"Logo"}
              width={40}
              height={15}
            />
          )}
        </p>
      </div>
      <Menu
        className={classes["main-sidebar-menu-1"]}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        {sidebarOptions.map((menu, i) => (
          <Menu.Item
            className={`${
              classes[
                `${
                  i == +activeClassName
                    ? "sidebar-menu-items-active"
                    : "sidebar-menu-items"
                }`
              ]
            }`}
            key={i}
            icon={menu.icon}
            onClick={(e) => setActiveClassName(e.key)}
          >
            <Link href={menu.link}>{menu.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <Menu
        className={classes["main-sidebar-menu-2"]}
        theme="dark"
        mode="inline"
      >
        <Menu.Item
          className={`${classes["sidebar-work-spaces"]} ${classes["sidebar-menu-items"]}`}
          key="menu1"
          icon={
            <Image
              src={"/images/other/work-spaces.png"}
              alt={"#"}
              width={14}
              height={14}
            />
          }
        >
          <div className={classes["sidebar-work-spaces-box"]}>
            <Link href="/workspaces">Work spaces</Link>
            {isCollapsed ? null : (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("New");
                }}
                className={classes["sidebar-work-spaces-box-p"]}
              >
                New +
              </p>
            )}
          </div>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default SideBar;
