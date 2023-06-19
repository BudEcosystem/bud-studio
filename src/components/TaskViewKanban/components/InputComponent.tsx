import React, { useEffect, useState } from 'react';
import {
  CheckList,
  SmallerFlag,
  FoldedCard,
  Sicon,
  BoxArrow,
  Cross,
  DownArrow,
  FourDots,
} from '../../ListView/ListViewIcons';
import '../TaskView.css';
import CircularBorder from '../../ListView/ListViewComponents/CircularBorder';
import { useSelector, useDispatch } from 'react-redux';
import { Arrow } from '../TaskViewIcons';

const InputComponent = () => {
  //   const dispatch = useDispatch();
  //   const [titleInput, setTitleInput] = useState('');

  //   useEffect(() => {
  //     document.getElementById('listInput')?.focus();
  //   }, []);

  //   const crossClickHandler = () => {
  //     dispatch(setNewTaskClicked(false));
  //   };
  //   const titleInputHandler = (e: any) => {
  //     setTitleInput(e.target.value);
  //   };
  //   const titleChangeHandler = (e: any) => {
  //     if (e.key === 'Enter' && !!e.target.value) {
  //       dispatch(createNewTask({ selectedItem, titleInput }));
  //       crossClickHandler();
  //       setTitleInput('');
  //     }
  //   };
  return (
    <div className="headerComponentInputParent">
      <div className="flex">
        <div className="iconsContainer">
          <div className="flexCenter" style={{ marginRight: '8px' }}>
            <FourDots />
          </div>
          <div className="flexCenter" style={{ marginRight: '8px' }}>
            <Arrow />
          </div>
          <div className="textIcon22"></div>
          <div className="yellowbar"></div>
        </div>
        <input
          id="listInput"
          type="text"
          placeholder="Enter new subtask"
          // onBlur={onBlurHandler}
          //   value={titleInput}
          //   onKeyUp={titleChangeHandler}
          //   onInput={titleInputHandler}
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
        <div
          className="flexCenter cross"
          //  onClick={crossClickHandler}
        >
          <Cross />
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
