import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNewTaskClicked, createNewTask } from 'redux/slices/list';
import {
  CheckList,
  SmallerFlag,
  FoldedCard,
  Sicon,
  BoxArrow,
  Cross,
  DownArrow,
  FourDots,
} from '../ListViewIcons';
import CircularBorder from './CircularBorder';

function HeaderSubCompInput({ provided, selectedItem }) {
  const dispatch = useDispatch();
  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    document.getElementById('listInput')?.focus();
  }, []);

  const crossClickHandler = () => {
    dispatch(setNewTaskClicked(false));
  };
  const titleInputHandler = (e: any) => {
    setTitleInput(e.target.value);
  };
  const titleChangeHandler = (e: any) => {
    if (e.key === 'Enter' && !!e.target.value) {
      dispatch(createNewTask({ selectedItem, titleInput }));
      crossClickHandler();
      setTitleInput('');
    }
  };
  return (
    <div className="headerComponentInputParent">
      <div className="flex">
        <div className="iconsContainer">
          <div {...provided.dragHandleProps}>
            <FourDots />
          </div>
          <div style={{ marginLeft: '6px', transform: 'rotate(-90deg)' }}>
            <DownArrow />
          </div>
          <div className="textIcon22" />
          <div className="yellowbar" />
        </div>
        <input
          id="listInput"
          type="text"
          placeholder="Enter new Task"
          // onBlur={onBlurHandler}
          value={titleInput}
          onKeyUp={titleChangeHandler}
          onInput={titleInputHandler}
          className="workspaceTextBox"
        />
      </div>
      <div className="rightSideOptions">
        <CircularBorder icon={<CheckList />} />
        <CircularBorder icon={<Sicon />} />
        <CircularBorder icon={<FoldedCard />} />
        <CircularBorder icon={<SmallerFlag />} />
        <CircularBorder icon={<BoxArrow />} />
        <div className="saveText flexCenter">Save</div>
        <div className="flexCenter cross" onClick={crossClickHandler}>
          <Cross />
        </div>
      </div>
    </div>
  );
}

export default HeaderSubCompInput;
