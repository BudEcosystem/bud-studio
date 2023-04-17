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

  useEffect(() => {
    if (showAddFolder) addFolderInput.current.focus();
  }, [showAddFolder]);

  useEffect(() => {
    setFolders(selectedWokspace);
  },[selectedWokspace]);

  const addFolder = (event) => {
    if (event.key != "Enter") return;
    // let space = {
    //   name: event.target.value,
    // };
    // folders.push(space);
    // setFolders(folders);

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
    push(`/projects/view?page=bud&filePath=${filePath}`).then(() => {

    });
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
        <input type="text" placeholder="Search" />
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
        {folders.children.map((item: any, index: number) => (
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
