import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { Button, Popover, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ArrowDown,
  AssignIcon,
  HamburgerIcon,
  PriorityIcon,
  STatusIcon,
  SelectorChar,
} from '../SVGs';
import PopOverContent from './Components/PopOver';
import CustomDropDown from './Components/CustomDropDown';

const KanbanSortWrapper = styled.div`
  width: 94%;
  display: flex;
  cursor: pointer;
`;
const KanbanSortFirstHalf = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 10px;
  }
`;
const KanbanSortSecondHalf = styled.div`
  display: flex;
`;

const KanbanSortSelectorWrapper = styled.div`
  height: 32px;
  width: 103px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 0.871px solid #1d1d1d;
  background: #171718;
  display: flex;
  align-items: center;
`;
const KanbanSortIndicator = styled.span`
  color: #8a8b8b;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5.87px;
`;

function TableSort({ sortRules, callBackOnNewFilter, filterType }: any) {
  const deterMineIcons = (tag: string) => {
    switch (tag) {
      case 'Assign':
        return <AssignIcon style={{ marginLeft: '9px' }} />;
      case 'Name':
        return <SelectorChar style={{ marginLeft: '9px' }} />;
      case 'Priority':
        return <PriorityIcon style={{ marginLeft: '9px' }} />;
      case 'Status':
        return <STatusIcon style={{ marginLeft: '9px' }} />;
      default:
        return <SelectorChar style={{ marginLeft: '9px' }} />;
    }
  };
  return (
    <KanbanSortWrapper>
      <KanbanSortFirstHalf>
        {filterType === 'chain' &&
          sortRules.map((eachChainFilter: any) => (
            <KanbanSortSelectorWrapper>
              <Popover
                placement="bottomLeft"
                arrow={false}
                // style={{ marginLeft: '10px' }}
                trigger="click"
                content={
                  <PopOverContent
                    sortRules={sortRules}
                    callBackOnNewFilter={callBackOnNewFilter}
                    defaultKey={eachChainFilter.key}
                    filterType={filterType}
                  />
                }
              >
                {/* <SelectorChar style={{ marginLeft: '9px' }} /> */}
                {deterMineIcons(eachChainFilter.key || 'Name')}
                <KanbanSortIndicator>
                  {eachChainFilter.key || 'Name'}
                </KanbanSortIndicator>
                <ArrowDown style={{ marginLeft: '10px', marginTop: '5px' }} />
              </Popover>
            </KanbanSortSelectorWrapper>
          ))}
      </KanbanSortFirstHalf>
      <KanbanSortSecondHalf />
    </KanbanSortWrapper>
  );
}

export default TableSort;
