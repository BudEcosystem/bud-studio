import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/configs/editor/tools";
import React, { useEffect } from "react";
import { createOrReplaceFile } from "utils/fs-utils";
const ReactEditorJS = createReactEditorJS();

const EditorJsWrapper = ({ data, handleInstance }) => {
  const editorCore = React.useRef(null);

  useEffect(() => {
    console.log("Editor Core", editorCore.current)
  },[editorCore]);

  const handleInitialize = React.useCallback((instance) => {

    console.log("Handle Initialize Called")

    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async (api, newData) => {
    console.log(api,newData);
    console.log("Auto Save",editorCore.current)
    const savedData = await editorCore.current.save();

    console.log("Current Schema",savedData)

    createOrReplaceFile("/Users/rahulvramesh/Bud/Bud-Studio/test-3/my-title.json",JSON.stringify(savedData)) ;

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
