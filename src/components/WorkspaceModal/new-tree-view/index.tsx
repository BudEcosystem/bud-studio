import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAddFile, setShowAddFolder } from 'redux/slices/tree';
import {
  FileIcon,
  FolderArrow,
  FolderIcon,
  FolderIcon2,
} from '../WorkspaceIcons';
import OptionsTree from './OptionsTree';
import {
  addFileRedux,
  addFolderRedux,
  addSubFilesRedux,
  addSubFoldersRedux,
  setCurrentSelectedDocument,
} from 'redux/slices/workspace';
import { setNodeIDs } from '@/redux/slices/activestate';

const Menu = ({ workspaceItem }) => {
  const [openItems, setOpenItems] = useState([]);
  const dispatch = useDispatch();
  const { tree, workspace }: any = useSelector((state) => state);
  const { showAddFolder, showAddFile } = tree;
  const [folders, setFolders] = useState(workspaceItem.folders);
  const [files, setFiles] = useState(workspaceItem.files);
  const addFolderInput = useRef(null);
  const addFileInput = useRef(null);

  useEffect(() => {
    if (showAddFolder) addFolderInput.current.focus();
    if (showAddFile) addFileInput.current.focus();
  }, [showAddFolder, showAddFile]);

  const addFolder = (event) => {
    if (event.key !== 'Enter') return;

    const newFolder = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
      folders: [],
      workspaceUUID: workspaceItem.uuid,
    };

    setFolders([...folders, newFolder]);
    dispatch(setShowAddFolder(false));
    dispatch(addFolderRedux({ newFolder, workspaceUUID: workspaceItem.uuid }));
  };
  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
      workspaceUUID: workspaceItem.uuid,
    };
    const newFileForWorkspaceDocs = {
      childOf: null,
      customProperties: [],
      name: newFile.name,
      properties: [],
      type: 'doc',
      uuid: newFile.id,
      workSpaceUUID: workspaceItem.uuid,
    };
    setFiles([...files, newFile]);
    dispatch(setShowAddFile(false));
    dispatch(
      addFileRedux({
        newFile,
        workspaceUUID: workspaceItem.uuid,
        newFileForWorkspaceDocs,
      })
    );
  };
  const toggleItem = (event, id) => {
    console.log('clicked', id, event);
    const clickedElement = event.target;
    const isPlusClicked = clickedElement.classList.contains('plusIcon');
    if (!isPlusClicked) {
      event.stopPropagation();
      if (openItems.includes(id)) {
        setOpenItems(openItems.filter((item) => item !== id));
      } else {
        setOpenItems([...openItems, id]);
      }
    } else {
    }
  };

  const lineStyle = {
    '--lineColor': workspaceItem.color,
  };
  return (
    <div className="main">
      {showAddFolder && (
        <div className="folder">
          <div
            className="folderTitle"
            style={{ marginLeft: '10px', marginBottom: 'unset' }}
          >
            <div className="openIcon"></div>
            <div className="folderIcon">
              <FolderIcon2 />
            </div>
            <input
              type="text"
              className="inputTree"
              placeholder="Folder name"
              ref={addFolderInput}
              onKeyUp={(event) => addFolder(event)}
            />
          </div>
        </div>
      )}
      {showAddFile && (
        <div className="folder">
          <div
            className="folderTitle"
            style={{ marginLeft: '10px', marginBottom: 'unset' }}
          >
            <div className="openIcon"></div>
            <div className="folderIcon">
              <FileIcon />
            </div>
            <input
              type="text"
              className="inputTree"
              placeholder="File name"
              ref={addFileInput}
              onKeyUp={(event) => addFile(event)}
            />
          </div>
        </div>
      )}

      <ul className="tree" style={lineStyle}>
        {workspaceItem.folders.map((item) => (
          <FolderItem
            key={item.id}
            item={item}
            parentId={null}
            openItems={openItems}
            toggleItem={toggleItem}
            workspaceItemColor={workspaceItem.color}
          />
        ))}
        {workspaceItem.files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            parentId={null}
            openItems={openItems}
            toggleItem={toggleItem}
          />
        ))}
      </ul>
    </div>
  );
};
const FileItem = ({ file, parentId, openItems, toggleItem }) => {
  const id = parentId ? `${parentId}.${file.id}` : file.id;
  const [showAddFile, setShowAddFile] = useState(false);
  const dispatch = useDispatch();
  const addFileInput = useRef(null);
  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
    };
    dispatch(
      addSubFilesRedux({
        newFile,
        subFileId: file.id,
        workspaceUUID: file.workspaceUUID,
      })
    );

    setShowAddFile(false);
  };

  const lineStyle = {
    '--leftLine': parentId === null ? '' : '215px',
  };

  const fileClickHandler = () => {
    console.log(file);
    dispatch(setCurrentSelectedDocument({ id: null }));
    // navPathHandler(newNode);
    setTimeout(() => {
      dispatch(
        setCurrentSelectedDocument({
          uuid: file.id,
          workSpaceUUID: file.workspaceUUID,
        })
      );
      dispatch(
        setNodeIDs({
          uuid: file.id,
          workSpaceUUID: file.workspaceUUID,
        })
      );
    });
  };
  return (
    <li
      className={parentId !== null ? 'childFile' : 'parentFile'}
      style={lineStyle}
      onClick={fileClickHandler}
    >
      <details>
        <summary>
          <div className="showName">
            <div className="fileIconContainer">
              {openItems.includes(id) ? <FileIcon /> : <FileIcon />}
            </div>
            <span className="file-name">{file.name}</span>
          </div>
        </summary>

        {showAddFile && (
          <div className="folder">
            <div className="folderTitle">
              <div className="openIcon"></div>
              <div className="folderIcon">
                <FileIcon />
              </div>
              <input
                type="text"
                placeholder="File name"
                ref={addFileInput}
                onKeyUp={(event) => addFile(event)}
              />
            </div>
          </div>
        )}
        <ul>
          {file?.files?.map((file, fileIndex) => (
            <FileItem
              key={fileIndex}
              file={file}
              parentId={id}
              openItems={openItems}
              toggleItem={toggleItem}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

const hexToRGBA = (hex, opacity) => {
  const r = parseInt(hex?.slice(1, 3), 16);
  const g = parseInt(hex?.slice(3, 5), 16);
  const b = parseInt(hex?.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
const FolderItem = ({
  item,
  parentId,
  openItems,
  toggleItem,
  workspaceItemColor,
}) => {
  const id = parentId ? `${parentId}.${item.id}` : item.id;
  const dispatch = useDispatch();
  const rgbaColor = hexToRGBA(workspaceItemColor, 0.3);
  const [showoptionsTree, setShowoptionsTree] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const addFolderInput = useRef(null);
  const addFileInput = useRef(null);

  useEffect(() => {
    setIsFolderOpen(openItems.includes(item.id));
  }, [openItems, item.id]);

  const addFolder = (event) => {
    if (event.key !== 'Enter') return;

    const newFolder = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
      folders: [],
      workspaceUUID: item.workspaceUUID,
    };

    dispatch(
      addSubFoldersRedux({
        newFolder,
        subFolderId: item.id,
        workspaceUUID: item.workspaceUUID,
      })
    );
    setShowAddFolder(false);
  };

  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
      workspaceUUID: item.workspaceUUID,
    };
    const newFileForWorkspaceDocs = {
      childOf: parentId,
      customProperties: [],
      name: newFile.name,
      properties: [],
      type: 'doc',
      uuid: newFile.id,
      workSpaceUUID: item.workspaceUUID,
    };
    dispatch(
      addSubFilesRedux({
        newFile,
        subFileId: item.id,
        workspaceUUID: item.workspaceUUID,
        newFileForWorkspaceDocs,
      })
    );

    setShowAddFile(false);
  };

  return (
    <li className={parentId === null ? 'rootFolderLi' : 'childFolder'}>
      <details style={{ position: parentId === null ? 'relative' : 'none' }}>
        <summary
          className={parentId === null ? 'rootFolder chevron' : 'summaryChild'}
          onClick={(event) => {
            if (!event.target.classList.contains('plusIcon')) {
              toggleItem(event, item.id);
              console.log(event, 'sdfg');
            } else {
              event.stopPropagation();
            }
          }}
          // onClickCapture={(event) => event.stopPropagation()}
          style={{
            background:
              isFolderOpen && parentId === null
                ? `linear-gradient(101deg, ${rgbaColor} 0%, rgba(17, 21, 18, 0.00) 100%)`
                : '',
          }}
        >
          <div className="showName">
            <div className="showName folderArrow">
              {isFolderOpen ? (
                <FolderArrow color={workspaceItemColor} />
              ) : (
                <div style={{ transform: 'rotate(-90deg)' }}>
                  <FolderArrow color={'rgba(123, 131, 136, 1)'} />
                </div>
              )}
            </div>
            {isFolderOpen ? (
              <FolderIcon color={workspaceItemColor} />
            ) : (
              <FolderIcon2 />
            )}
            <span className="folder-name">{item.name}</span>
          </div>
        </summary>
        {isFolderOpen && (
          <div
            className="plusIcon"
            style={{ marginTop: parentId === null ? '5px' : '' }}
            onClick={(event) => {
              event.stopPropagation();
              setShowoptionsTree(!showoptionsTree);
            }}
          >
            +
          </div>
        )}
        {isFolderOpen && showoptionsTree && (
          <div className="optionTreeContainer">
            <OptionsTree
              setShowAddFolder={setShowAddFolder}
              setShowAddFile={setShowAddFile}
              setShowoptionsTree={setShowoptionsTree}
            />
          </div>
        )}
        {showAddFolder && (
          <div className="folder">
            <div className="folderTitle">
              <div className="openIcon"></div>
              <div className="folderIcon">
                <FolderIcon2 />
              </div>
              <input
                type="text"
                className="inputTree"
                placeholder="Folder name"
                ref={addFolderInput}
                onKeyUp={(event) => addFolder(event)}
              />
            </div>
          </div>
        )}
        {showAddFile && (
          <div className="folder">
            <div className="folderTitle">
              <div className="openIcon"></div>
              <div className="folderIcon">
                <FileIcon />
              </div>
              <input
                type="text"
                className="inputTree"
                placeholder="File name"
                ref={addFileInput}
                onKeyUp={(event) => addFile(event)}
              />
            </div>
          </div>
        )}
        <ul>
          {item?.folders?.map((folder, folderIndex) => (
            <FolderItem
              key={folder.id}
              item={folder}
              parentId={id}
              openItems={openItems}
              toggleItem={toggleItem}
              workspaceItemColor={workspaceItemColor}
            />
          ))}
          {item.files.map((file, fileIndex) => (
            <FileItem
              key={fileIndex}
              file={file}
              parentId={id}
              openItems={openItems}
              toggleItem={toggleItem}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

export default Menu;
