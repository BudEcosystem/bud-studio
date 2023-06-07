/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import {
  FileFilled,
  FolderFilled,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { DocIcon } from 'components/WorkspaceModal/WorkspaceIcons';
import { Folder } from '../Tree/TreeSvgIcons';
import './index.css';
import { createDoc, createFolder } from 'redux/slices/workspace';
import RenderChild from './components/RenderChild';

const { DirectoryTree } = Tree;

function TreeStructure({
  color,
  name,
  workspaceDetails,
  createFolderFlag,
  createDocFlag,
  callbackForCreate,
  optionModalRef,
  setShowDocumentOptions,
}: any) {
  const dispatch = useDispatch();
  const reduxState: any = useSelector((state) => state);
  const [treeDataProcessed, setTreeData] = useState<any[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);

  const [navigationPath, setNavigationPath] = useState<string[]>([]);

  const { workspace } = reduxState;
  const initData = () => {
    const { workSpaceDocs, workspaceFolders } = workspace;
    const WorkSpaceTreeData: any = [];
    const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
      return (
        folderData?.workSpaceUUID === workspaceDetails.uuid &&
        folderData?.childOf === null
      );
    });
    const rootLevelDocuments = workSpaceDocs.filter(
      (docData: any) =>
        docData.workSpaceUUID === workspaceDetails.uuid &&
        docData.childOf === null
    );
    rootLevelFolders.forEach((data: any) => {
      const sampleObjectFolder = {
        title: data.name,
        key: data.uuid,
        children: [],
        color,
        isLeaf: false,
        workspaceDetails,
      };
      WorkSpaceTreeData.push(sampleObjectFolder);
    });
    rootLevelDocuments.forEach((data: any) => {
      const sampleObjectDoc = {
        title: data.name,
        key: data.uuid,
        isLeaf: true,
        color,
        workspaceDetails,
        children: [],
      };
      WorkSpaceTreeData.push(sampleObjectDoc);
    });
    setTreeData(WorkSpaceTreeData);
  };
  useEffect(() => {
    initData();
  }, [workspace]);

  // child render function
  const inputRefFolder = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRefDoc = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onEscapeButtonPressed = (event: any, type: any) => {
    if (event.code === 'Escape') {
      // callbackForCreate(false);
      // callbackForCreate(false);
      if (type === 'folder') {
        dispatch(
          createFolder({
            workSpaceDetails: workspaceDetails,
            name: 'Untitled',
          })
        );
        callbackForCreate();
      }
      if (type === 'doc') {
        dispatch(
          createDoc({
            workSpaceDetails: workspaceDetails,
            name: 'Untitled',
          })
        );
        callbackForCreate();
      }
      // dispatch(disableCreateNewTreeNode({ type: 'doc' }));
      // dispatch(disableCreateNewTreeNode({ type: 'folder' }));
    }
    if (event.key === 'Enter') {
      if (inputRefFolder.current?.value) {
        // event.preventDefault();
        dispatch(
          createFolder({
            workSpaceDetails: workspaceDetails,
            name: inputRefFolder.current?.value,
          })
        );
        callbackForCreate();
      }

      if (inputRefDoc.current?.value) {
        // event.preventDefault();
        dispatch(
          createDoc({
            workSpaceDetails: workspaceDetails,
            name: inputRefDoc.current?.value,
          })
        );
        callbackForCreate();
      }
    }
  };
  useEffect(() => {
    document.getElementById('newTreeFolderInput')?.focus();
    document.getElementById('newTreeDocInput')?.focus();
  }, [createFolderFlag, createDocFlag]);
  const callbackFunctionForModTree = (treeData: any) => {
    // let oldTreeStateObject = treeDataProcessed;
    setTreeData(treeData);
  };

  function addChildObject(obj: any, targetKey: any, newObject: any) {
    console.log('sdcjbdjcbdcbh', obj, targetKey, newObject);
    if (obj.key === targetKey) {
      const copyOfChildrenArray = obj.children || [];
      // obj.children.push(newObject);
      const filteredArray = copyOfChildrenArray.filter((data: any) => {
        const idArray = newObject.map((objectData: any) => objectData.key);
        return idArray.includes(data.key);
      });
      if (filteredArray.length === 0) {
        obj.children = [...copyOfChildrenArray, ...newObject];
      }
      return;
    }
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((child: any) => {
        addChildObject(child, targetKey, newObject);
      });
    } else if (Array.isArray(obj)) {
      obj.forEach((child) => {
        addChildObject(child, targetKey, newObject);
      });
    }
  }
  const nodeSelected = (node: any) => {
    return new Promise((resolve) => {
      const { workSpaceDocs, workspaceFolders } = workspace;
      const WorkSpaceTreeData: any = [];

      const updatedPath = [...navigationPath, node.title];
      setNavigationPath(updatedPath);

      console.log(updatedPath, 'sadfads', node);

      const selectedFolder = workspaceFolders.filter((folderData: any) => {
        return folderData?.uuid === node.key;
      });
      const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
        return folderData?.childOf === node.key;
      });
      const rootLevelDocuments = workSpaceDocs.filter(
        (docData: any) => docData.childOf === node.key
      );
      rootLevelFolders.forEach((data: any) => {
        const sampleObjectFolder = {
          title: data.name,
          key: data.uuid,
          children: [],
          color: node.color,
          isLeaf: false,
          folderInput: false,
        };
        WorkSpaceTreeData.push(sampleObjectFolder);
      });
      const copyOftreeDataProcessed = treeDataProcessed;
      rootLevelDocuments.forEach((data: any) => {
        const sampleObjectDoc = {
          title: data.name,
          key: data.uuid,
          isLeaf: true,
          color: node.color,
          docInput: false,
          parent: data.childOf,
        };
        WorkSpaceTreeData.push(sampleObjectDoc);
      });
      console.log('WorkSpaceTreeData', WorkSpaceTreeData);
      addChildObject(copyOftreeDataProcessed, node.key, WorkSpaceTreeData);
      function findLevels(objects: any, level = 0) {
        objects &&
          objects.forEach((obj: any) => {
            obj.level = level;
            if (obj?.children?.length > 0) {
              findLevels(obj.children, level + 1);
            }
          });
      }
      const copyOfTreeData = copyOftreeDataProcessed;
      findLevels(copyOfTreeData);
      setTreeData(copyOfTreeData);
      resolve(true);
    });
  };

  const onNodeExpand = (key: any) => {
    console.log('hahahahah');
    setExpandedKeys(key);
  };

  const addInputField = (target: any, type: any) => {
    console.log('target', target);
    console.log('target', type);
    const copyOftreeDataProcessed = treeDataProcessed;
    console.log('copyOftreeDataProcessed', copyOftreeDataProcessed);

    const arrayToPush = [];
    if (type === 'doc') {
      const objectToadd = {
        key: 'inputField-doc',
        isLeaf: true,
        color: '',
        docInput: true,
        parent: { ...target, workspaceDetails },
        level: target.level,
      };
      arrayToPush.push(objectToadd);
    }
    if (type === 'folder') {
      const objectToadd = {
        key: 'inputField-folder',
        isLeaf: false,
        color: '',
        folderInput: true,
        parent: { ...target, workspaceDetails },
        level: target.level,
      };
      arrayToPush.push(objectToadd);
    }
    // addChildObject(copyOftreeDataProcessed, target.key, arrayToPush);
    const copyOfTreeData = arrayToPush.concat(copyOftreeDataProcessed);
    console.log('copyOftreeDataProcessed', copyOfTreeData);
    // function findLevels(objects: any, level = 0) {
    //   objects &&
    //     objects.forEach((obj: any) => {
    //       obj.level = level;
    //       if (obj?.children?.length > 0) {
    //         findLevels(obj.children, level + 1);
    //       }
    //     });
    // }
    // console.log('copyOfTreeData', copyOfTreeData);
    // findLevels(copyOftreeDataProcessed);
    // setTreeData([]);
    setTimeout(() => {
      setTreeData(copyOfTreeData);
    }, 100);
    // nodeSelected(target);
  };
  const customRenderer = (node: any) => {
    const { level } = node;
    return (
      <div
        onClick={() => nodeSelected(node)}
        style={{
          marginLeft: `${level ? level * 30 : 0}px`,
          // background: 'red',
          // pointerEvents: 'none',
        }}
      >
        <RenderChild
          node={node}
          callbackFunctionForModTree={callbackFunctionForModTree}
          treeData={treeDataProcessed}
          optionModalRef={optionModalRef}
          setTreeData={setTreeData}
          expandedKeys={expandedKeys}
          addInputField={addInputField}
          setExpandedKeys={setExpandedKeys}
          workspaceDetails={workspaceDetails}
          setShowDocumentOptions={setShowDocumentOptions}
          color={color}
        />
      </div>
    );
  };
  const conditionalProps = () => {
    const sampleObjectProps: any = {};
    if (expandedKeys.length > 0) {
      sampleObjectProps.expandedKeys = expandedKeys;
    }
    return sampleObjectProps;
  };
  const propsGenerated: any = conditionalProps();
  const onSearchInput = (value: string) => {
    if (value.length === 0) {
      initData();
      return;
    }
    const { workSpaceDocs, workspaceFolders } = workspace;
    const WorkSpaceTreeData: any = [];
    const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
      return (
        folderData?.workSpaceUUID === workspaceDetails.uuid &&
        folderData.name.includes(value)
      );
    });
    const rootLevelDocuments = workSpaceDocs.filter(
      (docData: any) =>
        docData.workSpaceUUID === workspaceDetails.uuid &&
        docData.name.includes(value)
    );
    rootLevelFolders.forEach((data: any) => {
      const sampleObjectFolder = {
        title: data.name,
        key: data.uuid,
        children: [],
        color,
        isLeaf: false,
        workspaceDetails,
      };
      WorkSpaceTreeData.push(sampleObjectFolder);
    });
    rootLevelDocuments.forEach((data: any) => {
      const sampleObjectDoc = {
        title: data.name,
        key: data.uuid,
        isLeaf: true,
        color,
        workspaceDetails,
        children: [],
      };
      WorkSpaceTreeData.push(sampleObjectDoc);
    });
    setTreeData(WorkSpaceTreeData);
  };
  useEffect(() => {
    let timerInput: any;
    const searchSkills = document?.getElementById(
      'searchFlyout'
    ) as HTMLInputElement;
    searchSkills?.addEventListener('keyup', () => {
      clearTimeout(timerInput);
      timerInput = setTimeout(() => {
        // alert(searchSkills.value);
        onSearchInput(searchSkills.value);
      }, 1300);
    });
  }, []);
  return (
    <div style={{ background: '#0c0c0c', color: 'white', paddingTop: '20px' }}>
      {createFolderFlag && (
        <div className="treeViewContainerDocInputWrapper">
          <FolderFilled
            style={{
              color: `${color}`,
              marginLeft: '-3px',
              fontSize: '18px',
            }}
            rev={undefined}
          />{' '}
          <input
            onKeyDown={(event) => onEscapeButtonPressed(event, 'folder')}
            className="treeViewContainerDocInput"
            ref={inputRefFolder}
            id="newTreeFolderInput"
          />
        </div>
      )}
      {createDocFlag && (
        <div className="treeViewContainerDocInputWrapper">
          <FileFilled
            style={{
              color: `${color}`,
              marginLeft: '-3px',
              fontSize: '18px',
            }}
            rev={undefined}
          />
          <input
            onKeyDown={(event) => onEscapeButtonPressed(event, 'doc')}
            className="treeViewContainerDocInput"
            ref={inputRefDoc}
            id="newTreeDocInput"
          />
        </div>
      )}
      <DirectoryTree
        style={{ background: '#0c0c0c', color: 'white' }}
        switcherIcon={(node) => {
          const { level } = node;
          return (
            <div
              style={{
                height: '36px',
                display: 'flex',
                marginLeft: `${level ? (level + 1) * 20 : 10}px`,
              }}
            >
              <DownOutlined rev={undefined} style={{}} />
            </div>
          );
        }}
        multiple={false}
        treeData={treeDataProcessed}
        selectable={false}
        titleRender={customRenderer}
        // loadData={nodeSelected}
        onExpand={onNodeExpand}
        {...propsGenerated}
      />
    </div>
  );
}

export default TreeStructure;
