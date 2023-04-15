/* eslint-disable react-hooks/exhaustive-deps */

import { default as React } from "react";

const DEFAULT_INITIAL_DATA = () => {
  return {
    events: [
      {
        time: "Time",
        description: "Description",
      },
    ],
  };
};

const EventTimeline = (props) => {
  const [timelineData, setTimelineData] = React.useState(
    props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA
  );

  const updateTimelineData = (newData) => {
    setTimelineData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  const onAddEvent = (e) => {
    const newData = {
      ...timelineData,
    };
    newData.events.push({
      time: "Time",
      description: "Description",
    });
    updateTimelineData(newData);
  };

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...timelineData,
      };
      newData.events[index][fieldName] = e.currentTarget.textContent;
      updateTimelineData(newData);
    };
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
  };

  return (
    <>
      <div className="root">
        <div className="timeline" align="left">
          {timelineData.events.map((event, index) => (
            <div key={index} className="timeline-item">
              <div
                style={classes.time}
                contentEditable={!props.readOnly}
                suppressContentEditableWarning={!props.readOnly}
                onBlur={() => onContentChange(index, "time")}
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
          )}
        </div>
      </div>
    </>
  );
};

export default EventTimeline;


// Reference : https://github.dev/Walkthroughs/editorjs-react-tool