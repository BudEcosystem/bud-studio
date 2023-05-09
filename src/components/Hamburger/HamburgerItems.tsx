import React from 'react';
import './Hamburger.css';
import { useSelector } from 'react-redux';


const HamburgerItems = ({ title, selected, onClick }) => {
  const {workspace}:any = useSelector(state=>state)
  let { color } = workspace
  return (
    <div className={``} onClick={onClick}>
      <div className={selected ? "verticalBar" : ""} style={{ background: selected ? `linear-gradient(180deg, ${color} 0%, rgba(147, 154, 255, 0) 100%)` : 'none' }}></div>
      <div className='hamItemsContainer'>
        <div className={`square`} style={{ background: selected ? color : 'none' }}></div>
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
