import React from 'react';

export const OtherSpaces = ({text, color}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div
        style={{
          width: '14px',
          height: '14px',
          background: color,
          borderRadius: '4px',
        }}
      ></div>
      <div style={{ color: '#C6C6C6', marginLeft: '20px' }}>{text}</div>
    </div>
  );
};
