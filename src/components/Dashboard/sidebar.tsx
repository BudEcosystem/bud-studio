import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, Routes, To, useNavigate } from 'react-router-dom';
import KanbanMain from 'components/Kanaban/KanbanMain';
import classes from './dashboard.module.css';
import ContentView from './content';

const { Sider } = Layout;
interface SideBarProps {
  isCollapsed: boolean;
  setCollapsed: any;
}
const sidebarOptions = [
  {
    key: '1',
    icon: (
      <img
        src="/images/other/dashboardIcon.png"
        alt="#"
        width={14}
        height={14}
      />
    ),
    label: 'Dashboard',
    link: '/menuOne',
  },
  {
    key: '2',
    icon: <img src="/images/other/search.png" alt="#" width={14} height={14} />,
    label: 'Search',
    link: '/menuTwo',
  },
  {
    key: '3',
    icon: (
      <img
        src="/images/other/notificationIcon.png"
        alt="#"
        width={18}
        height={18}
      />
    ),
    label: 'Notifications',
    link: '/menuThree',
  },
];

function SideBar({ isCollapsed, setCollapsed }: SideBarProps) {
  const [activeClassName, setActiveClassName] = useState('0');
  const navigate = useNavigate();
  const navigateContent = (e: any, link: To) => {
    setActiveClassName(e.key);
    navigate(link);
  };
  return (
    <>
      <Sider
        width={240}
        className={classes['main-sidebar']}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
        <div className={classes.logo}>
          <img src="/images/logo/logo.png" alt="Logo" width={28} height={28} />
          <p>
            {isCollapsed ? (
              ''
            ) : (
              <img
                src="/images/logo/name.png"
                alt="Logo"
                width={40}
                height={15}
              />
            )}
          </p>
        </div>
        <Menu
          className={classes['main-sidebar-menu-1']}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          {sidebarOptions.map((menu, i) => (
            <Menu.Item
              className={`${
                classes[
                  `${
                    i === +activeClassName
                      ? 'sidebar-menu-items-active'
                      : 'sidebar-menu-items'
                  }`
                ]
              }`}
              key={i}
              icon={menu.icon}
              onClick={(e) => navigateContent(e, menu.link)}
            >
              {menu.label}
            </Menu.Item>
          ))}
        </Menu>
        <Menu
          className={classes['main-sidebar-menu-2']}
          theme="dark"
          mode="inline"
        >
          <Menu.Item
            onClick={(e) => navigateContent(e, '/workspaces')}
            className={`${classes['sidebar-work-spaces']} ${classes['sidebar-menu-items']}`}
            key="menu1"
            icon={
              <img
                src="/images/other/work-spaces.png"
                alt="#"
                width={14}
                height={14}
              />
            }
          >
            <div className={classes['sidebar-work-spaces-box']}>
              Work spaces
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
      <ContentView isCollapsed={isCollapsed} setCollapsed={setCollapsed}>
        <Routes>
          <Route path="/" element={<div>hello ******</div>} />
          <Route path="/menuTwo" element={<div>hello there</div>} />
          <Route path="/menuThree" element={<div>hello there</div>} />
        </Routes>
      </ContentView>
    </>
  );
}
export default SideBar;
