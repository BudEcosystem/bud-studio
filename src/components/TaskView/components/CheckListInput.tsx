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
import { v4 as uuidv4 } from 'uuid';
import CircularBorder from '../../ListView/ListViewComponents/CircularBorder';
import { useSelector, useDispatch } from 'react-redux';
import { Arrow } from '../TaskViewIcons';
import { setCheckedAddItem, setWorkspacestodos } from '@/redux/slices/workspace';
import { addTodos } from '@/redux/slices/database';
import dayjs from 'dayjs';

const CheckListInput = ({parentId, setShowCheckListInput}: any) => {
    const dispatch = useDispatch();
    const [titleInput, setTitleInput] = useState('');
    const [newObj, setNewObj] = useState(null)
    const { workspace }: any = useSelector((state) => state);

    // const crossClickHandler = () => {
    //   dispatch(setNewTaskClicked(false));
    // };
    const titleInputHandler = (e: any) => {
      setTitleInput(e.target.value);
    };
    const titleChangeHandler = (e: any) => {
      const obj = {
          id: uuidv4(),
          checked: false,
          title: titleInput,
          createdAt: dayjs().unix(),
          updatedAt: dayjs().unix(),
          }

      if (e.key === 'Enter' && !!e.target.value) {
        dispatch(setCheckedAddItem({parentId, obj}))
        setTitleInput('');
      }
    };
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
          <div className="yellowbar"></div>
        </div>
        <input
          id="listInput"
          type="text"
          placeholder="Enter new subtask"
          // onBlur={onBlurHandler}
            value={titleInput}
            onKeyUp={titleChangeHandler}
            onInput={titleInputHandler}
          className="workspaceTextBox"
        />
      </div>
        <div
          className="flexCenter cross"
           onClick={() => setShowCheckListInput(false)}
        >
          <Cross />
        </div>
      </div>
  );
};

export default CheckListInput;
