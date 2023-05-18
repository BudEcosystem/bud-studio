/* eslint-disable react/no-array-index-key */
import { Fragment, useEffect, useRef, useState } from 'react';
import { Layout, Menu, Modal, Space } from 'antd';
import { Link, Route, Routes, To, useNavigate } from 'react-router-dom';
import {
  changeColor,
  createWorkspaces,
  editWorkspaceItem,
} from 'redux/slices/workspace';
import { useDispatch, useSelector } from 'react-redux';
import classes from './dashboard.module.css';
import ContentView from './content';
import WorkspaceMenuItem from './components/WorkspaceMenuItem';

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
  const dispatch = useDispatch();
  const { workspace }: any = useSelector((state) => state);
  const { workSpaceItems } = workspace;
  const [activeClassName, setActiveClassName] = useState('0');
  const [activeClassNameColor, setActiveClassNameColor] = useState(-1);
  const addWorkspaceInput = useRef(null);
  const [hex_code, setHex_code] = useState('#ffffff');
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  // const [workspaces, setWorkspaces] = useState([] as any);
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const [workspaceID, setWorkspaceID] = useState(-1);
  const [workspaceColor, setWorkspaceColor] = useState();
  const [workspaceName, setWorkspaceName] = useState();
  const [color, setColor] = useState('red');
  const [hoverColor, setHoverColor] = useState('#ffffff');
  const [hoverColorOnLeave, setHoverColoronLeave] = useState('#ffffff');
  const [workSpaceIndex, setWorkSpaceIndex] = useState(-1);

  const navigate = useNavigate();
  const navigateContent = (e: any, link: To) => {
    setActiveClassName(e.key);
    navigate(link);
    setActiveClassNameColor(-1);
  };

  const handlerColor = (menuColor: any, menuName: any, i: any) => {
    try {
      setActiveClassNameColor(i);
      setActiveClassName('-1');
      setColor(menuColor);
      setWorkSpaceIndex(i);
      showWorkspaceModal(menuColor, menuName);
      dispatch(changeColor(menuColor));
    } catch (err) {
      console.log(err);
    }
  };

  const setHoverColorHandler = (hovercolor: any) => {
    setHoverColor(hovercolor);
  };

  const setHoverColorOnLeave = (hovercolor: any) => {
    setHoverColoronLeave(hovercolor);
  };

  const boxStyle = {
    '--menuColor': color,
    '--menuHoverColor': hoverColor,
    '--menuHoverColorOnLeave': hoverColorOnLeave,
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

  useEffect(() => {
    setShowAddWorkspace(false);
  }, [isCollapsed]);

  // const addWorkspace = (event: any) => {
  //   if (event.key != 'Enter') return;
  //   if (event.target.value.trim() == '') return;

  //   let space = {
  //     name: event.target.value,
  //     color: hex_code,
  //   };
  //   workspaces.push(space);
  //   setWorkspaces(workspaces);
  //   setHex_code('#ffffff');
  //   setShowAddWorkspace(!showAddWorkspace);
  // };

  const updateWorkspace = (e: any) => {
    const { value, index }: any = e;
    // const workspacesTemp = workspaces;
    // workspacesTemp[index] = value;
    // setWorkspaces([...workspacesTemp]);
    dispatch(editWorkspaceItem({ index, value }));
  };
  const addNewWorkSpace = (e: any) => {
    if (e.value.name) {
      // const workspacesTemp = workspaces;
      // workspacesTemp.push(e.value);
      // setWorkspaces([...workspacesTemp]);
      dispatch(createWorkspaces(e.value));
      setShowAddWorkspace(false);
      console.log(...workSpaceItems);
    }
  };
  return (
    <>
      <Sider
        width={225}
        className={classes['main-sidebar']}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
        <div className={classes.sideBarItems}>
          <div className={classes.logo}>
            <img
              src="/images/logo/logo.png"
              alt="Logo"
              width={28}
              height={28}
            />
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
          <div className={classes.sidebarMenu}>
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
            <div className={classes.sidebarMenuTop}>
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
                        {showAddWorkspace ? 'New -' : 'New +'}
                      </p>
                    )}
                  </div>
                </Menu.Item>
                {/* {showAddWorkspace && (
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
                )} */}
                <Menu.Item
                  className={`${classes['sidebar-ws-fvrt']}`}
                  icon={
                    <img
                      src="/images/other/favourite-icon.png"
                      alt="#"
                      width={14}
                      height={14}
                    />
                  }
                >
                  <div className={`${classes['sidebar-inline-box']}`}>
                    <label>Favourites</label>
                    {isCollapsed ? null : (
                      <p style={{ marginLeft: '70px' }}>⌘ L</p>
                    )}
                  </div>
                </Menu.Item>

                <div className={`${classes['main-sidebar-menu-ws-box']}`}>
                  {workSpaceItems.length > 0 &&
                    workSpaceItems.map((menu: any, i: any) => (
                      <WorkspaceMenuItem
                        key={`wkp${i}`}
                        updateWorkspace={updateWorkspace}
                        menu={menu}
                        i={i}
                        isCollapsed={isCollapsed}
                        activeClassNameColor={activeClassNameColor}
                        boxStyle={boxStyle}
                        handlerColor={handlerColor}
                        setHoverColorHandler={setHoverColorHandler}
                        setHoverColorOnLeave={setHoverColorOnLeave}
                      />
                    ))}
                  {showAddWorkspace && (
                    <WorkspaceMenuItem
                      updateWorkspace={addNewWorkSpace}
                      menu={{ name: '', color: hex_code }}
                      isCollapsed={isCollapsed}
                      newWorkSpace
                      activeClassNameColor={activeClassNameColor}
                      boxStyle={boxStyle}
                      handlerColor={handlerColor}
                      setHoverColorHandler={setHoverColorHandler}
                      setHoverColorOnLeave={setHoverColorOnLeave}
                    />
                  )}
                </div>
              </Menu>

              {isCollapsed ? (
                <Menu
                  style={{ left: '-32px' }}
                  theme="dark"
                  mode="inline"
                  className={classes['main-sidebar-menu-3']}
                >
                  <Menu.Item
                    className={`${classes['sidebar-menu-userprofile']}`}
                    icon={
                      <div
                        className={`${classes['sidebar-menu-userprofile-profile']}`}
                      >
                        <img
                          src="/images/other/test-user.png"
                          alt="#"
                          width={25}
                          height={25}
                        />
                      </div>
                    }
                  >
                    <div
                      className={`${classes['sidebar-menu-userprofile-box']}`}
                    >
                      <span
                        className={`${classes['sidebar-menu-userprofile-details']}`}
                      >
                        <h1>Mark Louis</h1>
                        <p>@mark.ls</p>
                      </span>
                      {isCollapsed ? (
                        <img
                          style={{ marginLeft: '10px' }}
                          className="hover-effect"
                          src="/images/other/settings-icon.png"
                          alt="#"
                          width={15}
                          height={15}
                        />
                      ) : (
                        <img
                          className="hover-effect"
                          src="/images/other/settings-icon.png"
                          alt="#"
                          width={15}
                          height={15}
                        />
                      )}
                    </div>
                  </Menu.Item>
                </Menu>
              ) : (
                <Menu
                  theme="dark"
                  mode="inline"
                  className={classes['main-sidebar-menu-3']}
                >
                  <Menu.Item
                    className={`${classes['sidebar-menu-userprofile']}`}
                    icon={
                      <div
                        className={`${classes['sidebar-menu-userprofile-profile']}`}
                      >
                        <img
                          src="/images/other/test-user.png"
                          alt="#"
                          width={25}
                          height={25}
                        />
                      </div>
                    }
                  >
                    <div
                      className={`${classes['sidebar-menu-userprofile-box']}`}
                    >
                      <span
                        className={`${classes['sidebar-menu-userprofile-details']}`}
                      >
                        <h1>Mark Louis</h1>
                        <p>@mark.ls</p>
                      </span>

                      <img
                        className="hover-effect"
                        src="/images/other/settings-icon.png"
                        alt="#"
                        width={15}
                        height={15}
                      />
                    </div>
                  </Menu.Item>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </Sider>
      <ContentView
        isCollapsed={isCollapsed}
        setCollapsed={setCollapsed}
        workspaceName={workspaceName}
        workspaceColor={workspaceColor}
        workspaceModal={workspaceModal}
        workSpaceIndex={workSpaceIndex}
        setWorkspaceModal={setWorkspaceModal}
      >
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/menuTwo" element={<div />} />
          <Route path="/menuThree" element={<div />} />
        </Routes>
      </ContentView>
    </>
  );
}
export default SideBar;
