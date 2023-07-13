import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { ArrowDown, HamburgerIcon, SelectorChar } from '../SVGs';
import { Popover } from 'antd';
import PopOverContent from './Components/PopOver';

const KanbanFilterWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const KanbanFilterFirstHalf = styled.div`
  display: flex;
`;
const KanbanFilterSecondHalf = styled.div`
  display: flex;
`;

const KanbanFilterSelectorWrapper = styled.div`
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
const KanbanFilterIndicator = styled.span`
  color: #8a8b8b;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5.87px;
`;
function KanbanFilter() {
  const [filterRules, setFilterRules] = useState<object>([]);
  // const [filterRules, setFilterRules] = useState([]);
  console.log('filters filterRules', filterRules);
  const callBackOnNewFilter = (arrayPassed: any) => {
    console.log('filters - callbackfunction');
    setFilterRules([...arrayPassed]);
  };
  return (
    <KanbanFilterWrapper>
      <KanbanFilterFirstHalf>
        <KanbanFilterSelectorWrapper>
          {filterRules.length < 1 ? (
            <Popover
              placement="bottomLeft"
              arrow={false}
              trigger="click"
              content={
                <PopOverContent
                  filterRules={filterRules}
                  callBackOnNewFilter={callBackOnNewFilter}
                />
              }
            >
              <SelectorChar style={{ marginLeft: '9px' }} />
              <KanbanFilterIndicator>Name</KanbanFilterIndicator>
              <ArrowDown style={{ marginLeft: '10px', marginTop: '5px' }} />
            </Popover>
          ) : (
            <Popover
              placement="bottomLeft"
              arrow={false}
              trigger="click"
              content={
                <PopOverContent
                  filterRules={filterRules}
                  callBackOnNewFilter={callBackOnNewFilter}
                />
              }
            >
              <HamburgerIcon style={{ marginLeft: '9px' }} />
              <KanbanFilterIndicator>{`${filterRules.length} rule`}</KanbanFilterIndicator>
              <ArrowDown style={{ marginLeft: '10px', marginTop: '5px' }} />
            </Popover>
          )}
        </KanbanFilterSelectorWrapper>
      </KanbanFilterFirstHalf>
      <KanbanFilterSecondHalf />
    </KanbanFilterWrapper>
  );
}

export default KanbanFilter;
