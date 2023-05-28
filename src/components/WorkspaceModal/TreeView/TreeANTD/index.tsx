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
}: any) {
  const dispatch = useDispatch();
  const reduxState: any = useSelector((state) => state);
  const [treeDataProcessed, setTreeData] = useState<DataNode[]>();
  const { workspace } = reduxState;
  console.log('workspace', color, name, workspaceDetails);
  console.log('workspace', reduxState);
  useEffect(() => {
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
    console.log('WorkSpaceTreeData', WorkSpaceTreeData);
    setTreeData(WorkSpaceTreeData);
  }, [workspace]);

  console.log('setTreeData', treeDataProcessed);

  // child render function
  const inputRefFolder = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRefDoc = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onEscapeButtonPressed = (event: any) => {
    if (event.code === 'Escape') {
      callbackForCreate(false);
      callbackForCreate(false);
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
  });
  const callbackFunctionForModTree = (treeData: any) => {
    // console.log('updatedNode nodeToUpdate', nodeToUpdate);
    // console.log('updatedNode child filtered', WorkSpaceTreeData);
    // let oldTreeStateObject = treeDataProcessed;
    // console.log('updatedNode oldTreeStateObject', oldTreeStateObject);
    setTreeData(treeData);
  };
  const customRenderer = (node: any) => {
    return (
      <RenderChild
        node={node}
        callbackFunctionForModTree={callbackFunctionForModTree}
        treeData={treeDataProcessed}
      />
    );
  };
  // const onExpand = (node) => {
  //   console.log('node expander', node);
  //   console.log('node expander', treeDataProcessed);
  //   const { workSpaceDocs, workspaceFolders } = workspace;
  //   const WorkSpaceTreeData: any = [];
  //   const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
  //     return (
  //       folderData?.workSpaceUUID === currentNode?.workspaceDetails?.uuid &&
  //       folderData?.childOf === node.key
  //     );
  //   });
  // };
  // const renameKey = (obj: any, targetId: any, newObject: any) => {
  //   if (obj.key === targetId) {
  //     const oldChildren = obj.children;
  //     oldChildren.push(newObject);
  //     obj.children = oldChildren;
  //   }

  //   if (obj.children && obj.children.length > 0) {
  //     obj.children.forEach((child) => {
  //       renameKey(child, targetId, newObject);
  //     });
  //   }
  // };
  function addChildObject(obj: any, targetKey: any, newObject: any) {
    if (obj.key === targetKey) {
      const copyOfChildrenArray = obj.children;
      // obj.children.push(newObject);
      obj.children = [...copyOfChildrenArray, ...newObject];
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
    const { workSpaceDocs, workspaceFolders } = workspace;
    console.log('WorkSpaceTreeData - node selected', node);
    const WorkSpaceTreeData: any = [];
    console.log('WorkSpaceTreeData - node selected', workspaceFolders);
    const selectedFolder = workspaceFolders.filter((folderData: any) => {
      return folderData?.uuid === node[node.length - 1];
    });
    const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
      return folderData?.childOf === node[node.length - 1];
    });
    const rootLevelDocuments = workSpaceDocs.filter(
      (docData: any) => docData.childOf === node[node.length - 1]
    );
    console.log('WorkSpaceTreeData - node selected', selectedFolder);

    rootLevelFolders.forEach((data: any) => {
      const sampleObjectFolder = {
        title: data.name,
        key: data.uuid,
        children: [],
        color,
        isLeaf: false,
      };
      WorkSpaceTreeData.push(sampleObjectFolder);
    });
    const copyOftreeDataProcessed = treeDataProcessed;
    rootLevelDocuments.forEach((data: any) => {
      const sampleObjectDoc = {
        title: data.name,
        key: data.uuid,
        isLeaf: true,
        color,
      };
      WorkSpaceTreeData.push(sampleObjectDoc);
    });
    console.log('WorkSpaceTreeData - node selected', WorkSpaceTreeData);
    addChildObject(
      copyOftreeDataProcessed,
      node[node.length - 1],
      WorkSpaceTreeData
    );
    console.log('WorkSpaceTreeData - node selected', copyOftreeDataProcessed);
    setTreeData(copyOftreeDataProcessed);
  };

  useEffect(() => {}, [treeDataProcessed]);
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
            onKeyDown={onEscapeButtonPressed}
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
            onKeyDown={onEscapeButtonPressed}
            className="treeViewContainerDocInput"
            ref={inputRefDoc}
            id="newTreeDocInput"
          />
        </div>
      )}
      <DirectoryTree
        style={{ background: '#0c0c0c', color: 'white' }}
        switcherIcon={
          <div style={{ height: '36px', display: 'flex', marginLeft: '10px' }}>
            <DownOutlined rev={undefined} style={{}} />
          </div>
        }
        showLine
        // showIcon={false}
        multiple={false}
        // defaultExpandAll
        // onSelect={onSelect}
        // onExpand={onExpand}
        treeData={treeDataProcessed}
        selectable={false}
        titleRender={customRenderer}
        onExpand={nodeSelected}
      />
    </div>
  );
}

export default TreeStructure;
