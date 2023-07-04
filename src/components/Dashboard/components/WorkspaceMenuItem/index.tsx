/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import { Menu } from 'antd';
import { createRef, useEffect, useState } from 'react';
import classes from '../../dashboard.module.css';
import classWrksps from './workspaceMenuItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColor,
  editWorkspaceItem,
  setCurrentSelectedDocument,
} from 'redux/slices/workspace';
import {
  setCurrentSelectedUI,
  setSelectedOption,
  updateNavigationPath,
} from 'redux/slices/activestate';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function WorkspaceMenuItem({
  menu,
  i,
  isCollapsed,
  activeClassNameColor,
  boxStyle,
  handlerColor,
  setHoverColorHandler,
  setHoverColorOnLeave,
  updateWorkspace,
  newWorkSpace,
  setShowAddWorkspace,
}: any): JSX.Element {
  const clickListnRef: any = createRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const handleOnMenuClick = (
    e: any,
    color: any,
    name: any,
    index: number
  ): any => {
    if (clickListnRef.current) {
      clearTimeout(clickListnRef.current);
    }
    clickListnRef.current = setTimeout(() => {
      if (e.domEvent.detail === 2) {
        setIsEditMode(true);
      } else {
        handlerColor(menu.color, name, index);
      }
    }, 300);
  };
  const onUpdateWorkspace = (e: any) => {
    if (updateWorkspace) {
      updateWorkspace(e);
      if (!!e.value.name) {
        setIsEditMode(false);
      }
      if (!newWorkSpace) handlerColor(e.value.color, e.value.name, e.index);
    }
  };
  useEffect(() => {
    setIsEditMode(newWorkSpace);
  }, [newWorkSpace]);

  return isEditMode ? (
    <MenuWorkSpaceInput
      menu={menu}
      updateWorkspace={onUpdateWorkspace}
      index={i}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      setShowAddWorkspace={setShowAddWorkspace}
    />
  ) : (
    <MenuWorkSpaceItem
      menu={menu}
      i={i}
      isCollapsed={isCollapsed}
      activeClassNameColor={activeClassNameColor}
      boxStyle={boxStyle}
      handleOnMenuClick={handleOnMenuClick}
      setHoverColorHandler={setHoverColorHandler}
      setHoverColorOnLeave={setHoverColorOnLeave}
    />
  );
}
export default WorkspaceMenuItem;

function MenuWorkSpaceItem({
  menu,
  i,
  isCollapsed,
  activeClassNameColor,
  boxStyle,
  handleOnMenuClick,
  setHoverColorHandler,
  setHoverColorOnLeave,
}: any): JSX.Element {
  let { workspace, activestate } = useSelector((state) => state);
  let { currentWorkspace } = workspace;
  const { nodeIDs } = activestate;
  return (
    <Menu.Item
      className={`${
        classes[
          `${
            menu.uuid === currentWorkspace
              ? 'sidebar-workspaces-items-active'
              : 'sidebar-workspaces-items'
          }`
        ]
      }`}
      key={i}
      style={boxStyle}
      icon={
        !isCollapsed ? (
          <svg
            style={{ marginLeft: '22px' }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="14" height="14" rx="4" fill={menu.color} />
          </svg>
        ) : (
          <svg
            style={{ marginLeft: '10px' }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="14" height="14" rx="4" fill={menu.color} />
          </svg>
        )
      }
      onClick={(e) => handleOnMenuClick(e, menu.color, menu.name, i)}
      onMouseEnter={() => setHoverColorHandler(menu.color)}
      onMouseLeave={() => setHoverColorOnLeave(menu.color)}
    >
      <p className={classWrksps.workspaceInputLabel}>{menu.name}</p>
    </Menu.Item>
  );
}

function MenuWorkSpaceInput({
  menu,
  updateWorkspace,
  index,
  isEditMode,
  setIsEditMode,
  setShowAddWorkspace,
}: any) {
  const [workSpace, setWorkSpace] = useState({ name: '', color: '' });
  const [randCol, setRandCol] = useState(getRandomColor());
  const [editColor, setEditColor] = useState(menu.color);
  let { activestate, workspace } = useSelector((state) => state);
  const { nodeIDs } = activestate;
  const dispatch = useDispatch();
  useEffect(() => {
    document.getElementById('workspace-create-input')?.focus();
  }, []);
  useEffect(() => {
    setWorkSpace({ name: menu.name, color: randCol });
  }, [menu]);
  const workSpaceNameInputHandler = (e: any) => {
    setWorkSpace((prev: any) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };
  const workSpaceColorInputHandler = (e: any) => {
    setRandCol(e.target.value);
    setEditColor(e.target.value);
    setWorkSpace((prev: any) => {
      return {
        ...prev,
        color: e.target.value,
      };
    });
  };
  const workSpaceNameChangeHandler = (e: any) => {
    if (e.key === 'Enter' && !!e.target.value) {
      if (updateWorkspace) {
        const updObj = { ...workSpace, name: e.target.value };
        updateWorkspace({ value: updObj, index });
        console.log(menu, workspace);
        if (workspace.currentWorkspace === menu.uuid)
          dispatch(updateNavigationPath(e.target.value));
      }
    }
  };
  const onBlurHandler = () => {
    const updObj = { ...workSpace, color: editColor };
    // updateWorkspace({ value: updObj, index, editColor: true });
    dispatch(editWorkspaceItem({ index, value: updObj, editColor: true }));
    console.log(nodeIDs);
    dispatch(changeColor({ color: editColor }));
  };
  const onEscapeButtonPressed = (event) => {
    if (event.code === 'Escape') {
      setIsEditMode(false);
      setShowAddWorkspace(false);
    }
  };
  return (
    <Menu.Item
      icon={
        <div className={classWrksps.colorInputWrapper}>
          <svg
            style={{ marginLeft: '25px' }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill={workSpace.color}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <rect width="14" height="14" rx="4" fill={randCol} /> */}
            {menu.name ? (
              !isEditMode ? (
                <rect width="14" height="14" rx="4" fill={menu.color} />
              ) : (
                <rect width="14" height="14" rx="4" fill={editColor} />
              )
            ) : (
              <rect width="14" height="14" rx="4" fill={randCol} />
            )}
          </svg>
          <input
            type="color"
            name="hex_code"
            value={isEditMode ? editColor : randCol}
            onChange={workSpaceColorInputHandler}
            onBlur={onBlurHandler}
            className={classWrksps.colorInput}
          />
        </div>
      }
    >
      <input
        onKeyDown={onEscapeButtonPressed}
        id="workspace-create-input"
        type="text"
        placeholder="Enter space name"
        // onBlur={onBlurHandler}
        value={workSpace.name}
        onKeyUp={workSpaceNameChangeHandler}
        onInput={workSpaceNameInputHandler}
        className={classWrksps.workspaceTextBox}
      />
    </Menu.Item>
  );
}
