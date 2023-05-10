import React from 'react';
import { DateLogo } from '../ListViewIcons';
import '../ListView.css';
import CircularImageComponent from './CircularImageComponent';
import NewTaskPanel from './NewTaskPanel';

const imagesArray: Array<any> = ["", "", ""]

const OptionsComponent = () => {
  return (
    <div className='optionsComponentParentContainer'>
      <div className='optionsComponentParent'>
        <div className="dateContainer">
          <div className="flexCenter">
            <DateLogo />
          </div>
          <p className='dateText'>13 June 2023</p>
        </div>
        <div className='circularImageComponentContainer'>
            <CircularImageComponent images={imagesArray} />
        </div>
      </div>
      <div>
        <NewTaskPanel />
      </div>
    </div>
  );
};

export default OptionsComponent;
