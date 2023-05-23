import React, { useState } from 'react';
import {
  CheckList,
  SmallerFlag,
  FoldedCard,
  Sicon,
  BoxArrow,
  Cross,
} from '../ListViewIcons';
import CircularBorder from './CircularBorder';
import { useSelector, useDispatch } from 'react-redux';
import { setNewTaskClicked } from 'redux/slices/list';

const HeaderSubCompInput = () => {
  const dispatch = useDispatch();
  const [titleInput, setTitleInput] = useState('');
  const crossClickHandler = () => {
    dispatch(setNewTaskClicked(false));
  };
  const titleInputHandler = (e: any) => {
    setTitleInput(e.target.value);
  };
  const titleChangeHandler = (e: any) => {
    if (e.key === 'Enter' && !!e.target.value) {
      // dispatch()
    }
  };
  return (
    <div className="headerComponentInputParent">
      <input
        type="text"
        placeholder="Enter new Task"
        // onBlur={onBlurHandler}
        value={titleInput}
        onKeyUp={titleChangeHandler}
        onInput={titleInputHandler}
        className="workspaceTextBox"
      />
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
};

export default HeaderSubCompInput;
