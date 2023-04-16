import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/configs/editor/tools";
import React, { useEffect } from "react";
import { createOrReplaceFile } from "utils/fs-utils";
const ReactEditorJS = createReactEditorJS();

const EditorJsWrapper = ({ data, handleInstance,filePath }) => {
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async (api, newData) => {

    // TODO: Save the data to database
    //console.log("Current Project Path",localStorage.getItem("currentProject"));

    console.log(api,newData);
    console.log("Auto Save",editorCore.current)
    const savedData = await editorCore.current.save();
    console.log("Current Schema",savedData)
    await createOrReplaceFile(filePath,JSON.stringify(savedData));

  }, []);

  return (
    <>
    <ReactEditorJS
      tools={EDITOR_JS_TOOLS}
      onChange={handleSave}
      onInitialize={handleInitialize}
      defaultValue={data}
    />
   
    </>
  );
};

// Return the CustomEditor to use by other components.

export default EditorJsWrapper;

// Refer : https://medium.com/@sfazleyrabbi/next-js-editor-js-complete-setup-guide-7136c8bb694e
