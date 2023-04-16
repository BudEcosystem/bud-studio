import React, { useState } from "react";
import dynamic from "next/dynamic";
import SideMenuLayout from "components/layouts/side-menu-layout";

let EditorJsWrapper = dynamic(
  () => import("../../../components/EditorJsWrapper"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => {
  let [editorInstance, setEditorInstance] = useState({});

  const handleInstance = (instance) => {
    setEditorInstance(instance);
  };

  return (
    <>
      <SideMenuLayout>
        {EditorJsWrapper && (
          <EditorJsWrapper handleInstance={handleInstance} data={undefined} />
        )}
      </SideMenuLayout>
    </>
  );
};

export default Page;
