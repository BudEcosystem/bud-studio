import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UpArrow } from '../../../OmniSearch/Panel/PanelOption/PanelSvgIcons';
import { Folder, WhiteFolder, Page } from './TreeSvgIcons';
import './Tree.css';

function Tree({
  data = [],
  setShowColorDots,
  showDocumentOptions,
  setShowDocumentOptions,
  addedNode,
}: any) {
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
        {data.map((tree: any, i) => (
          <TreeNode
            key={tree.tId + i}
            node={tree}
            isFirst={i === i}
            isVisible={tree?.filterApplied ? tree.searchMatch : true}
            isActive={activeNode === tree}
            onClick={handleNodeClick}
            addedNode={(e, newNode) => addedNode(e ?? tree, newNode)}
            activeNode
            showDocumentOptions={showDocumentOptions}
            setShowDocumentOptions={setShowDocumentOptions}
            setShowColorDots={setShowColorDots}
          />
        ))}
      </ul>
    </div>
  );
}

function TreeNode({
  node,
  isFirst,
  isActive,
  onClick,
  activeNode,
  isVisible,
  showDocumentOptions,
  setShowDocumentOptions,
  setShowColorDots,
  addedNode,
}: any) {
  const [childVisible, setChildVisiblity] = useState(!node.isParent);
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const hasChild = !!node.children;
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
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

  const showFlyOut = (e: any) => {
    e.stopPropagation();
    setShowDocumentOptions(!showDocumentOptions);
    setShowColorDots(false);
  };
  const addNewMenu = (node: any, newNode: any) => {
    if (addedNode) {
      addedNode(node, newNode);
    }
    setAddMode(false);
  };
  const activateAddmode = (e) => {
    e.stopPropagation();
    setAddMode(true);
  };
  const newMenuAddHandler = (newNode: any) => {
    if (addNewMenu) {
      addNewMenu(node, newNode);
    }
  };
  return (
    isVisible && (
      <li className="treeLiItem">
        <div
          className={`treeList${isFirst ? ' first' : ''} tree-header`}
          style={node.isParent && childVisible ? isParentStyle : {}}
          onClick={toggleChildVisibility}
        >
          {/* {hasChild && node.isParent && (
          <div className={`arrow ${childVisible ? 'active' : ''}`}>
            <UpArrow stroke={`${childVisible ? color : '#7B8388'}`} />
          </div>
        )} */}
          {/* <div className="folderImgContainer"> */}

          {/* {childVisible && node.isParent ? (
            <Folder fill={color} stroke={color} />
          ) : !childVisible && node.isParent ? (
            <WhiteFolder />
          ) : (
            <Page />
          )}
        </div>

        <div className="treeLabel">{node.label}</div> */}

          {/* {childVisible && node.isParent && <div onClick={showFlyOut} className="plus">+</div>} */}
          {/* <div onClick={() => addNewMenu(node,newNodeState)} className="plus">+</div> */}
          {/* <div onClick={showFlyOut} className="plus">+</div> */}
          {editMode ? (
            <ListItem
              color={color}
              label={node.label}
              isFolder={node.type === 'folder'}
              childVisible={childVisible}
              isParent={node.isParent}
              isEdit={editMode}
            />
          ) : (
            <ListItem
              color={color}
              label={node.label}
              isFolder={node.type === 'folder'}
              childVisible={childVisible}
              isParent={node.isParent}
              addNewItem={activateAddmode}
            />
          )}
        </div>
        {hasChild && childVisible && (
          <div className={`treeChildLabel${childVisible ? ' show' : ''}`}>
            <ul className="treeChildLabelUl">
              {/* <Tree data={node.children} color={color} /> */}
              {node.children.map((child, index) => (
                <TreeNode
                  key={child.tId + index}
                  node={child}
                  isFirst=""
                  isVisible={child?.filterApplied ? child.searchMatch : true}
                  isActive={activeNode === child}
                  onClick={onClick}
                  activeNode
                  showDocumentOptions={showDocumentOptions}
                  setShowDocumentOptions={setShowDocumentOptions}
                  setShowColorDots={setShowColorDots}
                  addedNode={(e: any, newNode: any) =>
                    addNewMenu(e ?? child, newNode)
                  }
                />
              ))}
              {addMode && (
                <li className="treeLiItem">
                  <div
                    className={`treeList${isFirst ? ' first' : ''} tree-header`}
                  >
                    <ListItem
                      color={color}
                      label=""
                      isFolder={node.type === 'folder'}
                      childVisible={false}
                      isParent={false}
                      onNewMenuAdd={newMenuAddHandler}
                      isEdit
                    />
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </li>
    )
  );
}
function ListItem({
  color,
  isFolder,
  label,
  isEdit,
  addNewItem,
  childVisible,
  isParent,
  onNewMenuAdd,
}) {
  const [newLabel, setNewLabel] = useState('');
  useEffect(() => {
    setNewLabel(label);
  }, [label]);
  const updateLabelHandler = (e) => {
    const { value } = e.target;
    setNewLabel(value);
  };
  const createNewItem = (e) => {
    if (e.key === 'Enter') {
      if (onNewMenuAdd) {
        const { value } = e.target;
        const obj = {
          label: value,
          type: isFolder ? 'Folder' : 'file',
        };
        onNewMenuAdd(obj);
      }
    }
  };
  return (
    <div className="item-wrapper">
      <div className="item-collaps-arrow">
        {isParent && (
          <div className={`arrow ${childVisible ? 'active' : ''}`}>
            <UpArrow stroke={`${childVisible ? color : '#7B8388'}`} />
          </div>
        )}
      </div>
      <div className="item-Icon-wrapper">
        {isFolder && <Folder fill={color} stroke={color} />}
        {!isFolder && <Page />}
      </div>
      <div className="item-label-wrapper">
        {isEdit ? (
          <input
            type="text"
            className="item-label-input"
            value={newLabel}
            onInput={updateLabelHandler}
            onKeyUp={createNewItem}
          />
        ) : (
          <div className="item-label">{label}</div>
        )}
      </div>
      <div className="item-action-wrapper">
        {!isEdit && (
          <button onClick={addNewItem} type="button" className="addNew">
            +
          </button>
        )}
      </div>
    </div>
  );
}
export default Tree;
