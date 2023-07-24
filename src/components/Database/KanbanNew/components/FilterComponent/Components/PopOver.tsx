import { styled } from 'styled-components';
import React, { useRef, useState } from 'react';
import { Button, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import {
  ArrowDown,
  AssignIcon,
  FooterTopLine,
  PriorityIcon,
  STatusIcon,
  SelectorChar,
  ThreeDot,
} from '../../SVGs';
import CustomDropDown from './CustomDropDown';
import { useDispatch } from 'react-redux';
import { clearWorkSpaceFilterKey } from '@/redux/slices/workspace';

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
  padding-right: 24px;
  padding-left: 24px;
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

const EachFilterRuleSection = styled.div`
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
    value: 'Assign',
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
    value: 'Name',
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
    value: 'Priority',
    filterArray: [
      { value: 'is', label: 'Is' },
      { value: 'is_not', label: 'Is not' },
    ],
  },
  {
    value: 'Status',
    filterArray: [
      { value: 'is', label: 'Is' },
      { value: 'is_not', label: 'Is not' },
    ],
  },
];
function PopOverContent({
  filterRules,
  callBackOnNewFilter,
  defaultKey,
  filterType,
}: any) {
  const dispatch = useDispatch();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onKeyDownHandlerForInput = (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      const copyOfFIlterRules: any = filterRules;
      const valuePassed = inputRef.current.value;
      copyOfFIlterRules.map((data: any) => {
        if (data.key === defaultKey) {
          data.query = valuePassed;
        }
        return data;
      });
      callBackOnNewFilter(copyOfFIlterRules);
    }
  };
  const addNewFilterWithEmptyPrompts = () => {
    const copyOfFIlterRules: any = filterRules;
    const filterRuleObject = {
      key: 'Name',
      query: '',
      op: 'is',
      condition: 'and',
    };
    copyOfFIlterRules.push(filterRuleObject);
    callBackOnNewFilter(copyOfFIlterRules);
  };
  const deleteFilterRule = (index: any) => {
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules.splice(index, 1);
    callBackOnNewFilter(copyOfFIlterRules);
  };
  const deleteAllFilterRules = () => {
    const copyOfFIlterRules: any = [];
    callBackOnNewFilter(copyOfFIlterRules);
    dispatch(clearWorkSpaceFilterKey());
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
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules[index].key = value;
    if (value === 'Status') {
      copyOfFIlterRules[index].query = 'not_started';
    } else if (value === 'Priority') {
      copyOfFIlterRules[index].query = 'High';
    }
    callBackOnNewFilter(copyOfFIlterRules);
  };
  const changeConditionUsingIndex = (value: any, index: any) => {
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules[index].condition = value;
    callBackOnNewFilter(copyOfFIlterRules);
  };
  const changeQueryUsingIndex = (value: any, index: any) => {
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules[index].query = value;
    callBackOnNewFilter(copyOfFIlterRules);
  };
  const changeOperationUsingIndex = (value: any, index: any) => {
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules[index].op = value;
    callBackOnNewFilter(copyOfFIlterRules);
  };
  const changeOperationUsingdefaulkey = (value: any, index: any) => {
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules.map((data: any) => {
      if (data.key === index) {
        data.op = value;
      }
      return data;
    });
    callBackOnNewFilter(copyOfFIlterRules);
  };
  return (
    <Wrapper widthSet={filterType === 'chain' ? 386 : 486}>
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
                defaultValue={
                  keyBinding.filter(
                    (eachKey: any) => eachKey.value === defaultKey
                  )[0]?.filterArray[0].value
                }
                style={{
                  maxWidth: 112,
                  minWidth: 112,
                  marginLeft: '8px',
                  marginTop: '-6px',
                }}
                onChange={(value) => {
                  changeOperationUsingdefaulkey(value, defaultKey);
                }}
                options={
                  keyBinding.filter(
                    (eachKey: any) => eachKey.value === defaultKey
                  )[0]?.filterArray
                }
              />
              {/* <ArrowDown style={{ marginLeft: '10px', marginTop: '7px' }} /> */}
            </HeaderPartFirst>
            <HeaderPartSecond>
              <ThreeDot />
            </HeaderPartSecond>
          </HeaderPart>
          <InputWrapper>
            <InputField
              ref={inputRef}
              placeholder="Type a value"
              onKeyDown={onKeyDownHandlerForInput}
            />
          </InputWrapper>{' '}
          <FooterTopLine />
          <FilterViewFooterSection>
            <FilterViewFooterButtonSection>
              {' '}
              <div
                style={{
                  maxWidth: '65px',
                  // marginLeft: '24px',
                }}
              >
                <Button
                  onClick={deleteAllFilterRules}
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
                  Delete Filter
                </Button>
              </div>
            </FilterViewFooterButtonSection>
          </FilterViewFooterSection>
        </>
      )}
      {filterType === 'group' && (
        <EachFilterWrapper>
          {filterRules.map((eachRule: any, index: any) => (
            <EachFilterRuleSection>
              {index === 0 && (
                <HeaderFilterIndicator
                  style={{
                    minWidth: '91px',
                  }}
                >
                  Where
                </HeaderFilterIndicator>
              )}
              {index !== 0 && (
                <Select
                  popupClassName="condition-render-select"
                  defaultValue="and"
                  style={{
                    minWidth: '97px',
                    maxWidth: '97px',
                  }}
                  onChange={(value) => changeConditionUsingIndex(value, index)}
                  options={[
                    { value: 'and', label: 'And' },
                    { value: 'or', label: 'OR' },
                  ]}
                />
              )}
              <EachFilterKeySection index={index}>
                <Select
                  className="filter-key-selector"
                  popupClassName="condition-key-select"
                  defaultValue={eachRule.key || 'Name'}
                  onChange={(value) => changePropertyUsingIndex(value, index)}
                  showArrow
                  dropdownRender={(menu) => CustomDropDown({ menu })}
                  options={[
                    { value: 'Assign', label: 'Assign' },
                    { value: 'Name', label: 'Name' },
                    { value: 'Priority', label: 'Priority' },
                    { value: 'Status', label: 'Status' },
                  ].map((data) => {
                    return {
                      value: data.value,
                      label: (
                        <div
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
              </EachFilterKeySection>
              <Select
                popupClassName="condition-render-select"
                defaultValue={
                  keyBinding.filter(
                    (eachKey: any) => eachKey.value === filterRules[index].key
                  )[0]?.filterArray[0].value
                }
                style={{
                  maxWidth: 112,
                  minWidth: 112,
                  marginLeft: '8px',
                }}
                onChange={(value) => {
                  changeOperationUsingIndex(value, index);
                }}
                options={
                  keyBinding.filter(
                    (eachKey: any) => eachKey.value === filterRules[index].key
                  )[0]?.filterArray
                }
              />
              {['Priority', 'Status'].includes(eachRule.key) ? (
                <Select
                  popupClassName="condition-render-select"
                  defaultValue={
                    eachRule.key === 'Priority'
                      ? PriorityArray[0].value
                      : StatusArray[0].value
                  }
                  style={{
                    maxWidth: 80,
                    minWidth: 80,
                    marginLeft: '8px',
                  }}
                  onChange={(value) => {
                    changeQueryUsingIndex(value, index);
                  }}
                  options={
                    eachRule.key === 'Priority' ? PriorityArray : StatusArray
                  }
                />
              ) : (
                <InputWrapperFilterEntry>
                  <InputFieldFilterEntry
                    // ref={inputRef}
                    placeholder="Value"
                    value={eachRule.query}
                    onChange={(event) =>
                      changeQueryUsingIndex(event.target.value, index)
                    }
                  />
                </InputWrapperFilterEntry>
              )}
              <DeleteOutlined
                rev={undefined}
                style={{ color: 'red', fontSize: '18px', marginLeft: '8px' }}
                onClick={() => deleteFilterRule(index)}
              />
            </EachFilterRuleSection>
          ))}
          <AddFilterSection>
            {' '}
            <div
              style={{
                maxWidth: '111px',
                // marginLeft: '24px',
              }}
            >
              {' '}
              <Button
                className="add-new-filter-button"
                type="text"
                shape="round"
                icon={<PlusOutlined rev={undefined} />}
                style={{
                  color: 'var(--shortcut, #7B8388)',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: ' 155%',
                  padding: '0px',
                }}
                onClick={addNewFilterWithEmptyPrompts}
              >
                Add filter rule
              </Button>
            </div>
          </AddFilterSection>

          <FooterTopLine />
          <FilterViewFooterSection>
            <FilterViewFooterButtonSection>
              {' '}
              <div
                style={{
                  maxWidth: '65px',
                  // marginLeft: '24px',
                }}
              >
                <Button
                  onClick={deleteAllFilterRules}
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
                  Delete Filter
                </Button>
              </div>
            </FilterViewFooterButtonSection>
          </FilterViewFooterSection>
        </EachFilterWrapper>
      )}
    </Wrapper>
  );
}

export default PopOverContent;
