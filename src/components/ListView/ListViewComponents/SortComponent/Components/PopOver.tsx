import { styled } from 'styled-components';
import React, { useRef, useState } from 'react';
import { Button, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import { useDispatch } from 'react-redux';
import {
  clearWorkSpaceFilterKey,
  clearWorkSpaceSortKey,
} from '@/redux/slices/workspace';
import {
  ArrowDown,
  AssignIcon,
  FooterTopLine,
  PriorityIcon,
  STatusIcon,
  SelectorChar,
  ThreeDot,
} from '@/components/Database/KanbanNew/components/SVGs';
import CustomDropDown from './CustomDropDown';

const Wrapper = styled.div`
  // margin-left: ${(props: any) => (props?.index === 0 ? '7px' : '7px')};
  width: ${(props: any) => props?.widthSet}px;
  height: auto;
  flex-shrink: 0;
  border-radius: 8px;
  border: 0.8px solid #333436;
  background: #171718;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding-right: 24px;
  padding-left: 24px;
`;
const HeaderPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 14px;
  // padding-left: 14px;
  padding-bottom: 24px;
  margin-top: 11px;
`;
const HeaderPartFirst = styled.div`
  display: flex;
  flex-direction: row;
`;
const HeaderPartSecond = styled.div`
  display: flex;
  flex-direction: row;
`;
const HeaderFilterIndicator = styled.div`
  color: #8a8b8b;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5.87px;
  min-width: 97px;
  width: 40px;
`;
const InputWrapper = styled.div`
  padding-right: 18px;
  padding-left: 18px;
  margin-top: 8px;
  padding-bottom: 18px;
`;
const InputField = styled.input`
  width: 299px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 0.5px solid #939aff;
  background: #151517;
  color: #bbbbbb;
  /* Regular white 14 */
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding-left: 10px;
  &::placeholder,
  &::-webkit-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    text-align: left;
    color: #3d4047;
    padding-left: 10px;
  }
  &:-ms-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    color: #3d4047;
    padding-left: 10px;
  }
`;

const EachsortRulesection = styled.div`
  width: 445px;
  display: flex;
  flex-direction: row;
  padding-top: 14px;
  align-items: center;
`;
const EachFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-child {
    margin-bottom: 24px;
  }
`;
const EachFilterKeySection = styled.div`
  width: 111px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #1d1d1d;
  background: #0c0c0c;
  display: flex;
  align-items: center;
  margin-left: ${(props: any) => (props?.index === 0 ? '7px' : '7px')};
`;

const FilterKeyIndicator = styled.span`
  color: #8a8b8b;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5.87px;
`;

const InputWrapperFilterEntry = styled.div`
  margin-left: 8px;
`;
const InputFieldFilterEntry = styled.input`
  width: 82px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 0.5px solid #939aff;
  background: #151517;
  color: #bbbbbb;
  /* Regular white 14 */
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding-left: 10px;
  &::placeholder,
  &::-webkit-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    text-align: left;
    color: #3d4047;
    padding-left: 10px;
  }
  &:-ms-input-placeholder {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 154.5%;
    /* identical to box height, or 22px */
    color: #3d4047;
    padding-left: 10px;
  }
`;

const FilterViewFooterSection = styled.div`
  height: 30px;
  width: 445px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FilterViewFooterButtonSection = styled.div`
  width: 445px;
  display: flex;
  flex-direction: row;
`;
const AddFilterSection = styled.div`
  display: flex;
  width: 445px;
  margin-bottom: 14px;
  margin-top: 24px;
  flex-direction: row;
