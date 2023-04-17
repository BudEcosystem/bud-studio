import React, { useEffect } from "react";
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  FolderIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import styles from "./breadcrumbs.module.css";
import { useStorageContext } from "context/StorageContext";
import { generateColorOpacity } from "utils/color-generator";

export default function Breadcrumbs() {
  //@ts-ignore
  const { getProjectSplit,currentFile } = useStorageContext();

  const [projectSplit, setProjectSplit] = React.useState(null);

  useEffect(() => {
    const getItems = async () => {
      const items = await getProjectSplit();
      console.log("items", items);
      setProjectSplit(items);
    };

    getItems();

    return () => {};
  }, [currentFile]);

  return (
    <>
      {projectSplit && (
        <div className={styles.breadcrumbWrap}  style={{ backgroundColor: `${generateColorOpacity(projectSplit.workspace,0.4)}` }}>
          <div className={styles.workspaceBg}>
            <EllipsisHorizontalIcon style= {{marginRight:'0px'}}/>
          </div>
          <ChevronRightIcon className="icons" />
          <div className={styles.capitalized}>
            <FolderIcon className="icons" />
            <span>{projectSplit.folder}</span>
          </div>
          <ChevronRightIcon className="icons" />
          <div className={styles.capitalized}>
            <DocumentIcon className="icons" />
            <span>{projectSplit.file}</span>
          </div>
        </div>
      )}
    </>
  );
}
