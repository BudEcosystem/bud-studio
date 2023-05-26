import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColorAndSetName,
  createDoc,
  createFolder,
  createSubChild,
  deleteItem,
  renameItem,
  setCurrentSelectedDocument,
} from 'redux/slices/workspace';
import { disableCreateNewTreeNode } from 'redux/slices/tree';
import FlyoutMenu from 'components/WorkspaceModal/FlyoutMenu';
import { DocIcon, FolderIcon } from 'components/WorkspaceModal/WorkspaceIcons';
import { UpArrow } from '../../../OmniSearch/Panel/PanelOption/PanelSvgIcons';
import { Folder, Page } from './TreeSvgIcons';
import {
  setCurrentSelectedUI,
  setNodeIDs,
  setSelectedOption,
} from 'redux/slices/activestate';

import './Tree.css';

function Tree({
  data = [],
  setShowColorDots,
  showDocumentOptions,
  setShowDocumentOptions,
  addedNode,
  workSpaceDetails,
}: any) {
  const { tree: treeState }: any = useSelector((state) => state);
  const [isDocCreateVisible, setIsDocCreateVisible] = useState(false);
  const [isFolderCreateVisible, setIsFolderCreateVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    if (data) {
      console.log('inside tree', data);
      if (data.length > 0) {
        setTreeData(data);
      }
    }
  }, [data]);
  useEffect(() => {
    console.log('createNewClickHandler - hsgvhs', treeState);
    const { createNewTreeFolder, createNewTreeDocument } = treeState;
    setIsDocCreateVisible(createNewTreeDocument);
    setIsFolderCreateVisible(createNewTreeFolder);
  }, [treeState]);
  const [activeNode, setActiveNode] = useState(null);
  const handleNodeClick = (node) => {
    console.log('Active Node', node);

    if (activeNode === node) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
    }
  };
  const inputRefFolder = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRefDoc = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();
  useEffect(() => {
    const inputDoc = document.getElementById(`newTreeDocInput`);
    const inputFolder = document.getElementById(`newTreeFolderInput`);
    inputDoc?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        if (inputRefDoc.current?.value) {
          event.preventDefault();
          console.log(inputRefDoc.current?.value, 'Doc');
          dispatch(
            createDoc({
              workSpaceDetails,
              name: inputRefDoc.current?.value,
            })
          );
          dispatch(disableCreateNewTreeNode({ type: 'doc' }));
        }
      }
    });
    inputFolder?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        if (inputRefFolder.current?.value) {
          event.preventDefault();
          console.log(inputRefFolder.current?.value, 'Folder');
          dispatch(
            createFolder({
              workSpaceDetails,
              name: inputRefFolder.current?.value,
            })
          );
          dispatch(disableCreateNewTreeNode({ type: 'folder' }));
        }
      }
    });
  });
  useEffect(() => {
    document.getElementById('newTreeFolderInput')?.focus();
    document.getElementById('newTreeDocInput')?.focus();
  });
  const onEscapeButtonPressed = (event) => {
    if (event.code === 'Escape') {
      setIsFolderCreateVisible(false);
      setIsDocCreateVisible(false);
      dispatch(disableCreateNewTreeNode({ type: 'doc' }));
      dispatch(disableCreateNewTreeNode({ type: 'folder' }));
    }
  };
  return (
    <div className="treeViewContainer">
      {isFolderCreateVisible && (
        <div className="treeViewContainerDocInputWrapper">
          <Folder
            fill={workSpaceDetails.color}
            stroke={workSpaceDetails.color}
          />
          <input
            onKeyDown={onEscapeButtonPressed}
            className="treeViewContainerDocInput"
            ref={inputRefFolder}
            id="newTreeFolderInput"
          />
        </div>
      )}
      {isDocCreateVisible && (
        <div className="treeViewContainerDocInputWrapper">
          <DocIcon />
          <input
            onKeyDown={onEscapeButtonPressed}
            className="treeViewContainerDocInput"
            ref={inputRefDoc}
            id="newTreeDocInput"
          />
        </div>
      )}
      {treeData.length === 0 && (
        <div className="no-items">Start by creating new doc</div>
      )}
      <ul className="treeViewList">
        {treeData.map((tree: any, i) => (
          <TreeNode
            key={tree.tId + i}
            node={tree}
            isFirst={i === i}
            isVisible={tree?.filterApplied ? tree.searchMatch : true}
            isActive={activeNode === tree}
            onClick={handleNodeClick}
            addedNode={(e, newNode) => addedNode(e ?? tree, newNode)}
            activeNode
            showDocumentOptions={showDocumentOptions}
            setShowDocumentOptions={setShowDocumentOptions}
            setShowColorDots={setShowColorDots}
            workSpaceDetails={workSpaceDetails}
          />
        ))}
      </ul>
    </div>
  );
}

