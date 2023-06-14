/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './Hamburger.css';
import { useSelector } from 'react-redux';

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
        <div
          className="square"
          style={{ background: selected ? color : 'none' }}
        />
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
