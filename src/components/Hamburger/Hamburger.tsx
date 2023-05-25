import React, { useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';

const HamburgerOptions = ['', 'editor', 'List View', 'Kanban View', '', ''];

function Hamburger({
  setCurrentSelectedUI,
  selectedOption,
  setSelectedOption,
}) {
  // const [selectedOption, setSelectedOption] = useState('editor');

  const handleOptionClick = (option) => {
    if (option === '') {
      return;
    }
    setSelectedOption(option);
    if (option === 'editor') {
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
