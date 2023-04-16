import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SideMenuLayout from "components/layouts/side-menu-layout";
import { readFileContent } from "utils/fs-utils";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import { createNewFile } from "actions/pages";

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

  useEffect(() => {
    console.log("Object Creation Started");

    // const createNewProject = async () => {
    //   const pathDoc = await ipcRenderer.invoke("app-get-path", "documents");
    //   console.log("Path", pathDoc);

    //   return createNewFile(pathDoc+"/default");

    //   // Invoke Create
    // };

    console.log("mode", router.query);

    // check if its new project
    const { page,filePath } = router.query;
    if(filePath){
      const data = readFileContent(filePath);
      console.log(data);
      setPageContent(JSON.parse(data));
    }

    // if (mode && mode === "new") {
    //   console.log("Creation Mode");
    //   createNewProject().then(
    //     (reponse) => {
    //       console.log("Response", reponse);
    //       setPageContent(reponse.blankTemplate);
    //     }
    //   );
    // } else {
    //   try {
    //     //TODO : change file path

    //     //const data = readFileContent("/Users/rahulvramesh/Bud/Bud-Studio/test-3/my-title.json");
    //     //console.log(data);
    //     //setPageContent(JSON.parse(data));
    //   } catch (e) {
    //     console.log("Error", e);
    //   }
    

    // ipcRenderer.invoke('app-get-path', 'documents')
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // Check If File Exisits
  }, []);

  const handleInstance = (instance: React.SetStateAction<{}>) => {
    setEditorInstance(instance);
  };

  return (
    <>
      <SideMenuLayout>
        {EditorJsWrapper && pageContent && (
          <EditorJsWrapper handleInstance={handleInstance} data={pageContent} />
        )}
      </SideMenuLayout>
    </>
  );
};

export default Page;
