/* eslint-disable react-hooks/exhaustive-deps */

import BudImageEditor from "components/BudImageEditor";
import FilerobotImageEditor from "filerobot-image-editor";

import path from "path";
import fs from "fs";

import { default as React, useRef } from "react";

const EventTimeline = (props) => {
  console.log("Initial Data", props.data);

  const [timelineData, setTimelineData] = React.useState(
    props.data ? props.data : null
  );

  const [isEditImageState, setEditImageState] = React.useState(false);
  const fileInputRef = useRef(null);
  const updateTimelineData = (newData) => {
    console.log("Data Change", newData);

    setTimelineData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const getBolb = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const buffer = new Buffer.from(fileBuffer);
    const blob = new Blob([buffer], { type: "image/jpeg" });

    return URL.createObjectURL(blob);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const currentProjectPath = localStorage.getItem("currentProject");
    const lastSegment = currentProjectPath.split("/").pop();
    const remainingPath = currentProjectPath.slice(
      0,
      -(lastSegment.length + 1)
    );

    //console.log("Current Project Path",localStorage.getItem("currentProject"));
    // const filePath = path.join(`${currentProjectPath.split("/")}`, file.name);
    const finalFile = `${remainingPath}/${Math.random()}-${file.name}}`;
    fs.copyFileSync(file.path, finalFile);

    let newData = { ...timelineData };
    newData = {
      file: {
        url: finalFile,
      },
      stretched: false,
      withBackground: false,
      withBorder: false,
    };
    updateTimelineData(newData);
  };

  const classes = {
    root: {
      paddingTop: "8px",
      backgroundColor: "#efefef",
    },
    timelinedot: {
      boxShadow: "none",
      marginTop: "20px",
    },
    time: {
      flex: "0.2",
      padding: "8px",
      marginTop: "6px",
      textOverflow: "ellipsis",
    },
    oppositeInButton: {
      flex: "0.14",
    },
    addButton: {
      boxShadow: "none",
      paddingLeft: "14px",
      paddingRight: "14px",
    },
    description: {
      padding: "8px",
      width: "400px",
      textOverflow: "ellipsis",
    },
    addButtonText: {
      color: "#FFFFFF",
      fontSize: "1.3rem",
    },
    uploadBlock: {
      backgroundColor: "rgb(255, 255, 255)",
      height: "30px",
      textAlign: "center",
      lineHeight: "30px",
      color: "#000",
      fontSize: "medium",
      borderRadius: "4px",
      cursor: "pointer",
    },
    imagePreview: {
      maxWidth: "100%",
    },
  };

  return (
    <>
      <div className="root">
        <div className="timeline" align="left">
          {!timelineData.file && (
            <>
              <div style={classes.uploadBlock} onClick={handleFileClick}>
                Upload Image
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          )}

          {timelineData && (
            <div className="timeline-item">
              <div className="timeline-separator">
                <div className={`timeline-dot ${classes.timelinedot}`} />

                {!isEditImageState && timelineData.file && (
                  <>
                    <img
                      src={getBolb(timelineData.file.url)}
                      alt="timeline"
                      style={classes.imagePreview}
                      onClick={() => {
                        setEditImageState(true);
                      }}
                    />
                  </>
                )}

                {isEditImageState && (
                  <BudImageEditor image={getBolb(timelineData.file.url)} />
                )}
              </div>
              <div className="timeline-content">
                <div className={`description ${classes.description}`}>
                  {timelineData.description}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventTimeline;
