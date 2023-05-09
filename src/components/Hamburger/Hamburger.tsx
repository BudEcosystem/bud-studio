import React, { useState } from 'react'
import HamburgerItems from './HamburgerItems'
import "./Hamburger.css"

const HamburgerOptions = [ "", "List View", "Kanban View", "", ""]

const Hamburger = () => {
    const [selectedOption, setSelectedOption] = useState('Kanban View');

  const handleOptionClick = (option) => {
    if(option === ""){
        return
    }
    setSelectedOption(option);
    console.log(option)
  };

  return (
    <div className='hamBurgerParent'>
        {HamburgerOptions.map((option, i) => (
        <HamburgerItems
          key={i}
          title={option}
          selected={option === selectedOption}
          onClick={() => handleOptionClick(option)}
        />
      ))}
    </div>
  )
}

export default Hamburger