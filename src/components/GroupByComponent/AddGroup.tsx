import React, { useState } from 'react';
import './GroupByComponent.css';
import { DownArrowName, NameText, ThreeDotsName } from './GropuByIcons';

const AddGroup = () => {
  const containsArr = [
    'Is',
    'Is not',
    'Contains',
    'Does not contain',
    'Starts with',
    'End with',
    'Is empty',
    'Is empty',
  ];
  const [isContainsOption, setIsContainsOption] = useState(false);
  return (
    <div className="addGroupContainer">
      <div className="topLine">
        <p className="whereText">where</p>
        <div className="darkButton">
          <div style={{ marginRight: '5px' }}>
            <NameText />
          </div>
          <p className="darkbtnName">Name</p>
          <div
            style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
          >
            <DownArrowName />
          </div>
        </div>
        <div
          className="containsButton"
          style={{ background: isContainsOption ? '#0C0C0C' : '' }}
          onClick={() => setIsContainsOption(!isContainsOption)}
        >
          <p className="darkbtnName">Contains</p>
          <div
            style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
          >
            <DownArrowName />
          </div>
        </div>
        <div className="valueButton">
          <input className="valueInput" type="text" placeholder="Value" />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <ThreeDotsName />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <p className="filterText">+ Add filter rule</p>
        <div
          style={{
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '4px',
          }}
        >
          <DownArrowName />
        </div>
      </div>
      <div className="hrLine"></div>
      <p className="deleteFilterText">Delete filter</p>
      {isContainsOption && (
        <div className="containsOption">
          <div className="containsOptionMain">
            {containsArr.map((item, i) => (
              <div className={`optionsWrapper ${i === 2 && 'active'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGroup;
