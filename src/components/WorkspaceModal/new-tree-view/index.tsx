import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const Menu = () => {
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [openItems, setOpenItems] = useState([]); // State to track the open items

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
    setShowAddFolder(false);
  };
  const addFile = (event) => {
    if (event.key !== 'Enter') return;

    const newFile = {
      id: uuidv4(),
      name: event.target.value || 'untitled',
      files: [],
    };

    setFiles([...files, newFile]);
    setShowAddFile(false);
  };
  const toggleItem = (event, id) => {
    const clickedElement = event.target;
    const isChevronClicked = clickedElement.classList.contains('chevron');
    if (isChevronClicked) {
      event.stopPropagation();
      if (openItems.includes(id)) {
        setOpenItems(openItems.filter((item) => item !== id));
        console.log(id, 'id');
      } else {
        setOpenItems([...openItems, id]);
        console.log(id, 'id');
      }
    }
  };

  const toggleAddFolder = () => {
    setShowAddFolder(!showAddFolder);
    if (showAddFolder) addFolderInput.current.value = ''; // Clear input field
  };

  const toggleAddFile = () => {
    setShowAddFile(!showAddFile);
    if (showAddFile) addFileInput.current.value = ''; // Clear input field
  };
  return (
    <div className="main">
      <div className="viewerTop">
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
      </div>
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
    <li>
      <details>
        <summary>
          <div className="showName">
            <div>
              {openItems.includes(id) ? (
                <FiChevronRight
                  className="right-icon chevron"
                  onClick={(event) => toggleItem(event, id)}
                  onClickCapture={(event) => event.stopPropagation()}
                />
              ) : (
                <FiChevronDown
                  className="down-icon chevron"
                  onClick={(event) => toggleItem(event, id)}
                  onClickCapture={(event) => event.stopPropagation()}
                />
              )}
            </div>
            {/* <div onClick={() => toggleItem(id)}> */}
            {/* </div> */}
            <AiOutlineFileText className="folder-icon" />
            <span className="file-name">{file.name}</span>
          </div>
          <div className="showIcons">
            <div className="addIcon" onClick={() => setShowAddFile(true)}>
              <AiOutlineFileText className="icons" />
              <span>+</span>
            </div>
          </div>
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
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);

  const addFolderInput = useRef(null);
  const addFileInput = useRef(null);
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
    <li>
      <details>
        <summary>
          <div className="showName">
            <div>
              {openItems.includes(id) ? (
                <FiChevronRight
                  className="right-icon chevron"
                  onClick={(event) => toggleItem(event, id)}
                  onClickCapture={(event) => event.stopPropagation()}
                />
              ) : (
                <FiChevronDown
                  className="down-icon chevron"
                  onClick={(event) => toggleItem(event, id)}
                  onClickCapture={(event) => event.stopPropagation()}
                />
              )}
            </div>
            {/* <div onClick={() => toggleItem(id)}> */}
            <FaFolder className="folder-icon" />
            {/* </div> */}
            <span className="folder-name">{item.name}</span>
          </div>
          <div className="showIcons">
            <div className="addIcon" onClick={() => setShowAddFolder(true)}>
              <FaFolder className="icons" />
              <span>+</span>
            </div>
            <div className="addIcon" onClick={() => setShowAddFile(true)}>
              <AiOutlineFileText className="icons" />
              <span>+</span>
            </div>
          </div>
        </summary>
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
