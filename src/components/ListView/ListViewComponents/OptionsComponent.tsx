import React, { useRef, useState } from 'react';
import { DateLogo } from '../ListViewIcons';
import '../ListView.css';
import CircularImageComponent from './CircularImageComponent';
import NewTaskPanel from './NewTaskPanel';
import { Switch } from 'antd';
import { useSelector } from 'react-redux';

const imagesArray: Array<any> = ['', '', ''];

function OptionsComponent({ view,changeDatabaseView, showSubtask, setShowSubtask }: any) {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const style = { '--bg-color': color };
  const kabuniRef = useRef(null);

  const showSubtasks = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setShowSubtask(checked)
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="optionsComponentParentContainer" ref={kabuniRef}>
      <div className="optionsComponentParent">
        <div className="dateContainer">
          <div className="flexCenter">
            <DateLogo />
          </div>
          <p className="dateText">{formattedDate}</p>
        </div>
        <div className="circularImageComponentContainer">
          <CircularImageComponent images={imagesArray} />
        </div>
        {view === 'Kanban' && (
          <div style={style} className="subTaskToggle">
          <div style={{fontSize: "12px", marginRight: "10px"}}>Tasks Only</div>
          <Switch size="small" onChange={showSubtasks} />
          <div style={{fontSize: "12px", marginLeft: "10px"}}>Show Subtasks</div>
        </div>
        )}
        
      </div>
      <div>
        <NewTaskPanel view={view} changeDatabaseView={changeDatabaseView}/>
      </div>
    </div>
  );
}

export default OptionsComponent;
