import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SideMenuLayout from "components/layouts/side-menu-layout";
import { readFileContent } from "utils/fs-utils";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import { createNewFile } from "actions/pages";
import queryString from 'query-string';


let EditorJsWrapper = dynamic(
  () => import("../../components/EditorJsWrapper"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => {
  let [editorInstance, setEditorInstance] = useState({});
  const [pageContent, setPageContent] = useState(null);
  const router = useRouter();
  //const { page, filePath } = router.query;

  useEffect(() => {
    console.log("Object Creation Started");
    const parsed = queryString.parse(location.search);

    console.log("Changes",parsed);

    // check if its new project

    if (parsed.filePath) {
      //set current project file i local storage
      localStorage.setItem("currentProject", parsed.filePath.toString());
     
      console.log("Changes",parsed.filePath)
      const data = readFileContent(parsed.filePath);
      console.log("Changes",data);
      setPageContent(JSON.parse(data));
    } else {
      const path = localStorage.getItem("currentProject");
      const data = readFileContent(path);
      console.log(data);
      setPageContent(JSON.parse(data));
    }
  }, []);

  const handleInstance = (instance: React.SetStateAction<{}>) => {
    setEditorInstance(instance);
  };

  return (
    <>
      <SideMenuLayout showTopBar={true}>
        {EditorJsWrapper && pageContent && (
          <EditorJsWrapper
            handleInstance={handleInstance}
            data={pageContent}
            filePath={router.query.filePath}
          />
        )}
      </SideMenuLayout>
    </>
  );
};

export default Page;
