import React from 'react';
import { GroupBy, Sort, ThreeDots, Union, Views } from '../ListViewIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkToggle,
  setExpandedItems,
  setNewTaskClicked,
} from 'redux/slices/list';

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

const NewTaskPanel = () => {
  const dispatch = useDispatch();
  const { list }: any = useSelector((state) => state);
  const { newTaskClicked, selectedItemIndex } = list;
  const { workspace }: any = useSelector((state) => state);
  let { color } = workspace;
  const newTaskHandler = () => {
    dispatch(setNewTaskClicked(!newTaskClicked));
    dispatch(checkToggle(selectedItemIndex));
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
        <div className="newTaskText">New list</div>
      </div>
      <div className="threeDots flexCenter">
        <ThreeDots />
      </div>
    </div>
  );
};

export default NewTaskPanel;
