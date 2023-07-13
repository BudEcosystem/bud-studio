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
import { setWorkspacestodos } from '@/redux/slices/workspace';
import { addTodos } from '@/redux/slices/database';

const CheckListInput = ({data, setShowCheckListInput}: any) => {
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
        name: titleInput,
        childOf: workspace.currentSelectedDocId,
        description: '',
        type: 'doc',
        uuid: uuidv4(),
        workSpaceUUID: workspace.currentWorkspace,
        customProperties: [
          {
            title: 'Author',
            value: 'Bud',
            type: 'text',
            id: uuidv4(),
            order: 4,
          },
          {
            title: 'ISBN',
            value: 'QWDE-DJJC-1234',
            type: 'text',
            id: uuidv4(),
            order: 5,
          },
        ], // User defined Properties
        properties: [
          {
            title: 'Tags',
            value: ['no-tag'],
            type: 'tags',
            id: uuidv4(),
            order: 1,
          },
          {
            title: 'Priority',
            value: 'Normal',
            type: 'priority',
            id: uuidv4(),
            order: 2,
          },
          {
            title: 'Status',
            value: 'in_progress',
            type: 'status',
            id: uuidv4(),
            order: 3,
          },
          {
            title: 'Date',
            value: null,
            type: 'date',
            id: uuidv4(),
            order: 4,
          },
        ],
  
        // System Defined Properties
        // {
        //   tags: ['no-tag'],
        //   priority: 'Normal',
        //   status: 'Not Started',
        //   date: null,
        // },
        setNewObj(obj)
      }
      if (e.key === 'Enter' && !!e.target.value) {
        // dispatch(setWorkspacestodos(obj))
        // dispatch(addTodos({id: data.entry.uuid, newId: obj.uuid}))
        setTitleInput('');
        console.log(workspace)
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
