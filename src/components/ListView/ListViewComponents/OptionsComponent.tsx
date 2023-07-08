import React, { useRef, useState } from 'react';
import { DateLogo } from '../ListViewIcons';
import '../ListView.css';
import CircularImageComponent from './CircularImageComponent';
import NewTaskPanel from './NewTaskPanel';

const imagesArray: Array<any> = ['', '', ''];

function OptionsComponent({ view,changeDatabaseView }: any) {
  const kabuniRef = useRef(null);
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
      </div>
      <div>
        <NewTaskPanel view={view} changeDatabaseView={changeDatabaseView}/>
      </div>
    </div>
  );
}

export default OptionsComponent;