function TreeNode({
  node,
  isFirst,
  isActive,
  onClick,
  activeNode,
  isVisible,
  showDocumentOptions,
  setShowDocumentOptions,
  setShowColorDots,
  addedNode,
  workSpaceDetails,
}: any) {
  const [childVisible, setChildVisiblity] = useState(!node.isParent);
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const hasChild = !!node.children;
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [addItemConfig, setAddItemConfig] = useState({ type: 'folder' });
  const isParentStyle = {
    background: `linear-gradient(90.28deg, ${`${color}20`} 4.88%, rgba(17, 21, 18, 0) 91.54%)`,
    borderRadius: '10px',
    cursor: 'pointer',
    '::after': 'border-bottom: 0px',
  };
  const toggleChildVisibility = () => {
    node.isParent ? setChildVisiblity((v) => !v) : setChildVisiblity(true);
    onClick(node);
  };

  const showFlyOut = (e: any) => {
    e.stopPropagation();
    setShowDocumentOptions(!showDocumentOptions);
    setShowColorDots(false);
  };
  const [toggleFlyout, setToggleFlyout] = useState(false);
  const addNewMenu = (node: any, newNode: any) => {
    if (addedNode && !!newNode.label) {
      addedNode(node, newNode);
    }
    setAddMode(false);
  };
  const activateAddmode = (e) => {
    e.stopPropagation();
    setToggleFlyout((prev) => !prev);
  };
  const newMenuAddHandler = (newNode: any) => {
    console.log('Add New Menu', newNode);
    if (addNewMenu) {
      addNewMenu(node, newNode);
    }
    setAddMode(false);
  };
  const addNewItem = (type: any) => {
    setAddItemConfig({ type });
    setAddMode(true);
    setToggleFlyout(false);
    setChildVisiblity(true);
  };
  const onRenameHandler = () => {
    setEditMode(true);
  };
  const onDeleteHandler = () => {
    const { uuid, type } = node;
    dispatch(deleteItem({ uuid, isFolder: type === 'folder' }));
  };
  return (
    isVisible && (
      <li className="treeLiItem">
        {toggleFlyout && (
          <FlyoutMenu
            onRenameHandler={onRenameHandler}
            createNewClickHandler={addNewItem}
            setToggleFlyout={setToggleFlyout}
            onDeleteHandler={onDeleteHandler}
            isFolder={node.type === 'folder'}
          />
        )}
        <div
          className={`treeList${isFirst ? ' first' : ''} tree-header`}
          style={node.isParent && childVisible ? isParentStyle : {}}
          onClick={toggleChildVisibility}
        >
          {/* {hasChild && node.isParent && (
          <div className={`arrow ${childVisible ? 'active' : ''}`}>
            <UpArrow stroke={`${childVisible ? color : '#7B8388'}`} />
          </div>
        )} */}
          {/* <div className="folderImgContainer"> */}

          {/* {childVisible && node.isParent ? (
            <Folder fill={color} stroke={color} />
          ) : !childVisible && node.isParent ? (
            <WhiteFolder />
          ) : (
            <Page />
          )}
        </div>

        <div className="treeLabel">{node.label}</div> */}

          {/* {childVisible && node.isParent && <div onClick={showFlyOut} className="plus">+</div>} */}
          {/* <div onClick={() => addNewMenu(node,newNodeState)} className="plus">+</div> */}
          {/* <div onClick={showFlyOut} className="plus">+</div> */}
          {editMode ? (
            <ListItem
              color={color}
              label={node.label}
              uuid={node.uuid}
              isFolder={node.type === 'folder'}
              childVisible={childVisible}
              isParent={node.isParent}
              isEdit={editMode}
              setIsEditMode={(e) => setEditMode(e)}
              workSpaceDetails={workSpaceDetails}
            />
          ) : (
            <ListItem
              color={color}
              uuid={node.uuid}
              label={node.label}
              isFolder={node.type === 'folder'}
              childVisible={childVisible}
              isParent={node.isParent}
              addNewItem={activateAddmode}
              workSpaceDetails={workSpaceDetails}
            />
          )}
        </div>
        {hasChild && childVisible && (
          <div className={`treeChildLabel${childVisible ? ' show' : ''}`}>
            <ul className="treeChildLabelUl">
              {/* <Tree data={node.children} color={color} /> */}
              {node.children.map((child, index) => (
                <TreeNode
                  key={child.tId + index}
                  node={child}
                  isFirst=""
                  isVisible={child?.filterApplied ? child.searchMatch : true}
                  isActive={activeNode === child}
                  onClick={onClick}
                  activeNode
                  showDocumentOptions={showDocumentOptions}
                  setShowDocumentOptions={setShowDocumentOptions}
                  setShowColorDots={setShowColorDots}
                  addedNode={(e: any, newNode: any) =>
                    addNewMenu(e ?? child, newNode)
                  }
                />
              ))}
              {addMode && (
                <li className="treeLiItem">
                  <div
                    className={`treeList${isFirst ? ' first' : ''} tree-header`}
                  >
                    <ListItem
                      color={color}
                      label=""
                      isFolder={addItemConfig.type === 'folder'}
                      childVisible={false}
                      isParent={false}
                      onNewMenuAdd={newMenuAddHandler}
                      isEdit={addMode}
                      node={node}
                      setAddMode={setAddMode}
                      workSpaceDetails={workSpaceDetails}
                    />
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </li>
    )
  );
}
function ListItem({
  color,
  isFolder,
  label,
  uuid,
  isEdit,
  setIsEditMode,
  addNewItem,
  childVisible,
  isParent,
  onNewMenuAdd,
  node,
  setAddMode,
  workSpaceDetails,
}: any) {
  const [newLabel, setNewLabel] = useState('');
  const inputBox = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state);
  console.log('workspace', workspace);
  console.log('&&&', workSpaceDetails);
  useEffect(() => {
    setNewLabel(label);
  }, [label]);
  const updateLabelHandler = (e) => {
    const { value } = e.target;
    setNewLabel(value);
  };
  const updateNewValue = (e) => {
    const { value } = e.target;
    if (onNewMenuAdd) {
      const obj = {
        label: value,
        type: isFolder ? 'folder' : 'file',
      };
      onNewMenuAdd(obj);
    }
  };
  const createNewItem = (e) => {
    if (e.key === 'Enter') {
      if (label) {
        dispatch(renameItem({ uuid, isFolder, name: inputBox.current.value }));
        setIsEditMode && setIsEditMode(false);
      } else {
        dispatch(
          createSubChild({
            name: inputBox.current.value,
            parentDetails: {
              ...node,
              workSpaceName: workSpaceDetails.name,
              workSpaceUUID: workSpaceDetails.uuid,
            },
            type: `${isFolder ? 'folder' : 'doc'}`,
          })
        );
        setAddMode && setAddMode(false);
      }
      // updateNewValue(e);
    }
  };
  useEffect(() => {
    if (isEdit) {
      setTimeout(() => {
        inputBox?.current?.focus();
      });
    }
  }, [isEdit]);
  const onDocumentClicked = () => {
    dispatch(setCurrentSelectedDocument({ id: null }));
    setTimeout(() => {
      const workSpaceUUID = workSpaceDetails?.uuid;
      dispatch(setCurrentSelectedDocument({ id: label, uuid, workSpaceUUID }));
      dispatch(setNodeIDs({ id: label, uuid, workSpaceUUID }));
      dispatch(setCurrentSelectedUI(''));
      dispatch(setSelectedOption('Editor'));
    }, 1000);
  };
  const onEscapeButtonPressed = (event: any) => {
    if (event.code === 'Escape') {
      setAddMode(false);
    }
  };
  return (
    <div
      className="item-wrapper"
      onClick={() => {
        !isFolder && onDocumentClicked();
      }}
    >
      <div className="item-collaps-arrow">
        {isParent && (
          <div className={`arrow ${childVisible ? 'active' : ''}`}>
            <UpArrow stroke={`${childVisible ? color : '#7B8388'}`} />
          </div>
        )}
      </div>
      <div className="item-Icon-wrapper">
        {isFolder && (
          <Folder
            fill={workSpaceDetails.color}
            stroke={workSpaceDetails.color}
          />
        )}
        {!isFolder && <Page />}
      </div>
      <div className="item-label-wrapper">
        {isEdit ? (
          <input
            onKeyDown={onEscapeButtonPressed}
            id="newSubTreeInput"
            ref={inputBox}
            type="text"
            className="item-label-input"
            value={newLabel}
            onInput={updateLabelHandler}
            onBlur={updateNewValue}
            onKeyUp={createNewItem}
          />
        ) : (
          <div className="item-label">{label}</div>
        )}
      </div>
      <div className="item-action-wrapper">
        {!isEdit && (
          <button onClick={addNewItem} type="button" className="addNew">
            {isFolder ? (
              '+'
            ) : (
              <span className="threeDotsIcon">
                <svg
                  width="13"
                  height="3"
                  viewBox="0 0 13 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#C6C6C6"></circle>
                  <circle cx="6.5" cy="1.5" r="1.5" fill="#C6C6C6"></circle>
                  <circle cx="11.5" cy="1.5" r="1.5" fill="#C6C6C6"></circle>
                </svg>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
export default Tree;
