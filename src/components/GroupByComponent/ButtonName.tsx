import React from 'react';
import { DownArrow } from './GropuByIcons';
import './GroupByComponent.css';

const ButtonName = ({ name, icon }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon && (
        <div
          style={{
            marginRight: '6px',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      )}
      <div className="buttonNameText">{name}</div>
      <div style={{ marginLeft: '8px' }}>{<DownArrow />}</div>
    </div>
  );
};

export default ButtonName;
