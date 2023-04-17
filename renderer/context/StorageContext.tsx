import { ipcRenderer } from "electron";
import React, { createContext, useContext, useEffect, useState } from "react";
import { readDirectory } from "utils/fs-utils";

export const StorageContext = createContext({}); // create a new context

export const DataProvider = ({ children }) => {
  // create a provider component
  const [data, setData] = useState({}); // initialize the data state with an empty object
  const [fileSystem, setFileSystem] = useState(null); // initialize the data state with an empty object
  const [baseSavePath, setBaseSavePath] = useState(null); // initialize the data state with an empty object

  const [currentFile, setCurrentFile] = useState(null); // initialize the data state with an empty object

  const getFileSystem = async (bp) => {
    if (!bp) {
      return;
    }
    const root = readDirectory(bp + "/Bud-Studio");
    let optionsTemp = [];

    root.children.map((item) => {
      if (item.isDirectory) {
        let tempItem = {
          value: item.name,
          name: item.name,
          children: [],
        };

        if (item.isDirectory) {
          item.children.map((childAItem) => {
            if (childAItem.isDirectory) {
              let secondItem = {
                value: childAItem.name,
                name: childAItem.name,
                children: [],
              };

              childAItem.children.map((childBItem) => {
                if (childBItem.isDirectory) {
                  secondItem.children.push({
                    value: childBItem.name,
                    name: childBItem.name,
                    children: [],
                  });
                } else if (childBItem.name.includes(".json")) {
                  secondItem.children.push({
                    value: childBItem.filePath,
                    name: childBItem.name.split(".json")[0],
                    children: [],
                  });
                }
              });

              tempItem.children.push(secondItem);
            } else if (childAItem.name.includes(".json")) {
              tempItem.children.push({
                value: childAItem.name,
                name: childAItem.name.split(".json")[0],
                children: [],
              });
            }
          });

          optionsTemp.push(tempItem);
        } else {
          optionsTemp.push({
            value: item.name,
            name: item.name,
            children: [],
          });
        }
      }
    });

    setFileSystem(optionsTemp);
  };

  const getBasePath = async () => {
    //Todo : save to local storage
    const basePath = await ipcRenderer.invoke("app-get-path", "documents");
    setBaseSavePath(basePath);
    return basePath;
  };

  const refreshStorage = async () => {
    getBasePath().then((bp) => {
      getFileSystem(bp);
    });
  };

  useEffect(() => {
    getBasePath().then((bp) => {
      getFileSystem(bp);
    });
  }, []);

  const updateData = (newData) => {
    // create a function to update the data state
    setData({ ...data, ...newData }); // merge the new data with the existing data
  };

  const updateFileSystem = (newData) => {
    // create a function to update the data state
    setFileSystem({ ...fileSystem, ...newData }); // merge the new data with the existing data
  };

  const getProjectSplit = async () => {
    if(!currentFile) return null;
    // Given The file Path, find the first and second folder path
    const filePathObj = currentFile.split("/");

    return {
      workspace: filePathObj[filePathObj.length - 3],
      folder: filePathObj[filePathObj.length - 2],
      file: filePathObj[filePathObj.length - 1].split(".json")[0].replace("-", " ")
    };
  };

  const contextValue = {
    data,
    fileSystem,
    updateData,
    updateFileSystem,
    baseSavePath,
    refreshStorage,
    getProjectSplit,
    currentFile,
    setCurrentFile
  };

  return (
    // return the provider with the data state and update function as value
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export function useStorageContext() {
  return useContext(StorageContext);
}
