import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkToggle,
  setExpandedItems,
  setNewTaskClicked,
} from 'redux/slices/list';
import { triggerDefaultNewTask } from 'redux/slices/kanban';
import { setNewTaskClickedtable } from 'redux/slices/table';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { GroupBy, Sort, ThreeDots, Union, Views } from '../ListViewIcons';
import ThreeDotsOption from './ThreeDotsOption/ThreeDotsOption';
import GroupByModal from './GroupBy/GroupByModal';
import SortByModal from './SortBy/SortByModal';
import '../ListView.css';
// Design

// Menu Items
const items: MenuProps['items'] = [
  {
    label: 'Kanban',
    key: '0',
  },
  {
    label: 'List',
    key: '1',
  },
  {
    label: 'Table',
    key: '3',
  },
];

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
    name: 'Group by',
    logo: <GroupBy />,
  },
];

function NewTaskPanel({ view }: any) {
  const dispatch = useDispatch();
  const { list, table }: any = useSelector((state) => state);
  const { newTaskClicked, selectedItemIndex } = list;
  const { newTaskClickedtable } = table;
  const { workspace }: any = useSelector((state) => state);
  const [name, setName] = useState('');
  const { color } = workspace;
  const [showThreeDotsOption, setShowThreeDotsOption] = useState(false);
  const [showGroupBy, setShowGroupBy] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);

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

  const handleOptionClick = (name: any) => {
    if (name == 'Group by') {
      setShowGroupBy(!showGroupBy);
    } else if (name == 'Sort') {
      setShowSortBy(!showSortBy);
    }
  };
  return (
    <div className="flexCenter">
      {nameAndLogoArray.map((item, i) => (
        <div
          style={{ position: 'relative' }}
          onClick={() => {
            handleOptionClick(item.name);
          }}
          className="flexCenter newTaskPanelItems"
        >
          {item.logo}

          <p className="itemName">{item.name}</p>
          {i === nameAndLogoArray.length - 1 ? undefined : (
            <div className="verticalLine">|</div>
          )}
          {item.name === 'Group by' && showGroupBy && (
            <div className="groupbyOptions">
              <GroupByModal setShowGroupBy={setShowGroupBy} />
            </div>
          )}
          {item.name === 'Sort' && showSortBy && (
            <div className="sortbyOptions">
              <SortByModal setShowSortBy={setShowSortBy} />
            </div>
          )}
        </div>
      ))}

      <div className="verticalLine">|</div>

      <Dropdown
        menu={{ items, selectable: true, defaultSelectedKeys: ['1'] }}
        trigger={['click']}
        placement="bottom"
      >
        <div
          className="flexCenter newTaskPanelItems"
          style={{ position: 'relative' }}
        >
          <Views />
          <p className="itemName">Views</p>
        </div>
      </Dropdown>

      <div className="newTaskContainer" onClick={newTaskHandler}>
        <div className="plusContainer flexCenter" style={{ color }}>
          +
        </div>
        <div className="newTaskText">
          New {view === 'list' ? 'list' : view === 'table' ? 'Row' : 'task'}
        </div>
      </div>
      <div
        onClick={() => setShowThreeDotsOption(!showThreeDotsOption)}
        className="threeDots"
        style={{
          background: `${showThreeDotsOption ? '#212023' : 'transparent'}`,
        }}
      >
        <ThreeDots />
        {showThreeDotsOption && (
          <div className="threeDotsOptionsContainer">
            <ThreeDotsOption setShowThreeDotsOption={setShowThreeDotsOption} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewTaskPanel;
