/* eslint-disable react-hooks/exhaustive-deps */

import BudImageEditor from "components/BudImageEditor";
import FilerobotImageEditor from "filerobot-image-editor";


import path from 'path';
import fs from 'fs';


import { default as React, useRef } from "react";

const EventTimeline = (props) => {
  console.log("Iitial Data", props.data);

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

  const onAddEvent = (e) => {
    const newData = timelineData;
    newData.imagev2 = newData;
    updateTimelineData(newData);
  };

  const onContentChange = (index, fieldName) => {
    console.log("triggers");
    return (e) => {
      const newData = {
        ...timelineData,
      };
      newData.events[index][fieldName] = e.currentTarget.textContent;
      updateTimelineData(newData);
    };
  };

  const setImage = () => {
    setTimelineData({
      file: {
        url: "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg",
      },
      stretched: false,
      withBackground: false,
      withBorder: false,
    });
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const getBolb = (filePath)=>{
    const fileBuffer = fs.readFileSync(filePath);
    const buffer = new Buffer.from(fileBuffer);
    const blob = new Blob([buffer], { type: 'image/jpeg' });

    return URL.createObjectURL(blob);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const filePath = path.join('/Users/rahulvramesh/Bud/Bud-Studio', file.name);
    fs.copyFileSync(file.path, filePath);
    //setPreviewUrl(URL.createObjectURL(file));

    

    let newData = {...timelineData}
    newData = {
        file: {
          url: filePath
        },
        stretched: false,
        withBackground: false,
        withBorder: false,
      }
    updateTimelineData(newData);

    // setTimelineData({
    //   file: {
    //     url: URL.createObjectURL(file)
    //   },
    //   stretched: false,
    //   withBackground: false,
    //   withBorder: false,
    // });
    // Do something with the selected file
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

                {/* <BudImageEditor image={timelineData.image}/> */}
              </div>
              <div className="timeline-content">
                <div className={`description ${classes.description}`}>
                  {timelineData.description}
                </div>
              </div>
            </div>
          )}

          {/* {timelineData.events.map((event, index) => (
            <div key={index} className="timeline-item">
              <div
                style={classes.time}
                contentEditable={true}
                suppressContentEditableWarning={!props.readOnly}
                onInput={() => onContentChange(index, "time")}
              >
                {event.time}
              </div>
              <div className="timeline-separator">
                <div className={`timeline-dot ${classes.timelinedot}`} />
                <div className="timeline-connector" />
              </div>
              <div className="timeline-content">
                <div
                  className={`description ${classes.description}`}
                  contentEditable={!props.readOnly}
                  suppressContentEditableWarning={!props.readOnly}
                  onBlur={() => onContentChange(index, "description")}
                >
                  {event.description}
                </div>
              </div>
            </div>
          ))}
          {!props.readOnly && (
            <div className="timeline-item">
              <div style={classes.oppositeInButton} />
              <div className="timeline-separator">
                <div
                  className={`timeline-dot primary add-button ${classes.addButton}`}
                  onClick={onAddEvent}
                >
                  <span style={classes.addButtonText}> + </span>
                </div>
              </div>
              <div className="timeline-content" />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default EventTimeline;
