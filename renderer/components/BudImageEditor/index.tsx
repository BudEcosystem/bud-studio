import React, { useState } from "react";
import dynamic from "next/dynamic";
// import FilerobotImageEditor, {
//   TABS,
//   TOOLS,
// } from 'react-filerobot-image-editor';

const FilerobotImageEditor = dynamic(
  () => import("react-filerobot-image-editor"),
  { ssr: false }
);
const TABS = dynamic(
  () => import("react-filerobot-image-editor").then((module) => module.TABS),
  {
    ssr: false,
  }
);

const TOOLS = dynamic(
  () => import("react-filerobot-image-editor").then((module) => module.TOOLS),
  {
    ssr: false,
  }
);

function BudImageEditor({image}) {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  return (
    <>
      <FilerobotImageEditor
        source={image}

        onSave={(editedImageObject, designState) =>
          console.log("saved", editedImageObject, designState)
        }
        onClose={closeImgEditor}
        annotationsCommon={{
          fill: "#ff0000",
        }}
        Text={{ text: "Filerobot..." }}
        Rotate={{ angle: 90, componentType: "slider" }}
        Crop={{
          presetsItems: [
            {
              titleKey: "classicTv",
              descriptionKey: "4:3",
              ratio: 4 / 3,
              // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
            },
            {
              titleKey: "cinemascope",
              descriptionKey: "21:9",
              ratio: 21 / 9,
              // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
            },
          ],
          presetsFolders: [
            {
              titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
              // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
              groups: [
                {
                  titleKey: "facebook",
                  items: [
                    {
                      titleKey: "profile",
                      width: 180,
                      height: 180,
                      descriptionKey: "fbProfileSize",
                    },
                    {
                      titleKey: "coverPhoto",
                      width: 820,
                      height: 312,
                      descriptionKey: "fbCoverPhotoSize",
                    },
                  ],
                },
              ],
            },
          ],
        }}
        tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
        defaultTabId={TABS.ANNOTATE} // or 'Annotate'
        defaultToolId={TOOLS.TEXT} // or 'Text'
        theme={{
            palette: {
                'bg-primary': "#0F0F0F",
            }
        }}
      />
    </>
  );
}

export default BudImageEditor;
