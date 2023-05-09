import React from 'react';
import './Hamburger.css';

const HamburgerItems = ({ title, selected, onClick }) => {
  return (
    <div className={``} onClick={onClick}>
      <div className={selected ? "verticalBar" : ""}></div>
      <div className='hamItemsContainer'>
        <div className={`square`} style={{ background: selected ? '#939AFF' : 'none' }}></div>
        <p
          className="hamItemsTitle"
          style={{ display: selected ? 'block' : 'none' }}
        >
          {title}
        </p> 
      </div>
    </div>
  );
};

export default HamburgerItems;
