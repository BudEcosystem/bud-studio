import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
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

const Menu = () => {
  // const [showAddFolder, setShowAddFolder] = useState(false);
  // const [showAddFile, setShowAddFile] = useState(false);
  const [openItems, setOpenItems] = useState([]); // State to track the open items
  const dispatch = useDispatch();
  const { tree }: any = useSelector((state) => state);
  const { showAddFolder, showAddFile } = tree;

  const initialList = [
    {
      id: uuidv4(),
      name: 'People Ops',
      folders: [
        {
          id: uuidv4(),
          name: 'Subfolder 1',
          files: [],
          folders: [],
        },
      ],
      files: [],
    },
    {
      id: uuidv4(),
      name: 'HR',
      folders: [
        {
          id: uuidv4(),
          name: 'Subfolder 3',
          files: [],
        },
      ],
      files: [
        {
          id: uuidv4(),
          name: 'Subfolder 3',
          files: [],
        },
      ],
    },
  ];
  const initialFiles = [
    {
      id: uuidv4(),
      name: 'Main File 1',
      files: [],
    },
    {
      id: uuidv4(),
      name: 'Main File 2',
      files: [],
    },
    // Add more initial files if needed
  ];
  const [folders, setFolders] = useState(initialList);
  const [files, setFiles] = useState(initialFiles);

  const addFolderInput = useRef(null);
  const addFileInput = useRef(null);
  console.log(folders);

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
    };

    setFolders([...folders, newFolder]);
    dispatch(setShowAddFolder(false));
    // setShowAddFolder(false);
  };
  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
    };

    setFiles([...files, newFile]);
    dispatch(setShowAddFile(false));
    // setShowAddFile(false);
  };
  const toggleItem = (event, id) => {
    console.log('clicked', id, event);
    const clickedElement = event.target;
    const isPlusClicked = clickedElement.classList.contains('plusIcon');
    if (!isPlusClicked) {
      event.stopPropagation();
      if (openItems.includes(id)) {
        setOpenItems(openItems.filter((item) => item !== id));
        console.log('clicked3');
        console.log(id, 'id', openItems);
      } else {
        setOpenItems([...openItems, id]);
        console.log(id, 'id', openItems);
        console.log('clicked4');
      }
    } else {
      console.log('plusClicked');
    }

    // console.log('')
    // const isChevronClicked = clickedElement.classList.contains('chevron');
    // console.log("clicked2", isChevronClicked)
    // if (isChevronClicked) {
    //   event.stopPropagation();
    //   if (openItems.includes(id)) {
    //     setOpenItems(openItems.filter((item) => item !== id));
    //     console.log("clicked3", isChevronClicked)
    //     console.log(id, 'id', openItems);
    //   } else {
    //     setOpenItems([...openItems, id]);
    //     console.log(id, 'id', openItems);
    //     console.log("clicked4", isChevronClicked)
    //   }
    // }
  };

  // const toggleAddFolder = () => {
  //   setShowAddFolder(!showAddFolder);
  //   if (showAddFolder) addFolderInput.current.value = ''; // Clear input field
  // };

  // const toggleAddFile = () => {
  //   setShowAddFile(!showAddFile);
  //   if (showAddFile) addFileInput.current.value = ''; // Clear input field
  // };
  return (
    <div className="main">
      {/* <div className="viewerTop">
        <div className="spaceTitle">
          <p>Accubits</p>
          <div className="addIcon" onClick={toggleAddFolder}>
            <FaFolder className="icons" /> <span>+</span>
          </div>

          <div className="addIcon" onClick={toggleAddFile}>
            <AiOutlineFileText className="icons" />
            <span>+</span>
          </div>
        </div>
      </div> */}
      {showAddFolder && (
        <div className="folder">
          <div className="folderTitle">
            <div className="openIcon"></div>
            <div className="folderIcon">
              <FaFolder className="icons" />
            </div>
            <input
              type="text"
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
              <AiOutlineFileText className="icons" />
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

      <ul className="tree">
        {folders.map((item) => (
          <FolderItem
            key={item.id}
            item={item}
            parentId={null}
            openItems={openItems}
            toggleItem={toggleItem}
          />
        ))}
        {files.map((file) => (
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
  const addFileInput = useRef(null);
  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
    };

    const updatedFiles = [...file.files, newFile]; // Create a new array with the updated files
    file.files = updatedFiles;
    setShowAddFile(false);
  };
  return (
    <li className={parentId !== null ? 'childFile' : 'parentFile'}>
      <details>
        <summary>
          <div className="showName">
            <div className="fileIconContainer">
              {openItems.includes(id) ? (
                <FileIcon />
              ) : (
                // <FiChevronRight
                //   className="right-icon chevron"
                //   onClick={(event) => toggleItem(event, id)}
                //   onClickCapture={(event) => event.stopPropagation()}
                // />
                <FileIcon />
                // <FiChevronDown
                //   className="down-icon chevron"
                //   onClick={(event) => toggleItem(event, id)}
                //   onClickCapture={(event) => event.stopPropagation()}
                // />
              )}
            </div>
            {/* <div onClick={() => toggleItem(id)}> */}
            {/* </div> */}
            {/* <AiOutlineFileText className="folder-icon" /> */}
            <span className="file-name">{file.name}</span>
          </div>
          {/* <div className="showIcons">
            <div className="addIcon" onClick={() => setShowAddFile(true)}>
              <AiOutlineFileText className="icons" />
              <span>+</span>
            </div>
          </div> */}
        </summary>

        {showAddFile && (
          <div className="folder">
            <div className="folderTitle">
              <div className="openIcon"></div>
              <div className="folderIcon">
                <AiOutlineFileText className="icons" />
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
const FolderItem = ({ item, parentId, openItems, toggleItem }) => {
  const id = parentId ? `${parentId}.${item.id}` : item.id;
  // const hasNestedItems = item.files.length > 0 || item.folders.length > 0;

  const [showoptionsTree, setShowoptionsTree] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const addFolderInput = useRef(null);
  const addFileInput = useRef(null);
  console.log(isFolderOpen, item, openItems);

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
    };

    item.folders.push(newFolder);
    setShowAddFolder(false);
  };

  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
    };

    const updatedFiles = [...item.files, newFile]; // Create a new array with the updated files
    item.files = updatedFiles;
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
                ? 'linear-gradient(101deg, rgba(138, 142, 233, 0.16) 0%, rgba(17, 21, 18, 0.00) 100%)'
                : '',
          }}
        >
          <div className="showName">
            <div className="showName folderArrow">
              {isFolderOpen ? (
                <FolderArrow color={'rgba(147, 154, 255, 1)'} />
              ) : (
                // <FiChevronRight
                //   className="right-icon chevron"
                //   onClick={(event) => toggleItem(event, id)}
                //   onClickCapture={(event) => event.stopPropagation()}
                // />
                <div style={{ transform: 'rotate(-90deg)' }}>
                  <FolderArrow color={'rgba(123, 131, 136, 1)'} />
                </div>
                // <FiChevronDown
                //   className="down-icon chevron"
                //   onClick={(event) => toggleItem(event, id)}
                //   onClickCapture={(event) => event.stopPropagation()}
                // />
              )}
            </div>
            {/* <div onClick={() => toggleItem(id)}> */}
            {isFolderOpen ? <FolderIcon /> : <FolderIcon2 />}
            {/* <FolderIcon /> */}
            {/* <FaFolder className="folder-icon" /> */}
            {/* </div> */}
            <span className="folder-name">{item.name}</span>
          </div>
          {/* <div className="showIcons">
            <div className="addIcon" onClick={() => setShowAddFolder(true)}>
              <FaFolder className="icons" />
              <span>+</span>
            </div>
            <div className="addIcon" onClick={() => setShowAddFile(true)}>
              <AiOutlineFileText className="icons" />
              <span>+</span>
            </div>
          </div> */}
        </summary>
        {isFolderOpen && (
          <div
            className="plusIcon"
            onClick={(event) => {
              event.stopPropagation();
              // setShowAddFolder(true);
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
                <FaFolder className="icons" />
              </div>
              <input
                type="text"
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
                <AiOutlineFileText className="icons" />
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
          {item?.folders?.map((folder, folderIndex) => (
            <FolderItem
              key={folder.id}
              item={folder}
              parentId={id}
              openItems={openItems}
              toggleItem={toggleItem}
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
