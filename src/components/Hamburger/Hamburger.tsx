import React, { useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';

const HamburgerOptions = ['', 'Editor', 'List View', 'Kanban View', '', ''];

function Hamburger({
  setCurrentSelectedUI,
  selectedOption,
  setSelectedOption,
}:any) {
  // const [selectedOption, setSelectedOption] = useState('editor');

  const handleOptionClick = (option:any) => {
    if (option === '') {
      return;
    }
    setSelectedOption(option);
    if (option === 'Editor') {
      setCurrentSelectedUI('');
    } else if (option === 'List View') {
      setCurrentSelectedUI('listview');
    } else if (option === 'Kanban View') {
      setCurrentSelectedUI('kanban');
    } else {
      return;
    }
  };

  return (
    <div className="hamBurgerParent">
      {HamburgerOptions.map((option, i) => (
        <HamburgerItems
          key={i}
          title={option}
          selected={option === selectedOption}
          onClick={() => handleOptionClick(option)}
        />
      ))}
    </div>
  );
}

export default Hamburger;
