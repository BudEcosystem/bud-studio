import Tree from './Tree/Tree';
import {
  changeColor,
  createWorkspaces,
  editWorkspaceItem,
} from 'redux/slices/workspace';
import { useDispatch, useSelector } from 'react-redux';
import './TreeView.css';
import { useEffect } from 'react';

// const treeData = [
//   {
//     key: '0',
//     label: 'Human Resources',
//     isParent: true,
//     children: [
//       {
//         key: '0-0',
//         label: 'Employee detail',
//       },
//       {
//         key: '0-1',
//         label: 'Salary Details',
//         children: [
//           {
//             key: '0-1-0',
//             label: 'Information',
//             isSecondChild: true,
//             children: [
//               {
//                 key: '0-1-0',
//                 label: 'Information',
//                 isSecondChild: true,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: '0',
//     label: 'Human Resources',
//     isParent: true,
//     children: [
//       {
//         key: '0-0',
//         label: 'Employee detail',
//       },
//       {
//         key: '0-1',
//         label: 'Salary Details',
//         children: [
//           {
//             key: '0-1-0',
//             label: 'Information',
//             isSecondChild: true,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: '0',
//     label: 'Human Resources',
//     isParent: true,
//     children: [
//       {
//         key: '0-0',
//         label: 'Employee detail',
//       },
//       {
//         key: '0-1',
//         label: 'Salary Details',
//         children: [
//           {
//             key: '0-1-0',
//             label: 'Information',
//             isSecondChild: true,
//           },
//         ],
//       },
//     ],
//   },
// ];

function TreeView({ idx }) {
  const { workspace }: any = useSelector((state) => state);
  var { workspaceFolders } = workspace;
  let treeData;
  useEffect(() => {
    // treeData = [workspaceFolders[idx][`workspace${idx + 1}`]];
  }, [workspaceFolders]);
  // const {workspace}:any = useSelector(state=>state)
  // var { workspaceFolders } = workspace
  treeData = [workspaceFolders[idx]];
  console.log(treeData);

  // console.log(workspaceFolders[idx][`workspace${idx+1}`])
  return (
    <div className="tree">
      <Tree data={treeData} />
    </div>
  );
}

export default TreeView;
