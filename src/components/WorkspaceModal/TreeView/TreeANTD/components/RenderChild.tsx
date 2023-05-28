/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FileFilled, FolderFilled, PlusOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function RenderChild({ node, callbackFunctionForModTree, treeData }: any) {
  const [currentNode, setCurrentNode] = useState<any>();
  useEffect(() => {
    if (node) {
      console.log('nodeeeeeeeee1', node);
      setCurrentNode(node);
    }
  }, [node]);
  console.log('nodeeeeeeeee2', currentNode);

  const deterMineColor = () => {
    const colourDetermined = currentNode?.isLeaf
      ? 'transparent'
      : 'linear-gradient(90.28deg, rgba(138, 142, 233, 0.16) 4.88%, rgba(17, 21, 18, 0) 91.54%)';
    return colourDetermined;
  };
  const reduxState: any = useSelector((state) => state);
  const { workspace } = reduxState;
  console.log('workspace', reduxState);
  // useEffect(() => {
  //   // alert('rendered');
  //   if (currentNode) {
  //     console.log('nodeeeeeeeee3', currentNode);
  //     const { workSpaceDocs, workspaceFolders } = workspace;
  //     const WorkSpaceTreeData: any = [];
  //     const rootLevelFolders = workspaceFolders.filter((folderData: any) => {
  //       console.log(
  //         '####################################################################################'
  //       );
  //       console.log(
  //         'nodeeeeeeee4',
  //         folderData?.workSpaceUUID === currentNode?.workspaceDetails?.uuid
  //       );
  //       console.log('nodeeeeeeee4', folderData, currentNode);
  //       console.log('nodeeeeeeee4', folderData?.childOf === node.key);
  //       console.log('nodeeeeeeee4', folderData?.childOf, node.key);
  //       console.log(
  //         '####################################################################################'
  //       );

  //       return (
  //         folderData?.workSpaceUUID === currentNode?.workspaceDetails?.uuid &&
  //         folderData?.childOf === node.key
  //       );
  //     });
  //     const rootLevelDocuments = workSpaceDocs.filter(
  //       (docData: any) =>
  //         docData.workSpaceUUID === currentNode?.workspaceDetails?.uuid &&
  //         docData.childOf === node.key
  //     );
  //     rootLevelFolders.forEach((data: any) => {
  //       const sampleObjectFolder = {
  //         title: data.name,
  //         key: data.uuid,
  //         children: [],
  //         color: currentNode.color,
  //         isLeaf: false,
  //       };
  //       WorkSpaceTreeData.push(sampleObjectFolder);
  //     });
  //     rootLevelDocuments.forEach((data: any) => {
  //       const sampleObjectDoc = {
  //         title: data.name,
  //         key: data.uuid,
  //         isLeaf: true,
  //         color: currentNode.color,
  //       };
  //       WorkSpaceTreeData.push(sampleObjectDoc);
  //     });
  //     const currentNodeCopy = currentNode;
  //     console.log('currentNodeCopy', currentNodeCopy);

  //     if (currentNodeCopy.children && WorkSpaceTreeData.length > 0) {
  //       currentNodeCopy.children = WorkSpaceTreeData;
  //       // setCurrentNode(currentNodeCopy);
  //       // callbackFunctionForModTree(treeData);
  //     }
  //   }
  // }, [workspace, currentNode, node.key, callbackFunctionForModTree, treeData]);
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
        width: 'auto',
        height: '36px',
        background: deterMineColor(),
      }}
    >
      <div>
        {currentNode?.isLeaf ? (
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
        <span style={{ marginLeft: '10px' }}>{currentNode?.title}</span>
      </div>
      {!currentNode?.isLeaf && (
        <div
          onClick={() => alert('hahah')}
          style={{
            position: 'absolute',
            zIndex: '999',
            width: '26px',
            height: '26px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '5px',
            background: ' #151517',
            borderRadius: '8px',
            right: '10px',
          }}
        >
          <PlusOutlined style={{ fontSize: '10px' }} rev={undefined} />
        </div>
      )}
    </div>
  );
}

export default RenderChild;
