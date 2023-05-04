import { useEffect, useRef, useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { Link, Route, Routes, To, useNavigate } from 'react-router-dom';
import KanbanMain from 'components/Kanaban/KanbanMain';
import classes from './dashboard.module.css';
import ContentView from './content';
import WorkspaceModal from 'components/WorkspaceModal/WorkspaceModal';

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
  const addWorkspaceInput = useRef(null);
  const [hex_code, setHex_code] = useState('#ffffff');
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [workspaces, setWorkspaces] = useState([] as any);
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const [workspaceColor, setWorkspaceColor] = useState();
  const [workspaceName, setWorkspaceName] = useState();

  const navigate = useNavigate();
  const navigateContent = (e: any, link: To) => {
    setActiveClassName(e.key);
    navigate(link);
  };

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.ctrlKey && event.key === 'n') {
        navigate('/menuOne');
        setActiveClassName('0');
      }
      if (event.ctrlKey && event.key === 'f') {
        navigate('/menuTwo');
        setActiveClassName('1');
      }
    }

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const showWorkspaceModal = (color: any, name: any) => {
    setWorkspaceModal(!workspaceModal);
    console.log('WORKSPACE PRESSED', workspaceModal);
    setWorkspaceColor(color);
    setWorkspaceName(name);
  };

  const handleOk = () => {
    setWorkspaceModal(false);
  };

  const handleCancel = () => {
    setWorkspaceModal(false);
  };

  useEffect(() => {
    setShowAddWorkspace(false);
  }, [isCollapsed]);

  const addWorkspace = (event: any) => {
    if (event.key != 'Enter') return;
    if (event.target.value.trim() == '') return;

    let space = {
      name: event.target.value,
      color: hex_code,
    };
    workspaces.push(space);
    setWorkspaces(workspaces);
    setHex_code('#ffffff');
    setShowAddWorkspace(!showAddWorkspace);
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

        <Modal
          style={{
            top: 250,
            right: 440,
          }}
          className="Modal"
          open={workspaceModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <WorkspaceModal name={workspaceName} color={workspaceColor} />
        </Modal>
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
              <label>Work spaces</label>
              {isCollapsed ? null : (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddWorkspace(!showAddWorkspace);
                  }}
                  className={classes['sidebar-work-spaces-box-p']}
                >
                  {showAddWorkspace ? 'X' : 'New +'}
                </p>
              )}
            </div>
          </Menu.Item>
          {showAddWorkspace && (
            <div className={classes['workspace-add']}>
              <input
                className={classes['workspace-add-color']}
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
          <Menu.Item
          className={`${classes["sidebar-ws-fvrt"]}`}
          icon={
            <img
              src={"/images/other/favourite-icon.png"}
              alt={"#"}
              width={14}
              height={14}
            />
          }
        >
          <div className={`${classes["sidebar-inline-box"]}`}>
            <label>Favourites</label>
            {isCollapsed ? null : (
                <p style={{marginLeft: "70px"}}>⌘ L</p>
              )}
          </div>
        </Menu.Item>

          <div className={`${classes['main-sidebar-menu-ws-box']}`}>
            {workspaces.length > 0 &&
              workspaces.map((menu: any, i: any) => (
                <Menu.Item
                  onClick={() => showWorkspaceModal(menu.color, menu.name)}
                  className={`${classes['sidebar-menu-item']}`}
                  key={i}
                  icon={ !isCollapsed ? 
                    <svg
                      style={{marginLeft : "25px"}}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="14" height="14" rx="4" fill={menu.color} />
                    </svg> : 
                      <svg
                      style={{marginLeft : "10px"}}
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
        </Menu>

       { isCollapsed ?
        <Menu style={{left: "-32px"}} theme="dark" mode="inline" className={classes['main-sidebar-menu-3']}>
        <Menu.Item
          className={`${classes["sidebar-menu-userprofile"]}`}
          icon={
            <div className={`${classes["sidebar-menu-userprofile-profile"]}`}>
              <img
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
              <h1>Mark Louis</h1>
              <p>@mark.ls</p>
            </span>
          {isCollapsed ? 
          <img
          style={{marginLeft: "10px"}}
          className="hover-effect"
          src={"/images/other/settings-icon.png"}
          alt={"#"}
          width={15}
          height={15}
        /> :
            <img
              className="hover-effect"
              src={"/images/other/settings-icon.png"}
              alt={"#"}
              width={15}
              height={15}
            /> }
          </div>
        </Menu.Item>
        </Menu>
        : 
        <Menu theme="dark" mode="inline" className={classes['main-sidebar-menu-3']}>
        <Menu.Item
          className={`${classes["sidebar-menu-userprofile"]}`}
          icon={
            <div className={`${classes["sidebar-menu-userprofile-profile"]}`}>
              <img
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
              <h1>Mark Louis</h1>
              <p>@mark.ls</p>
            </span>

            <img
              className="hover-effect"
              src={"/images/other/settings-icon.png"}
              alt={"#"}
              width={15}
              height={15}
            />
          </div>
        </Menu.Item>
        </Menu> }
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
