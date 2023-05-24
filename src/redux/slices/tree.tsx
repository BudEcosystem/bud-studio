import { createSlice } from '@reduxjs/toolkit';

const generateInitialState = () => {
  return {
    createNewTreeFolder: false,
    createNewTreeDocument: false,
  };
};
export const treeSlice = createSlice({
  name: 'tree',
  initialState: generateInitialState,
  reducers: {
    createTreeNode: (state, action) => {
      const { type, content } = action.payload;
      if (type === 'doc') {
        console.log('doc', content);
      }
      if (type === 'folder') {
        console.log('folder', content);
      }
    },
    enableCreateNewTreeNode: (state, action) => {
      const { type } = action.payload;
      if (type === 'doc') {
        state.createNewTreeDocument = true;
      }
      if (type === 'folder') {
        state.createNewTreeFolder = true;
      }
    },
    disableCreateNewTreeNode: (state, action) => {
      const { type } = action.payload;
      if (type === 'doc') {
        state.createNewTreeDocument = false;
      }
      if (type === 'folder') {
        state.createNewTreeFolder = false;
      }
    },
  },
});

export const {
  createTreeNode,
  enableCreateNewTreeNode,
  disableCreateNewTreeNode,
} = treeSlice.actions;
export default treeSlice.reducer;
// tree structure
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
