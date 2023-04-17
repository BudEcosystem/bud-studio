import React, { useEffect, useRef } from "react";
import styles from "./workspace-viewer.module.css";
import {
  MagnifyingGlassIcon,
  FolderIcon,
  EllipsisHorizontalIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { generateColor } from "utils/color-generator";
import { createProjectFolder } from "actions/pages";

export default function WorkspaceViewer({
  selectedWokspace,
  getBasePath,
  refreshStorage,
}) {
  const addFolderInput = useRef(null);
  const { push } = useRouter();

  const [showAddFolder, setShowAddFolder] = React.useState(false);
  const [folders, setFolders] = React.useState(selectedWokspace as any);
  const [tempFolders, setTempFolders] = React.useState(selectedWokspace as any);
  const [searchKey, setSearchKey] = React.useState("");

  useEffect(() => {
    if (showAddFolder) addFolderInput.current.focus();
  }, [showAddFolder]);

  useEffect(() => {
    setFolders(selectedWokspace);
    setTempFolders(selectedWokspace);
  }, [selectedWokspace]);

  const addFolder = (event) => {
    if (event.key != "Enter") return;
    // Create New Directory
    const createFolder = async () => {
      const response = await createProjectFolder(
        getBasePath,
        event.target.value,
        selectedWokspace.name
      );
      console.log(response);
      refreshStorage();
    };

    createFolder();
    setShowAddFolder(!showAddFolder);
  };

  const goToEditor = (filePath) => {
    push(`/projects/view?page=bud&filePath=${filePath}`);
  };

  // Search functionality
  const searchFilesAndFolders = (event) => {
    setSearchKey(event.target.value);
  };

  const search = () => {
    console.log("Search Key", JSON.stringify(folders));

    let tempResult = {
      name: folders.name,
      value: folders.value,
      children: [],
    };
    console.log("optionsTemp folders", folders);
    let updatedWithSearch = folders.children.map((item: any, index: number) => {
      return {
        ...item,
        children: item.children.filter((data) => data.name.includes(searchKey)),
      };
    });

    console.log("Result", tempResult);
    console.log("optionsTemp updatedWithSearch", updatedWithSearch);
    setTempFolders({ ...folders, children: updatedWithSearch });
  };
  console.log("optionsTemp tempFolders", tempFolders);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call the search function when the user presses the enter key
      //handleSearch();
      search();
    }
  };

  return (
    <div className={styles.viewerWrap}>
      <div className={styles.viewerTop}>
        <div className={styles.spaceTitle}>
          <div
            className={styles.colorTag}
            style={{
              backgroundColor: `${generateColor(folders.name)}`,
            }}
          ></div>
          <p>{folders.name}</p>
          <div
            className={styles.addIcon}
            onClick={() => setShowAddFolder(true)}
          >
            +
          </div>
        </div>
        <div className={styles.moveOption}></div>
      </div>
      <div className={styles.searchWrap}>
        <MagnifyingGlassIcon className={styles.icons} />
        <input
          type="text"
          value={searchKey}
          placeholder="Search"
          onChange={searchFilesAndFolders}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.listWrap}>
        {showAddFolder && (
          <div className={`${styles.folder} ${styles.open}`}>
            <div className={styles.folderTitle}>
              <div className={styles.openIcon}></div>
              <div className={styles.folderIcon}>
                <FolderIcon className="icons" />
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
        {tempFolders.children.map((item: any, index: number) => (
          <div className={`${styles.folder} ${item.children.length > 0 ?styles.open:""}`}>
            <div className={styles.folderTitle}>
              <div className={styles.openIcon}></div>
              <div className={styles.folderIcon}>
                <FolderIcon className="icons" />
              </div>
              <p>{item.name}</p>
              <div className={styles.addIcon}>+</div>
              <div className={styles.actionIcon}>
                <EllipsisHorizontalIcon className="icons" />
              </div>
            </div>
            {item.children.length > 0 && (
              <div className={styles.folderList}>
                {item.children.map((file: any, index: number) => (
                  <div className={styles.fileItem}>
                    <DocumentIcon className="icons" />
                    <p
                      onClick={() => {
                        goToEditor(file.value);
                      }}
                    >
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
