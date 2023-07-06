/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './Hamburger.css';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import toolTipImage from '../../../assets/Kanban.svg';

function HamburgerItems({ title, selected, onClick }: any) {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  return (
    <div className="" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div
        className={selected ? 'verticalBar' : ''}
        style={{
          background: selected
            ? `linear-gradient(180deg, ${color} 0%, rgba(147, 154, 255, 0) 100%)`
            : 'none',
        }}
      />
      <div className="hamItemsContainer">
        <Tooltip
          title={
            <div className="tooltip-container">
              <img
                className="tooltip-image"
                src={toolTipImage}
                alt="toolTipImage"
              />
              <div className="tooltip-content">
                <h6 className="tooltip-text">Kanban View</h6>
                <p className="tooltip-date">Edited 23min ago</p>
              </div>
            </div>
          }
          placement="right"
        >
          <div
            className="square"
            style={{ background: selected ? color : 'none' }}
          />
        </Tooltip>
        <p
          className="hamItemsTitle"
          style={{ display: selected ? 'block' : 'none' }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export default HamburgerItems;
