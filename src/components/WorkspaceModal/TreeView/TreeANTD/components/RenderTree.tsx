/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
// import { Tree } from 'antd';
// import { DownOutlined } from '@ant-design/icons';

// const { DirectoryTree } = Tree;

// function RenderTree({ treeDataProcessed, customRenderer, nodeSelected }: any) {
//   return (
//     <Tree
//       //   style={{ background: '#0c0c0c', color: 'white' }}
//       //   switcherIcon={
//       //     <div style={{ height: '36px', display: 'flex', marginLeft: '10px' }}>
//       //       <DownOutlined rev={undefined} style={{}} />
//       //     </div>
//       //   }
//       showLine
//       multiple={false}
//       // defaultExpandAll
//       // onSelect={onSelect}
//       // onExpand={onExpand}
//       treeData={treeDataProcessed}
//       selectable={false}
//       //   titleRender={customRenderer}
//       loadData={nodeSelected}
//     />
//   );
// }

// export default RenderTree;
import React, { useState } from 'react';
import { Tree } from 'antd';
import { useSelector } from 'react-redux';

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}
const initTreeData: DataNode[] = [
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
];

// It's just a simple demo. You can use tree map to optimize update perf.
const updateTreeData = (
  list: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

function RenderTree() {
  const [treeData, setTreeData] = useState(initTreeData);
  const reduxState: any = useSelector((state) => state);
  const { workspace } = reduxState;

  console.log('treeData-treeData-treeDatatreeData', treeData);
  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            { title: 'Child Node', key: `${key}-0` },
            { title: 'Child Node', key: `${key}-1` },
          ])
        );

        resolve();
      }, 10);
    });

  function addChildObject(obj: any, targetKey: any, newObject: any) {
    if (obj.key === targetKey) {
      const copyOfChildrenArray = obj.children || [];
      // obj.children.push(newObject);
      const filteredArray = copyOfChildrenArray.filter(
        (data: any) => data.key === newObject[0].key
      );
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
      console.log('WorkSpaceTreeData - node selected', node);
      const WorkSpaceTreeData: any = [];
      console.log('WorkSpaceTreeData - node selected', workspaceFolders);
      const selectedFolder = workspaceFolders.filter((folderData: any) => {
        return folderData?.uuid === node.key;
      });
      const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
        return folderData?.childOf === node.key;
      });
      const rootLevelDocuments = workSpaceDocs.filter(
        (docData: any) => docData.childOf === node.key
      );
      console.log('WorkSpaceTreeData - node selected', selectedFolder);

      rootLevelFolders.forEach((data: any) => {
        const sampleObjectFolder = {
          title: data.name,
          key: data.uuid,
          children: [],
          color: node.color,
          isLeaf: false,
        };
        WorkSpaceTreeData.push(sampleObjectFolder);
      });
      rootLevelDocuments.forEach((data: any) => {
        const sampleObjectDoc = {
          title: data.name,
          key: data.uuid,
          isLeaf: true,
          color: node.color,
        };
        WorkSpaceTreeData.push(sampleObjectDoc);
      });
      const copyOftreeDataProcessed = treeData;
      console.log('WorkSpaceTreeData - node selected', WorkSpaceTreeData);
      addChildObject(copyOftreeDataProcessed, node.key, WorkSpaceTreeData);
      console.log(
        'treeData-treeData-treeDatatreeData - 11 ',
        copyOftreeDataProcessed
      );
      setTimeout(() => {
        setTreeData(copyOftreeDataProcessed);
        resolve(true);
      }, 400);
    });
  };
  return (
    <Tree
      showLine
      selectable={false}
      loadData={nodeSelected}
      treeData={treeData}
    />
  );
}

export default RenderTree;
