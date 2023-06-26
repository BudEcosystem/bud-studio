import React from 'react';
import './GroupByComponent.css';
import ButtonName from './ButtonName';
import { Group, NameText } from './GropuByIcons';
import NameComponent from './NameComponent';
import AddGroup from './AddGroup';

const GroupByComponent = () => {
  return (
    <div>
      <div className="gropuBymainContainer">
        <div>
          <div className="gropuByLeftContainer">
            <div className="leftButtonGropuBy">
              {/* <ButtonName name={`Name`} icon={<NameText />} /> */}
              <ButtonName name={`1 rule`} icon={<Group />} />
            </div>
            <p className="addTextGroupBy">+ Add New</p>
          </div>
        </div>
        <div className="gropuByRightContainer">
          <p className="resetText">Reset</p>
          <div className="RightButtonGropuBy">
            <ButtonName name={`Save for everyone`} icon={null} />
          </div>
        </div>
      </div>
      <NameComponent />
      {/* <AddGroup /> */}
    </div>
  );
};

export default GroupByComponent;
