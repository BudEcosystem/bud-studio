/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FileFilled, FolderFilled, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Popover } from 'antd';
import {
  Copy,
  Delete,
  Duplicate,
  Edit,
  Move,
  Plus,
  RightArrow,
} from 'components/WorkspaceModal/WorkspaceIcons';
import {
  addDuplicateDoc,
  addDuplicateEditorApplications,
  addDuplicateFolders,
  changeColor,
  createSubChild,
  deleteFolder,
  editFolderName,
  setCurrentSelectedDocument,
} from 'redux/slices/workspace';
import {
  setCurrentMoveToItem,
  setCurrentSelectedUI,
  setIsMoveTo,
  setNavigationPath,
  setNodeIDs,
  setSelectedOption,
} from 'redux/slices/activestate';

function RenderChild({
  node,
  treeData,
  optionModalRef,
  expandedKeys,
  addInputField,
  setExpandedKeys,
  workspaceDetails,
  setShowDocumentOptions,
  color,
  setTreeData,
  nodeSelected,
}: any) {
  const [currentNode, setCurrentNode] = useState<any>();
  const [popOverVisible, setPopOverVisible] = useState(false);
  const reduxState: any = useSelector((state) => state);
  const { workspace } = reduxState;
  const getParentIds = (
    arr: any,
    targetId: any,
    parentIds = [],
    parentId = null
  ): any => {
    for (const obj of arr) {
      if (obj.key === targetId) {
        if (parentId !== null) {
          parentIds.push(parentId);
        }
        return parentIds;
      }
      if (obj.children.length > 0) {
        parentIds.push(obj.key);
        const result = getParentIds(obj.children, targetId, parentIds, obj.key);
        if (result.length > 0) {
          return result;
        }
        parentIds.pop();
      }
    }
    return [];
  };
  const createNewClickHandler = (e: any, type: any, node: any) => {
    e.preventDefault();
    const { key } = node;
    addInputField(node, type);
    setShowDocumentOptions(false);
  };
  const dispatch = useDispatch();
  const { activestate }: any = useSelector((state) => state);
  const { isMoveto } = activestate;
  const moveToHandler = () => {
    if (isMoveto) {
      setTimeout(() => {
        dispatch(setIsMoveTo(false));
      }, 200);
    }
    dispatch(setIsMoveTo(true));
    dispatch(setCurrentMoveToItem(node));
  };

  const onDeleteFolderClicked = (event: any) => {
    event.preventDefault();
    dispatch(deleteFolder({ id: node.key }));
  };

  const findIndexOfData = (data: Array<any>, id: number) => {
    return data.findIndex((ArrayData: any) => ArrayData.key === id);
  };

  const findAndReplaceItem = (index: any, currentTreeData: any) => {
    let inc = index;
    const current = currentTreeData;
    const indexFound = findIndexOfData(current, expandedKeys[inc]);
    if (indexFound !== -1) {
      const newCurrent = current[indexFound];
      inc += 1;
      if (inc === expandedKeys.length) {
        newCurrent.children[0].title = 'renamed';
      } else {
        findAndReplaceItem(inc, newCurrent.children);
      }
    }
    return current;
  };
  const onRenameClicked = (e: any) => {
    setCurrentNode({ ...node, folderUpdateInput: true });
  };
  const checkForChilds = (id: any) => {
    const { workspaceFolders, workSpaceDocs } = workspace;
    const childFolders = workspaceFolders.filter(
      (data: any) => data?.childOf === id
    );
    const childDocs = workSpaceDocs.filter((data: any) => data?.childOf === id);
    return [...childDocs, ...childFolders];
  };
  const checkIfCHildrenExistsAndDuplicate = (
    parentId: any,
    isParent: boolean,
    newParentId: any,
    folderCopy: any,
    docCopy: any,
    applicationCopy: any
  ) => {
    const { workspaceFolders, workSpaceDocs, editorApplicationsAdded } =
      workspace;
    if (isParent) {
      const parentFolder = workspaceFolders.find(
        (data: any) => data.uuid === parentId
      );
      const newUUID = uuidv4();
      const newParentFolder = {
        ...parentFolder,
        name: `${parentFolder.name}-duplicate`,
        uuid: newUUID,
      };
      folderCopy.push(newParentFolder);
      if (checkForChilds(parentId).length > 0) {
        checkIfCHildrenExistsAndDuplicate(
          parentId,
          false,
          newUUID,
          folderCopy,
          docCopy,
          applicationCopy
        );
      }
    } else {
      const childFolders = workspaceFolders.filter(
        (data: any) => data?.childOf === parentId
      );
      const childDocs = workSpaceDocs.filter(
        (data: any) => data?.childOf === parentId
      );
      childDocs.forEach((childDoc: any) => {
        const newId = uuidv4();
        const newChildDoc = {
          ...childDoc,
          uuid: newId,
          childOf: newParentId,
        };
        const filteredApplicationDataForCurrentDOcument =
          editorApplicationsAdded.filter(
            (appData: any) => appData.docId === childDoc.uuid
          );
        filteredApplicationDataForCurrentDOcument.forEach((each) =>
          applicationCopy.push({ ...each, docId: newId })
        );
        docCopy.push(newChildDoc);
      });
      childFolders.forEach((childFolder: any) => {
        const newChildUUID = uuidv4();
        const newChildFolder = {
          ...childFolder,
          uuid: newChildUUID,
          childOf: newParentId,
        };
        folderCopy.push(newChildFolder);
        const { uuid } = childFolder;
        if (checkForChilds(uuid).length > 0) {
          checkIfCHildrenExistsAndDuplicate(
            uuid,
            false,
            newChildUUID,
            folderCopy,
            docCopy,
            applicationCopy
          );
        }
      });
    }
  };
  const onDuplicateFolderClicked = (e: any) => {
    e.stopPropagation();
    setPopOverVisible(false);
    const folderCopy: any = [];
    const docCopy: any = [];
    const applicationCopy: any = [];
    checkIfCHildrenExistsAndDuplicate(
      node.key,
      true,
      null,
      folderCopy,
      docCopy,
      applicationCopy
    );
    dispatch(addDuplicateFolders({ newObjectArray: folderCopy }));
    dispatch(addDuplicateDoc({ newObjectArray: docCopy }));
    dispatch(addDuplicateEditorApplications({ newObjectArray: docCopy }));
  };
  const content = (
    <div className="docOptionsModal" ref={optionModalRef}>
      <div className="secondWorkspaceModal">
        <div className="secondWorkspaceOptions">
          <div style={{ marginBottom: '20px' }}>
            <div
              className="secondWorkspaceOption"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Plus />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Create New
              </h3>
              <ul className="subMenu">
                <li onClick={(e) => createNewClickHandler(e, 'folder', node)}>
                  Folder
                </li>
                <li onClick={(e) => createNewClickHandler(e, 'doc', node)}>
                  Document
                </li>
              </ul>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            {/* {createPopup && <CreatePopupModal />} */}
            <div className="secondWorkspaceOption" onClick={onRenameClicked}>
              <Edit />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Rename
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            {/* <div>
              {isRename && (
                <input
                  type="text"
                  value={newName}
                  onKeyUp={workSpaceNameChangeHandler}
                  onInput={workSpaceNameInputHandler}
                />
              )}
            </div> */}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div
              className="secondWorkspaceOption"
              onClick={onDuplicateFolderClicked}
            >
              <Duplicate />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Duplicate Folder
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="secondWorkspaceOption">
              <Copy />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Copy to
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="secondWorkspaceOption" onClick={moveToHandler}>
              <Move />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Move to
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="Delete" onClick={onDeleteFolderClicked}>
            <div className="secondWorkspaceOption">
              <Delete />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Delete
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    if (node) {
      setCurrentNode(node);
    }
  }, [node]);

  const deterMineColor = () => {
    const flag = currentNode?.level !== 0 || currentNode?.isLeaf;
    const colourDetermined = flag
      ? 'transparent'
      : `linear-gradient(90.28deg, ${color}45 4.88%, rgba(17, 21, 18, 0) 91.54%)`;
    return colourDetermined;
  };

  const plusButtonClicked = (e: any) => {
    e.stopPropagation();
    const defaultValue = popOverVisible;
    setPopOverVisible(!defaultValue);
    setShowDocumentOptions(true);
    // const { key } = node;
    // const idArray = getParentIds(treeData, key);
    // console.log(idArray);
    // // setExpandedKeys([key]);
    // setTimeout(() => {
    //   // setExpandedKeys([]);
    // }, 100);
  };
  const inputRefFolder = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    document.getElementById('newTreeChildInput')?.focus();
  });
  const onEnterInput = (event: any) => {
    if (event.code === 'Escape') {
      event.preventDefault();
      console.log(inputRefFolder.current.value, currentNode);
      dispatch(
        createSubChild({
          name: 'Untitled',
          type: currentNode.isLeaf ? 'doc' : 'folder',
          parentDetails: currentNode.parent,
        })
      );
      setTimeout(setExpandedKeys([]));
    }
    if (event.code === 'Enter') {
      event.preventDefault();
      console.log(inputRefFolder.current.value, currentNode);
      dispatch(
        createSubChild({
          name: inputRefFolder.current.value,
          type: currentNode.isLeaf ? 'doc' : 'folder',
          parentDetails: currentNode.parent,
        })
      );
      setTimeout(setExpandedKeys([]));
      console.log(inputRefFolder.current.value, currentNode);
    }
  };
  const onEnterInputForUpdate = (event: any) => {
    console.log('currentNode', currentNode);
    if (event.code === 'Escape') {
      event.preventDefault();
      console.log(inputRefFolder.current.value, currentNode);
      dispatch(
        editFolderName({
          name: currentNode.title,
          id: currentNode.key,
        })
      );
      setTimeout(setExpandedKeys([]));
    }
    if (event.code === 'Enter') {
      event.preventDefault();
      dispatch(
        editFolderName({
          name:
            inputRefFolder.current.value.length > 0
              ? inputRefFolder.current.value
              : currentNode.title,
          id: currentNode.key,
        })
      );
      setTimeout(setExpandedKeys([]));
      console.log(inputRefFolder.current.value, currentNode);
    }
  };
  const findParent = (x) => {
    console.log(x);
    const find = workspace.workspaceFolders.find((y) => y?.uuid === x?.parent);
    // console.log(find, "asdf")
    return find;
  };
  const [navArray, setNavArray] = useState([]);
  const solveRec = (x) => {
    console.log('asdfasfsad', x);
    if (x?.childOf != null) {
      const temp = workspace.workspaceFolders.find(
        (y) => y?.uuid === x?.childOf
      );
      console.log('asdfasfsad', temp);
      dispatch(setNavigationPath(temp));
      solveRec(temp);
    }
  };
  const navPathHandler = (n) => {
    const par = findParent(n);
    dispatch(setNavigationPath(null));
    dispatch(setNavigationPath({ name: n.title }));
    if (par) {
      dispatch(setNavigationPath(par));
      solveRec(par);
    }
    dispatch(setNavigationPath({ name: workspaceDetails?.name }));
  };
  const clickHandler = () => {
    if (node.isLeaf && !currentNode?.folderInput && !currentNode?.docInput) {
      dispatch(setCurrentSelectedDocument({ id: null }));
      console.log(node);
      navPathHandler(node);
      setTimeout(() => {
        const workSpaceUUID = node.workspaceDetails?.uuid;
        dispatch(
          setCurrentSelectedDocument({
            uuid: node.key,
            workSpaceUUID,
          })
        );
        dispatch(setNodeIDs({ uuid: node.key, workSpaceUUID }));
        dispatch(setCurrentSelectedUI(''));
        dispatch(setSelectedOption('Editor'));
        dispatch(changeColor({ color: node.color }));
      }, 100);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  };
  return (
    <div
      className="eachsection"
      style={{
        position: 'relative',
        zIndex: '1',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '-30px',
        width: '238px',
        height: '36px',
        background: deterMineColor(),
        // background: 'red',
      }}
      onClick={clickHandler}
    >
      <div style={{ display: 'flex' }}>
        {!currentNode?.folderInput &&
        !currentNode?.docInput &&
        !currentNode?.folderUpdateInput &&
        currentNode?.isLeaf ? (
          <FileFilled
            style={{
              color: `${currentNode?.color}`,
              marginLeft: '30px',
              fontSize: '18px',
            }}
            rev={undefined}
          />
        ) : (
          <FolderFilled
            style={{
              color: `${currentNode?.color}`,
              marginLeft: '30px',
              fontSize: '18px',
            }}
            rev={undefined}
          />
        )}{' '}
        {!currentNode?.folderInput &&
          !currentNode?.docInput &&
          !currentNode?.folderUpdateInput && (
            <div style={{ display: 'flex' }}>
              <span
                style={{
                  marginLeft: '10px',
                  width: '150px',
                  minWidth: '150px',
                }}
              >
                {currentNode?.title}
              </span>
            </div>
          )}
        {(currentNode?.folderInput || currentNode?.docInput) && (
          <div style={{ display: 'flex' }}>
            <input
              onKeyDown={onEnterInput}
              className="treeViewContainerDocInput"
              id="newTreeChildInput"
              ref={inputRefFolder}
            />
          </div>
        )}
        {currentNode?.folderUpdateInput && (
          <div style={{ display: 'flex' }}>
            <input
              onKeyDown={onEnterInputForUpdate}
              className="treeViewContainerDocInput"
              id="newTreeChildInput"
              ref={inputRefFolder}
            />
          </div>
        )}
      </div>
      {!currentNode?.isLeaf && expandedKeys.includes(node.key) && (
        <Popover
          // popupVisible={false}
          open={popOverVisible}
          trigger="click"
          placement="rightTop"
          content={content}
          arrow
        >
          <div
            onClick={plusButtonClicked}
            style={{
              position: 'absolute',
              zIndex: '9999',
              width: '26px',
              height: '26px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '5px',
              background: ' #151517',
              borderRadius: '8px',
              left: '210px',
            }}
          >
            <PlusOutlined style={{ fontSize: '10px' }} rev={undefined} />
          </div>
        </Popover>
      )}
    </div>
  );
}

export default RenderChild;
