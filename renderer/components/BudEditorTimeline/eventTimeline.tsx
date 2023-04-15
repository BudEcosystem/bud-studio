/* eslint-disable react-hooks/exhaustive-deps */

import { default as React } from 'react';

const DEFAULT_INITIAL_DATA = () => {
  return {
    events: [
      {
        "time": "Time",
        "description": "Description"
      }
    ],
  }
}



const EventTimeline = (props) => {

  const [timelineData, setTimelineData] = React.useState(props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA);

  const updateTimelineData = (newData) => {
    setTimelineData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  }

  const onAddEvent = (e) => {
    const newData = {
      ...timelineData
    }
    newData.events.push({
      "time": "Time",
      "description": "Description"
    })
    updateTimelineData(newData);
  }

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...timelineData
      }
      newData.events[index][fieldName] = e.currentTarget.textContent;
      updateTimelineData(newData);
    }
  }

  return (
    <>
      
          {timelineData.events.map((event, index) => (
            <div>working</div>
          ))}
          {
            !props.readOnly && (<>read only</>)
           
          }

    </>
  );
}

export default EventTimeline;