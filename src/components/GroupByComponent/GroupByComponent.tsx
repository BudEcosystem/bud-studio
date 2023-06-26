import React, { useState } from 'react';
import './GroupByComponent.css';
import ButtonName from './ButtonName';
import { Group, NameText } from './GropuByIcons';
import NameComponent from './NameComponent';
import AddGroup from './AddGroup';
import { useSelector } from 'react-redux';

const GroupByComponent = () => {
  const { activestate }: any = useSelector((state) => state);
  const { groupByOption } = activestate;

  return (
    <div style={{ marginBottom: '10px' }}>
      <div className="gropuBymainContainer">
        <div>
          <div className="gropuByLeftContainer">
            <div className="leftButtonGropuBy">
              {groupByOption === 'Name' && (
                <ButtonName name={`Name`} icon={<NameText />} />
              )}
              {groupByOption === 'AddGroup' && (
                <ButtonName name={`1 rule`} icon={<Group />} />
              )}
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
      {groupByOption === 'Name' && <NameComponent />}
      {groupByOption === 'AddGroup' && <AddGroup />}
      {/* <AddGroup /> */}
    </div>
  );
};

export default GroupByComponent;
