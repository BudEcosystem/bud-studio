import React, { useState } from 'react';
import { GroupBy, Sort, ThreeDots, Union, Views } from '../ListViewIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkToggle,
  setExpandedItems,
  setNewTaskClicked,
} from 'redux/slices/list';
import { triggerDefaultNewTask } from 'redux/slices/kanban';
import { setNewTaskClickedtable } from 'redux/slices/table';

const nameAndLogoArray = [
  {
    name: 'Search',
    logo: <Union />,
  },
  {
    name: 'Sort',
    logo: <Sort />,
  },
  {
    name: 'Group By',
    logo: <GroupBy />,
  },
  {
    name: 'Views',
    logo: <Views />,
  },
];

const NewTaskPanel = ({ view }) => {
  const dispatch = useDispatch();
  const { list, table }: any = useSelector((state) => state);
  const { newTaskClicked, selectedItemIndex } = list;
  const { newTaskClickedtable } = table;
  const { workspace }: any = useSelector((state) => state);
  const [name, setName] = useState('');
  let { color } = workspace;
  const newTaskHandler = () => {
    if (view === 'list') {
      setName(view);
      dispatch(setNewTaskClicked(!newTaskClicked));
      dispatch(checkToggle(selectedItemIndex));
    } else if (view === 'kanban') {
      dispatch(triggerDefaultNewTask({ triggerTaskCreation: true }));
    } else if (view === 'table') {
      setName('row');
      dispatch(setNewTaskClickedtable(!newTaskClickedtable));
    }
  };
  return (
    <div className="flexCenter">
      {nameAndLogoArray.map((item, i) => (
        <div className="flexCenter newTaskPanelItems">
          {item.logo}
          <p className="itemName">{item.name}</p>
          {i === nameAndLogoArray.length - 1 ? undefined : (
            <div className="verticalLine">|</div>
          )}
        </div>
      ))}
      <div className="newTaskContainer" onClick={newTaskHandler}>
        <div className="plusContainer flexCenter" style={{ color: color }}>
          +
        </div>
        <div className="newTaskText">
          New {view === 'list' ? 'list' : view === 'table' ? 'Row' : 'task'}
        </div>
      </div>
      <div className="threeDots flexCenter">
        <ThreeDots />
      </div>
    </div>
  );
};

export default NewTaskPanel;
