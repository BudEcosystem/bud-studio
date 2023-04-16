import { ipcRenderer } from "electron";
import React, { createContext, useContext, useEffect, useState } from "react";
import { readDirectory } from "utils/fs-utils";

export const StorageContext = createContext({}); // create a new context

export const DataProvider = ({ children }) => {
  // create a provider component
  const [data, setData] = useState({}); // initialize the data state with an empty object
  const [fileSystem, setFileSystem] = useState({}); // initialize the data state with an empty object
  const [baseSavePath, setBaseSavePath] = useState(null); // initialize the data state with an empty object

  useEffect(() => {
    // Base Path
    const getBasePath = async () => {
      //Todo : save to local storage
      const basePath = await ipcRenderer.invoke("app-get-path", "documents");
      setBaseSavePath(basePath);
    };

    // File System
    const getFileSystem = async () => {
        console.log("Context",baseSavePath)
      if (!baseSavePath) {
        return;
      }
      const root = readDirectory(baseSavePath + "/Bud-Studio");
      let optionsTemp = [];

      root.children.map((item) => {
        if (item.isDirectory) {
          let tempItem = {
            value: item.name,
            label: item.name,
            children: [],
          };

          if (item.isDirectory) {
            item.children.map((childAItem) => {
              if (childAItem.isDirectory) {
                let secondItem = {
                  value: childAItem.name,
                  label: childAItem.name,
                  children: [],
                };

                childAItem.children.map((childBItem) => {
                  if (childBItem.isDirectory) {
                    secondItem.children.push({
                      value: childBItem.name,
                      label: childBItem.name,
                      children: [],
                    });
                  } else if (childBItem.name.includes(".json")) {
                    secondItem.children.push({
                      value: childBItem.filePath,
                      label: childBItem.name.split(".json")[0],
                      children: [],
                    });
                  }
                });

                tempItem.children.push(secondItem);
              } else if (childAItem.name.includes(".json")) {
                tempItem.children.push({
                  value: childAItem.name,
                  label: childAItem.name.split(".json")[0],
                  children: [],
                });
              }
            });

            optionsTemp.push(tempItem);
          } else {
            optionsTemp.push({
              value: item.name,
              label: item.name,
              children: [],
            });
          }
        }
      });

      console.log("Context",optionsTemp);

      setFileSystem(optionsTemp);
    };

    getBasePath();
    getFileSystem();
  }, []);

  const updateData = (newData) => {
    // create a function to update the data state
    setData({ ...data, ...newData }); // merge the new data with the existing data
  };

  const updateFileSystem = (newData) => {
    // create a function to update the data state
    setFileSystem({ ...fileSystem, ...newData }); // merge the new data with the existing data
  };

  const contextValue = {
    data,
    fileSystem,
    updateData,
    updateFileSystem,
    baseSavePath,
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
