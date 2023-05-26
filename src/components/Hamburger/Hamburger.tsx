import React, { useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';
import {
  setCurrentSelectedUI,
  setSelectedOption,
} from 'redux/slices/activestate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSelectedDocument } from 'redux/slices/workspace';

const HamburgerOptions = ['', 'Editor', 'List View', 'Kanban View', '', ''];

function Hamburger({}: any) {
  // const [selectedOption, setSelectedOption] = useState('editor');
  const dispatch = useDispatch();
  const { activestate }: any = useSelector((state) => state);
  let { selectedOption, nodeIDs } = activestate;

  const handleOptionClick = (option: any) => {
    if (option === '') {
      return;
    }
    dispatch(setSelectedOption(option));
    if (option === 'Editor') {
      dispatch(setCurrentSelectedUI(''));
      dispatch(setCurrentSelectedDocument(nodeIDs));
      console.log(nodeIDs);
    } else if (option === 'List View') {
      dispatch(setCurrentSelectedUI('listview'));
    } else if (option === 'Kanban View') {
      dispatch(setCurrentSelectedUI('kanban'));
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
