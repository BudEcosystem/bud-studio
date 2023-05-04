import Tree from "./Tree/Tree"
import "./TreeView.css"

const treeData = [
  {
    key: '0',
    label: 'Human Resources',
    isParent: true,
    children: [
      {
        key: '0-0',
        label: 'Employee detail',
      },
      {
        key: '0-1',
        label: 'Salary Details',
        children: [
          {
            key: '0-1-0',
            label: 'Information',
            isSecondChild: true,
            children: [
              {
                key: '0-1-0',
                label: 'Information',
                isSecondChild: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '0',
    label: 'Human Resources',
    isParent: true,
    children: [
      {
        key: '0-0',
        label: 'Employee detail',
      },
      {
        key: '0-1',
        label: 'Salary Details',
        children: [
          {
            key: '0-1-0',
            label: 'Information',
            isSecondChild: true,
          },
        ],
      },
    ],
  },
  {
    key: '0',
    label: 'Human Resources',
    isParent: true,
    children: [
      {
        key: '0-0',
        label: 'Employee detail',
      },
      {
        key: '0-1',
        label: 'Salary Details',
        children: [
          {
            key: '0-1-0',
            label: 'Information',
            isSecondChild: true,
          },
        ],
      },
    ],
  },
];

function TreeView({ color }) {
  return (
    <div className="tree">
      <Tree data={treeData} color={color} />
    </div>
  );
}

export default TreeView;
