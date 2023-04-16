import React, { useEffect, useRef, useState } from "react";
import { Cascader } from "antd";
import type { DefaultOptionType } from "antd/es/cascader";
import { ipcRenderer } from "electron";
import { readDirectory } from "utils/fs-utils";
import { Tag } from "antd";

interface Option {
  value: string;
  label: string;
  children?: Option[];
  disabled?: boolean;
}

const BudEditorPragraphView = ({
  data,
  config,
  readOnly,
  defaultPlaceholder,
  onKeyUpHandler,
  onDataChange,
}) => {
  const wrapperRef = useRef(null);
  const [text, setText] = useState(data.text || "");
  const [preserveBlank, setPreserveBlank] = useState(
    config.preserveBlank !== undefined ? config.preserveBlank : false
  );
  const [isCaseCaderVisible, setIsCaseCaderVisible] = useState(false);
  const [options, setOptions] = useState([
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
            {
              value: "xiasha",
              label: "Xia Sha",
              disabled: true,
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua men",
            },
          ],
        },
      ],
    },
  ]);
  const [currentEditIndex, setCurrentEditIndex] = useState(-1);
  const [currentPosition, setCurrentPosition] = useState(-1);

  function getCursorPosition(el) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(el);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const cursorPosition = preSelectionRange.toString().length;
    return cursorPosition;
  }

  function handleKeyPress(event) {
    console.log("Key pressed:", event.key);

    console.log("Visibility", isCaseCaderVisible);

    // TODO: Need to fix this
    setIsCaseCaderVisible(false);

    if (event.key === "@") {
      setIsCaseCaderVisible(true);
      const ela = getCursorPosition(wrapperRef.current);
      setCurrentPosition(ela);
    }

    console.log("Value", wrapperRef.current.innerHTML);

    let newData = wrapperRef.current.innerHTML;
    onDataChange(newData);
  }

  const clickedOnMe = () => {
    console.log("");
  };

  const getPageLink = (selectedOptions) => {
    const location = `/projects/view?page=hii&filePath=${
      selectedOptions[selectedOptions.length - 1].value
    }`;
    const urlObj = new URL(location, "https://example.com"); // create a URL object from the URL string
    const filePath = urlObj.searchParams.get("filePath"); // get the value of the 'filePath' parameter from the URL's search params
    const parts = filePath.split("/"); // split the file path by '/' into an array of parts
    const lastPart = parts[parts.length - 1]; // get the last element of the array

    return `<a class="page-link" onClick="window.location.href='${location}'" target="_self" href="${location}">${
      lastPart.split(".")[0]
    }</a>`;
  };

  function useDebounce(callback, delay) {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          callback();
        }, delay)
      );
    }, [callback, delay]);

    return () => {
      clearTimeout(timer);
    };
  }

  const onChange = (value: string[], selectedOptions: Option[]) => {
    console.log("Selected values", value, selectedOptions);
    let editedText = wrapperRef.current.innerHTML;
    const finaltText =
      editedText.substring(0, currentPosition) +
      getPageLink(selectedOptions) +
      editedText.substring(currentPosition + 1);
    wrapperRef.current.innerHTML = finaltText + " ";
    let newData = wrapperRef.current.innerHTML;
    onDataChange(newData);
    setIsCaseCaderVisible(false);
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  useEffect(() => {
    // TODO : move to context
    const getRootPath = async () => {
      const pathDoc = await ipcRenderer.invoke("app-get-path", "documents");

      const root = readDirectory(pathDoc + "/Bud-Studio");

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

      setOptions(optionsTemp);

      //   root.map((item) => {
      //     console.log("")
      //   });

      return;
    };

    getRootPath();

    const current = wrapperRef.current;
    current.addEventListener("keypress", handleKeyPress);
    return () => {
      current.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        //   className={`ce-paragraph ${readOnly ? "" : "ce-block"}`}
        contentEditable={readOnly ? false : true}
        data-placeholder={defaultPlaceholder}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {isCaseCaderVisible && (
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{ filter }}
          onSearch={(value) => console.log(value)}
        />
      )}
    </>
  );
};

export default BudEditorPragraphView;
