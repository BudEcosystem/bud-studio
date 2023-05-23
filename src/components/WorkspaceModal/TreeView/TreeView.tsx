import { useEffect, useState, useCallback } from 'react';
import Tree from './Tree/Tree';
import {
  changeColor,
  createWorkspaces,
  editWorkspaceItem,
} from 'redux/slices/workspace';
import { useDispatch, useSelector } from 'react-redux';
import './TreeView.css';
import { v4 as uuidv4 } from 'uuid';

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
const getInitData = (list: any[]) => {
  return list.map((x) => {
    let children = x.children ?? [];
    if (children.length) {
      children = getInitData(children);
    }
    return {
      ...x,
      tId: uuidv4(),
      children,
    };
  });
};
function TreeView({
  filter,
  setShowColorDots,
  showDocumentOptions,
  setShowDocumentOptions,
}) {
  const [treeDataState, setTreeDataState] = useState(getInitData(treeData));
  const filterTreeData = (filter: string) => {
    if (!!filter) {
      const filterTree = (text: string, list: any[]) => {
        return list.map((t) => {
          let searchMatch = false;
          let children = t.children ?? [];
          if (t.children && t.children.length) {
            children = filterTree(text, t.children);
            searchMatch = children.some((ch: any) => ch.searchMatch);
          }
          return {
            ...t,
            filterApplied: true,
            searchMatch:
              t.label.toLowerCase().includes(text.toLowerCase()) || searchMatch,
            children,
          };
        });
      };

      const filtered = filterTree(filter, treeDataState);
      const setVisibilityIfParent = (list: any[]) => {
        return list.map((ls) => {
          let children = ls.children ?? [];
          const setNodeAsTrue = (list: any[]) => {
            return list.map((x) => {
              return {
                ...x,
                searchMatch: true,
              };
            });
          };
          const isAnyChild = children.some((x) => x.searchMatch);
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
      setTreeDataState(treeDataState);
    }
  };
  const getNode = (list, id) => {
    let item;
    const getArrayItem = (list) => {
      list.map((t) => {
        if (t.tId === id) {
          item = t;
        } else {
          if (t.children.length) {
            getArrayItem(t.children ?? []);
          }
        }
      });
    };
    getArrayItem(list);
    return item;
  };
  const addedNode = useCallback(
    (node: any, newNode: any) => {
      const temp = JSON.parse(JSON.stringify(treeDataState));
      const item: any = getNode(temp, node.tId);
      if (item) {
        item.children = item.children ?? [];
        const nodeObj = {
          ...newNode,
          tId: uuidv4(),
          children: [],
        };
        item.children.push(nodeObj);
      }
      setTreeDataState(temp);
    },
    [treeDataState]
  );
  useEffect(() => {
    filterTreeData(filter);
  }, [filter]);
  return (
    <div className="tree">
      <Tree
        data={treeDataState}
        addedNode={addedNode}
        setShowColorDots={setShowColorDots}
        showDocumentOptions={showDocumentOptions}
        setShowDocumentOptions={setShowDocumentOptions}
      />
    </div>
  );
}

export default TreeView;