`;
const PriorityArray = [
  { label: 'High', value: 'High', color: '#fff' },
  { label: 'Low', value: 'Low', color: '#fff' },
  { label: 'Medium', value: 'Medium', color: '#fff' },
  { label: 'Normal', value: 'Normal', color: '#fff' },
];
const StatusArray = [
  {
    label: 'Not Started',
    value: 'not_started',
    color: 'red',
    key: 'not_started',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    color: 'yellow',
    key: 'in_progress',
  },
  { label: 'In Review', value: 'in_review', color: 'blue', key: 'in_review' },
  { label: 'Done', value: 'done', color: 'green', key: 'done' },
];
const keyBinding: any = [
  {
    value: 'ASC',
    filterArray: [
      { value: 'is', label: 'Is' },
      { value: 'is_not', label: 'Is not' },
      { value: 'contains', label: 'Contains' },
      { value: 'does_not_contains', label: 'Does not contains' },
      { value: 'starts_with', label: 'Starts with' },
      { value: 'ends_with', label: 'Ends with' },
      { value: 'is_empty', label: 'Is empty' },
      { value: 'is_not_empty', label: 'Is not empty' },
    ],
  },
  {
    value: 'DSC',
    filterArray: [
      { value: 'is', label: 'Is' },
      { value: 'is_not', label: 'Is not' },
      { value: 'contains', label: 'Contains' },
      { value: 'does_not_contains', label: 'Does not contains' },
      { value: 'starts_with', label: 'Starts with' },
      { value: 'ends_with', label: 'Ends with' },
      { value: 'is_empty', label: 'Is empty' },
      { value: 'is_not_empty', label: 'Is not empty' },
    ],
  },
];
function PopOverContent({
  sortRules,
  callBackOnNewFilter,
  defaultKey,
  filterType,
}: any) {
  const dispatch = useDispatch();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onKeyDownHandlerForInput = (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      const copyOfsortRules: any = sortRules;
      const valuePassed = inputRef.current.value;
      copyOfsortRules.map((data: any) => {
        if (data.key === defaultKey) {
          data.query = valuePassed;
        }
        return data;
      });
      callBackOnNewFilter(copyOfsortRules);
    }
  };
  const addNewFilterWithEmptyPrompts = () => {
    const copyOfsortRules: any = sortRules;
    const filterRuleObject = {
      key: 'Name',
      query: '',
      op: 'is',
      condition: 'and',
    };
    copyOfsortRules.push(filterRuleObject);
    callBackOnNewFilter(copyOfsortRules);
  };
  const deleteFilterRule = (index: any) => {
    const copyOfsortRules: any = sortRules;
    copyOfsortRules.splice(index, 1);
    callBackOnNewFilter(copyOfsortRules);
  };
  const deleteAllsortRules = () => {
    const copyOfsortRules: any = [];
    callBackOnNewFilter(copyOfsortRules);
    dispatch(clearWorkSpaceSortKey());
  };
  const deterMineIcons = (tag: string) => {
    switch (tag) {
      case 'Assign':
        return <AssignIcon />;
      case 'Name':
        return <SelectorChar />;
      case 'Priority':
        return <PriorityIcon />;
      case 'Status':
        return <STatusIcon />;
      default:
        return <SelectorChar />;
    }
  };
  const changePropertyUsingIndex = (value: any, index: any) => {
    const copyOfsortRules: any = sortRules;
    copyOfsortRules[index].key = value;
    if (value === 'Status') {
      copyOfsortRules[index].query = 'not_started';
    } else if (value === 'Priority') {
      copyOfsortRules[index].query = 'High';
    }
    callBackOnNewFilter(copyOfsortRules);
  };
  const changeConditionUsingIndex = (value: any, index: any) => {
    const copyOfsortRules: any = sortRules;
    copyOfsortRules[index].condition = value;
    callBackOnNewFilter(copyOfsortRules);
  };
  const changeQueryUsingIndex = (value: any, index: any) => {
    const copyOfsortRules: any = sortRules;
    copyOfsortRules[index].query = value;
    callBackOnNewFilter(copyOfsortRules);
  };
  const changeOperationUsingIndex = (value: any, index: any) => {
    const copyOfsortRules: any = sortRules;
    copyOfsortRules[index].op = value;
    callBackOnNewFilter(copyOfsortRules);
  };
  const changeOperationUsingdefaulkey = (value: any, index: any) => {
    const copyOfsortRules: any = sortRules;
    copyOfsortRules.map((data: any) => {
      if (data.key === index) {
        data.op = value;
      }
      return data;
    });
    callBackOnNewFilter(copyOfsortRules);
  };
  return (
    <Wrapper widthSet={filterType === 'chain' ? 236 : 486}>
      {filterType === 'chain' && (
        <>
          {' '}
          <HeaderPart>
            <HeaderPartFirst>
              <HeaderFilterIndicator style={{ minWidth: '40px' }}>
                {defaultKey || 'Name'}
              </HeaderFilterIndicator>
              <Select
                bordered={false}
                popupClassName="condition-render-select"
                defaultValue={keyBinding[0].value}
                style={{
                  maxWidth: 112,
                  minWidth: 112,
                  marginLeft: '8px',
                  marginTop: '-6px',
                }}
                onChange={(value) => {
                  changeOperationUsingdefaulkey(value, defaultKey);
                }}
                options={keyBinding}
              />
            </HeaderPartFirst>
          </HeaderPart>
          <FilterViewFooterSection>
            <FilterViewFooterButtonSection>
              {' '}
              <div
                style={{
                  maxWidth: '65px',
                }}
              >
                <Button
                  onClick={deleteAllsortRules}
                  style={{
                    color: 'var(--shortcut, #7B8388)',
                    fontFamily: 'Noto Sans',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: ' 100%',
                    padding: '0px',
                  }}
                  type="text"
                >
                  Delete Sort
                </Button>
              </div>
            </FilterViewFooterButtonSection>
          </FilterViewFooterSection>
        </>
      )}
    </Wrapper>
  );
}

export default PopOverContent;
