import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UpArrow } from '../../../OmniSearch/Panel/PanelOption/PanelSvgIcons';
import { Folder, WhiteFolder, Page } from './TreeSvgIcons';
import './Tree.css';

function Tree({ data = [] }) {
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (node) => {
    if (activeNode === node) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
    }
  };
  return (
    <div className="treeViewContainer">
      <ul className="treeViewList">
        {data.map((tree, i) => (
          <TreeNode
            key={tree.id}
            node={tree}
            isFirst={i === i}
            isActive={activeNode === tree}
            onClick={handleNodeClick}
            activeNode
          />
        ))}
      </ul>
    </div>
  );
}

function TreeNode({ node, isFirst, isActive, onClick, activeNode }) {
  const [childVisible, setChildVisiblity] = useState(!node.isParent);
  const { workspace }: any = useSelector((state) => state);
  let { color } = workspace;
  const hasChild = !!node.children;

  const isParentStyle = {
    background: `linear-gradient(90.28deg, ${`${color}20`} 4.88%, rgba(17, 21, 18, 0) 91.54%)`,
    borderRadius: '10px',
    cursor: 'pointer',
    '::after': 'border-bottom: 0px',
  };
  const toggleChildVisibility = () => {
    node.isParent ? setChildVisiblity((v) => !v) : setChildVisiblity(true);
    onClick(node);
  };
  return (
    <li className="treeLiItem">
      <div
        className={`treeList${isFirst ? ' first' : ''}`}
        style={node.isParent && childVisible ? isParentStyle : {}}
        onClick={toggleChildVisibility}
      >
        {hasChild && node.isParent && (
          <div className={`arrow ${childVisible ? 'active' : ''}`}>
            <UpArrow stroke={`${childVisible ? color : '#7B8388'}`} />
          </div>
        )}
        <div className="folderImgContainer">
          {childVisible && node.isParent ? (
            <Folder fill={color} stroke={color} />
          ) : !childVisible && node.isParent ? (
            <WhiteFolder />
          ) : (
            <Page />
          )}
        </div>

        <div className="treeLabel">{node.label}</div>

        {childVisible && node.isParent && <div className="plus">+</div>}
      </div>
      {hasChild && childVisible && (
        <div className={`treeChildLabel${childVisible ? ' show' : ''}`}>
          <ul className="treeChildLabelUl">
            {/* <Tree data={node.children} color={color} /> */}
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                isFirst=""
                isActive={activeNode === child}
                onClick={onClick}
                activeNode
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Tree;
