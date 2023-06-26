import React from 'react';
import { DownArrow } from './GropuByIcons';
import './GroupByComponent.css';
import { setDisplayToggle } from 'redux/slices/activestate';
import { useDispatch, useSelector } from 'react-redux';

const ButtonName = ({ name, icon }) => {
  const dispatch = useDispatch();
  const { activestate }: any = useSelector((state) => state);
  const { displayToggle } = activestate;
  return (
    <div
      style={{ display: 'flex', alignItems: 'center' }}
      onClick={() => {
        dispatch(setDisplayToggle(!displayToggle));
      }}
    >
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
