import React from 'react';
import { DownArrowName, ThreeDotsName } from './GropuByIcons';

const NameComponent = () => {
  return (
    <div className="dropDownContainer">
      <div className="nameMainContainer">
        <div className="nameContainer">
          <div className="titleContainer">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="nameText">Name</p>
              <div style={{ display: 'flex' }}>
                <p className="containsText">contains</p>
                <div>
                  <DownArrowName />
                </div>
              </div>
            </div>
            <div>
              <ThreeDotsName />
            </div>
          </div>
          <div className="nameSearchConatiner">
            <input type='text' className='inputName' placeholder='Type a value...' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameComponent;
