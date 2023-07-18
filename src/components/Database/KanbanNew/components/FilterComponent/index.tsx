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

const KanbanFilterWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const KanbanFilterFirstHalf = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 10px;
  }
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

const AddNewWrapper = styled.span`
  color: #8a8b8b;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5.87px;
  margin-top: 10px;
`;
function KanbanFilter({ filterRules, callBackOnNewFilter, filterType }: any) {
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
  const addNewConditionToChain = (value: string) => {
    const copyOfFilterRules = Array.from(filterRules);
    const filterRuleObject = {
      key: value,
      query: '',
      op: 'is',
      condition: null,
    };
    copyOfFilterRules.push(filterRuleObject);
    callBackOnNewFilter(copyOfFilterRules);
  };
  const renderAddNewDropDown = () => {
    const filterRulesKeys = filterRules.map((data: any) => data.key);
    let displayFlag =
      [
        { value: 'Assign', label: 'Assign' },
        { value: 'Name', label: 'Name' },
        { value: 'Priority', label: 'Priority' },
        { value: 'Status', label: 'Status' },
      ].filter((eachSet) => !filterRulesKeys.includes(eachSet.value)).length >
      0;
    return (
      <AddNewWrapper>
        {displayFlag && (
          <Select
            bordered={false}
            suffixIcon={<PlusOutlined rev={undefined} />}
            popupClassName="condition-key-select"
            defaultValue="Add New"
            value="Add New"
            showArrow
            dropdownRender={(menu) => CustomDropDown({ menu, test: true })}
            onSelect={(value) => addNewConditionToChain(value)}
            options={[
              { value: 'Assign', label: 'Assign' },
              { value: 'Name', label: 'Name' },
              { value: 'Priority', label: 'Priority' },
              { value: 'Status', label: 'Status' },
            ]
              .filter((eachSet) => !filterRulesKeys.includes(eachSet.value))
              .map((data) => {
                return {
                  value: data.value,
                  label: (
                    <div
                      // onKeyDown={addNewConditionToChain(data.label)}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          width: '30px',
                        }}
                      >
                        {deterMineIcons(data.label)}
                      </div>
                      <span>{data.label}</span>
                    </div>
                  ),
                };
              })}
          />
        )}
      </AddNewWrapper>
    );
  };
  console.log('filterRules', filterRules);
  return (
    <KanbanFilterWrapper>
      <KanbanFilterFirstHalf>
        {filterType === 'chain' &&
          filterRules.map((eachChainFilter: any) => (
            <KanbanFilterSelectorWrapper>
              <Popover
                placement="bottomLeft"
                arrow={false}
                // style={{ marginLeft: '10px' }}
                trigger="click"
                content={
                  <PopOverContent
                    filterRules={filterRules}
                    callBackOnNewFilter={callBackOnNewFilter}
                    defaultKey={eachChainFilter.key}
                    filterType={filterType}
                  />
                }
              >
                {/* <SelectorChar style={{ marginLeft: '9px' }} /> */}
                {deterMineIcons(eachChainFilter.key || 'Name')}
                <KanbanFilterIndicator>
                  {eachChainFilter.key || 'Name'}
                </KanbanFilterIndicator>
                <ArrowDown style={{ marginLeft: '10px', marginTop: '5px' }} />
              </Popover>
            </KanbanFilterSelectorWrapper>
          ))}
        {filterType === 'group' && (
          <KanbanFilterSelectorWrapper>
            <Popover
              placement="bottomLeft"
              arrow={false}
              trigger="click"
              content={
                <PopOverContent
                  filterType={filterType}
                  filterRules={filterRules}
                  callBackOnNewFilter={callBackOnNewFilter}
                />
              }
            >
              <HamburgerIcon style={{ marginLeft: '9px' }} />
              <KanbanFilterIndicator>{`${filterRules.length} rule`}</KanbanFilterIndicator>
              <ArrowDown style={{ marginLeft: '10px', marginTop: '5px' }} />
            </Popover>
          </KanbanFilterSelectorWrapper>
        )}
        {filterType === 'chain' && renderAddNewDropDown()}
      </KanbanFilterFirstHalf>
      <KanbanFilterSecondHalf />
    </KanbanFilterWrapper>
  );
}

export default KanbanFilter;
