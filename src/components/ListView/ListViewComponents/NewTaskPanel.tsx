/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkToggle,
  setExpandedItems,
  setNewTaskClicked,
} from 'redux/slices/list';
import { setNewTaskClickedtable } from 'redux/slices/table';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { styled } from 'styled-components';
import {
  setSearchDocsKeyword,
  triggerDefaultNewTask,
} from '@/redux/slices/workspace';
import { GroupBy, Sort, ThreeDots, Union, Views } from '../ListViewIcons';
import ThreeDotsOption from './ThreeDotsOption/ThreeDotsOption';
import GroupByModal from './GroupBy/GroupByModal';
import SortByModal from './SortBy/SortByModal';
import '../ListView.css';
// Design

export const AddNewTaskinput = styled.input`
  width: 105px;
  height: 21px;
  left: 331px;
  top: 327px;
  background: #101010;
  border-radius: 2px;
  text-align: left;
  color: #bbbbbb;
  outline: none;
  border: none;
  margin-left: 5px;
  &::placeholder,
  &::-webkit-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    text-align: left;
    margin-left: 5px;
    color: #bbbbbb;
  }
  &:-ms-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    color: #bbbbbb;
  }
`;
function NewTaskPanel({ view, changeDatabaseView }: any) {
  const dispatch = useDispatch();
  const { list, table }: any = useSelector((state) => state);
  const { newTaskClicked, selectedItemIndex } = list;
  const { newTaskClickedtable } = table;
  const { workspace }: any = useSelector((state) => state);
  const { workspaceDocsSearchKey } = workspace;
  const [searchKeyName, setSearchkeyName] = useState(workspaceDocsSearchKey)
  const [name, setName] = useState('');
  const { color } = workspace;
  const [showThreeDotsOption, setShowThreeDotsOption] = useState(false);
  const [showGroupBy, setShowGroupBy] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [currentNameAndLogoArray, setCurrentNameAndLogoArray] = useState([
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
    {
      name: 'Filter',
      logo: <GroupBy />,
    },
  ]);

  useEffect(() => {
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
      {
        name: 'Filter',
        logo: <GroupBy />,
      },
    ];
    let nameAndLogoArrayMod: any;
    console.log('nameAndLogoArrayMod view', view);
    if (view) {
      if (view === 'Kanban') {
        nameAndLogoArrayMod = nameAndLogoArray.filter(
          (each) => each.name !== 'Group by'
        );
      } else {
        nameAndLogoArrayMod = nameAndLogoArray.filter(
          (each) => each.name !== 'Filter'
        );
      }
    } else {
      nameAndLogoArrayMod = nameAndLogoArray.filter(
        (each) => each.name !== 'Filter'
      );
    }
    console.log('nameAndLogoArrayMod', nameAndLogoArrayMod);
    setCurrentNameAndLogoArray(nameAndLogoArrayMod);
  }, []);
  // Menu Items
  const items: MenuProps['items'] = [
    {
      label: <div onClick={(e) => changeDatabaseView('Kanban')}>Kanban</div>,
      key: '0',
    },
    {
      label: <div onClick={(e) => changeDatabaseView('List')}>List</div>,
      key: '1',
    },
    {
      label: <div onClick={(e) => changeDatabaseView('Table')}>Table</div>,
      key: '3',
    },
  ];

  const newTaskHandler = () => {
    if (view === 'list') {
      setName(view);
      dispatch(setNewTaskClicked(!newTaskClicked));
      dispatch(checkToggle(selectedItemIndex));
    } else if (view === 'Kanban') {
      dispatch(triggerDefaultNewTask({ triggerFlag: true }));
    } else if (view === 'table') {
      setName('row');
      dispatch(setNewTaskClickedtable(!newTaskClickedtable));
    }
  };

  const handleOptionClick = (namePassed: any) => {
    if (namePassed === 'Group by' || namePassed === 'Filter') {
      setShowGroupBy(!showGroupBy);
    } else if (namePassed === 'Sort') {
      setShowSortBy(!showSortBy);
    }
  };
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const input = document.getElementById(`searchInputHeader`);
    input?.focus();
  });
  const onEscapeButtonPressed = (event: any) => {
    if (event.code === 'Escape') {
      setSearchClicked(false);
      dispatch(
        setSearchDocsKeyword({
          searchKey: null,
        })
      );
    }
    if (event.code === 'Enter') {
      dispatch(
        setSearchDocsKeyword({
          searchKey:
            inputRef?.current?.value?.length > 0
              ? inputRef?.current?.value.toLowerCase()
              : null,
        })
      );
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchkeyName(e.target.value)
  }

  const conditionalOptions = (item: any, i: any) => {
    if (item.name === 'Search') {
      return (
        <div
          style={{ position: 'relative' }}
          onClick={() => {
            handleOptionClick(item.name);
          }}
          className="flexCenter newTaskPanelItems"
        >
          {item.logo}
          {(searchClicked || workspaceDocsSearchKey) && (
            <AddNewTaskinput
              onKeyDown={onEscapeButtonPressed}
              placeholder={item.name}
              id="searchInputHeader"
              ref={inputRef}
              value={searchKeyName ? searchKeyName : ""}
              onChange={handleSearchChange}
            />
          )}
          {!searchClicked && (
            <p onClick={() => setSearchClicked(true)} className="itemName">
              {item.name}
            </p>
          )}
          {i === currentNameAndLogoArray?.length - 1 ? undefined : (
            <div className="verticalLine">|</div>
          )}
        </div>
      );
    }
    return (
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          handleOptionClick(item.name);
        }}
        className="flexCenter newTaskPanelItems"
      >
        {item.logo}

        <p className="itemName">{item.name}</p>
        {i === currentNameAndLogoArray?.length - 1 ? undefined : (
          <div className="verticalLine">|</div>
        )}
        {item.name === 'Filter' && showGroupBy && (
          <div className="groupbyOptions">
            <GroupByModal
              setShowGroupBy={setShowGroupBy}
              placeholder="Filter by"
              type={item.name}
            />
          </div>
        )}
        {item.name === 'Group by' && showGroupBy && (
          <div className="groupbyOptions">
            <GroupByModal
              setShowGroupBy={setShowGroupBy}
              placeholder="Group by"
              type={item.name}
            />
          </div>
        )}
        {item.name === 'Sort' && showSortBy && (
          <div className="sortbyOptions">
            <SortByModal setShowSortBy={setShowSortBy} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flexCenter">
      {currentNameAndLogoArray &&
        currentNameAndLogoArray?.map((item, i) => conditionalOptions(item, i))}
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
