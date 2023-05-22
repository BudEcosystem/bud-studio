import { useEffect, useState } from 'react';
import Tree from './Tree/Tree';
import './TreeView.css';

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

function TreeView({filter}) {
  const [treeDataState, setTreeDataState] = useState(treeData);
  const filterTreeData = (filter:string) => {
    if(!!filter){
      const filterTree = (text: string, list: any[]) => {
        return list.map(t => {
          let searchMatch = false;
          let children = t.children ?? [];
          if (t.children && t.children.length) {
              children = filterTree(text, t.children);
              searchMatch = children.some((ch:any) => ch.searchMatch);
          }
          return {
            ...t,
            filterApplied:true,
            searchMatch:
              t.label.toLowerCase().includes(text.toLowerCase()) || searchMatch,
            children
          }
        })
      }

      const filtered = filterTree(filter, treeData);
      const setVisibilityIfParent = (list:any[]) =>{
        return list.map((ls) => {
          let children = ls.children ?? [];
          const setNodeAsTrue = (list:any[]) => {
            return list.map((x) => {
              return {
                ...x,
                searchMatch: true,
              };
            });
          };
          const isAnyChild = children.some(x => x.searchMatch);
          if (ls.searchMatch && !isAnyChild) {
            children = setNodeAsTrue(children);
          }
          return {
            ...ls,
            children,
          }; 
        });
      };
      setTreeDataState(setVisibilityIfParent(filtered));
    } else {
      setTreeDataState(treeData)
    }
  }
  useEffect(() => {
    filterTreeData(filter);
  }, [filter]);
  return (
    <div className="tree">
      <Tree data={treeDataState} />
    </div>
  );
}

export default TreeView;
