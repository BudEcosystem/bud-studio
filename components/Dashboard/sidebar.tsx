import { Layout, Menu } from "antd";
import classes from "./dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
    subIcon: "⌘ N",
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
    subIcon: "⌘ F",
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
  const addWorkspaceInput = useRef(null);

  const [hex_code, setHex_code] = useState("#ffffff");
  const [activeClassName, setActiveClassName] = useState("0");
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    setShowAddWorkspace(false);
  }, [isCollapsed]);

  const addWorkspace = (event) => {
    if (event.key != "Enter") return;
    if (event.target.value.trim() == "") return;

    let space = {
      name: event.target.value,
      color: hex_code,
    };
    workspaces.push(space);
    setWorkspaces(workspaces);
    setHex_code("#ffffff");
    setShowAddWorkspace(!showAddWorkspace);
  };

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
            <div className={classes["sidebar-inline-box"]}>
              <Link href={menu.link}>{menu.label}</Link>
              <p>{menu?.subIcon}</p>
            </div>
          </Menu.Item>
        ))}

        <div className={classes["main-sidebar-menu-2"]}>
          <Menu.Item
            className={`${classes["sidebar-work-spaces"]}`}
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
              <label>Work spaces</label>
              {isCollapsed ? null : (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddWorkspace(!showAddWorkspace);
                  }}
                  className={classes["sidebar-work-spaces-box-p"]}
                >
                  {showAddWorkspace ? "X" : "New +"}
                </p>
              )}
            </div>
          </Menu.Item>
          {showAddWorkspace && (
            <div className={classes["workspace-add"]}>
              <input
                className={classes["workspace-add-color"]}
                type="color"
                name="hex_code"
                value={hex_code}
                defaultValue={hex_code}
                onChange={(e) => setHex_code(e.target.value)}
              />
              <input
                type="text"
                placeholder="Space name"
                ref={addWorkspaceInput}
                onKeyUp={(event) => addWorkspace(event)}
              />
            </div>
          )}
        </div>
        <Menu.Item
          className={`${classes["sidebar-ws-fvrt"]}`}
          icon={
            <Image
              src={"/images/other/favourite-icon.png"}
              alt={"#"}
              width={14}
              height={14}
            />
          }
        >
          <div className={`${classes["sidebar-inline-box"]}`}>
            <label>Favourites</label>
            <p>⌘ L</p>
          </div>
        </Menu.Item>
        <div className={`${classes["main-sidebar-menu-ws-box"]}`}>
          {workspaces.length > 0 &&
            workspaces.map((menu, i) => (
              <Menu.Item
                className={`${classes["sidebar-menu-item"]}`}
                key={i}
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="14" height="14" rx="4" fill={menu.color} />
                  </svg>
                }
              >
                {/* <Link href={menu.link}>{menu.label}</Link> */}
                <p>{menu.name}</p>
              </Menu.Item>
            ))}
        </div>
        <Menu.Item
          className={`${classes["sidebar-menu-userprofile"]}`}
          icon={
            <div className={`${classes["sidebar-menu-userprofile-profile"]}`}>
              <Image
                src={"/images/other/test-user.png"}
                alt={"#"}
                width={25}
                height={25}
              />
            </div>
          }
        >
          <div className={`${classes["sidebar-menu-userprofile-box"]}`}>
            <span className={`${classes["sidebar-menu-userprofile-details"]}`}>
              <h1>Test</h1>
              <p>email</p>
            </span>

            <Image
              className="hover-effect"
              src={"/images/other/settings-icon.png"}
              alt={"#"}
              width={15}
              height={15}
            />
          </div>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
