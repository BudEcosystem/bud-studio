import { styled } from 'styled-components';
import React, { useRef, useState } from 'react';
import { Button, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ArrowDown,
  AssignIcon,
  FooterTopLine,
  PriorityIcon,
  STatusIcon,
  SelectorChar,
  ThreeDot,
} from '../../SVGs';

const Wrapper = styled.div`
  width: auto;
  height: auto;
  flex-shrink: 0;
  border-radius: 8px;
  border: 0.8px solid #333436;
  background: #171718;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
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
const HeaderFilterIndicator = styled.span`
  color: #8a8b8b;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5.87px;
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
  padding-bottom: 20px;
  padding-left: 24px;
  padding-right: 24px;
`;
const EachFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-left: 20px;
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
  flex-direction: row;
`;

function PopOverContent({ filterRules, callBackOnNewFilter }: any) {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onKeyDownHandlerForInput = (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      const copyOfFIlterRules: any = filterRules;
      const valuePassed = inputRef.current.value;
      const filterRuleObject = {
        key: 'Name',
        query: valuePassed,
        op: 'contains',
      };
      copyOfFIlterRules.push(filterRuleObject);
      callBackOnNewFilter(copyOfFIlterRules);
    }
  };
  const addNewFilterWithEmptyPrompts = () => {
    const copyOfFIlterRules: any = filterRules;
    const filterRuleObject = {
      key: '',
      query: '',
      op: 'contains',
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
  };
  const deterMineIcons = (tag: string) => {
    switch (tag) {
      case 'Assign':
        return <AssignIcon style={{ marginLeft: '9px', minWidth: '18px' }} />;
      case 'Name':
        return <SelectorChar style={{ marginLeft: '9px', minWidth: '18px' }} />;
      case 'Priority':
        return <PriorityIcon style={{ marginLeft: '9px', minWidth: '18px' }} />;
      case 'Status':
        return <STatusIcon style={{ marginLeft: '9px', minWidth: '18px' }} />;
      default:
        return <SelectorChar style={{ marginLeft: '9px', minWidth: '18px' }} />;
    }
  };
  const changePropertyUsingIndex = (value: any, index: any) => {
    const copyOfFIlterRules: any = filterRules;
    copyOfFIlterRules[index].key = value;
    callBackOnNewFilter(copyOfFIlterRules);
  };
  return (
    <Wrapper>
      {filterRules?.length < 1 ? (
        <>
          {' '}
          <HeaderPart>
            <HeaderPartFirst>
              <HeaderFilterIndicator>Name</HeaderFilterIndicator>
              <HeaderFilterIndicator
                style={{ color: 'var(--shortcut, #7B8388)' }}
              >
                contains
              </HeaderFilterIndicator>
              <ArrowDown style={{ marginLeft: '10px', marginTop: '7px' }} />
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
        </>
      ) : (
        <EachFilterWrapper>
          {filterRules.map((eachRule: any, index: any) => (
            <EachFilterRuleSection>
              <HeaderFilterIndicator>Where</HeaderFilterIndicator>
              <EachFilterKeySection>
                {deterMineIcons(eachRule.key)}
                <Select
                  className="filter-key-selector"
                  defaultValue="Name"
                  onChange={(value) => changePropertyUsingIndex(value, index)}
                  options={[
                    { value: 'Assign', label: 'Assign' },
                    { value: 'Name', label: 'Name' },
                    { value: 'Priority', label: 'Priority' },
                    { value: 'Status', label: 'Status' },
                  ]}
                  showArrow
                />
              </EachFilterKeySection>
              <Select
                defaultValue="Contains"
                style={{
                  width: 120,
                  marginLeft: '8px',
                }}
                onChange={() => {}}
                options={[
                  { value: 'is', label: 'Is' },
                  { value: 'is_not', label: 'Is not' },
                  { value: 'contains', label: 'Contains' },
                  { value: 'does_not_contains', label: 'Does not contains' },
                  { value: 'starts_with', label: 'Starts with' },
                  { value: 'ends_with', label: 'Ends with' },
                  { value: 'is_empty', label: 'Is empty' },
                  { value: 'is_not_empty', label: 'Is not empty' },
                ]}
              />
              <InputWrapperFilterEntry>
                <InputFieldFilterEntry
                  ref={inputRef}
                  placeholder="Value"
                  value={eachRule.query}
                  onKeyDown={onKeyDownHandlerForInput}
                />
              </InputWrapperFilterEntry>{' '}
              <DeleteOutlined
                rev={undefined}
                style={{ color: 'red', fontSize: '18px', marginLeft: '8px' }}
                onClick={() => deleteFilterRule(index)}
              />
            </EachFilterRuleSection>
          ))}
          <AddFilterSection>
            {' '}
            <Button
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
                marginLeft: '24px',
              }}
              onClick={addNewFilterWithEmptyPrompts}
            >
              Add filter rule
            </Button>
          </AddFilterSection>

          <FooterTopLine />
          <FilterViewFooterSection>
            <FilterViewFooterButtonSection>
              {' '}
              <Button
                onClick={deleteAllFilterRules}
                style={{
                  color: 'var(--shortcut, #7B8388)',
                  fontFamily: 'Noto Sans',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: ' 100%',
                  marginLeft: '24px',
                  padding: '0px',
                }}
                type="text"
              >
                Delete Filter
              </Button>
            </FilterViewFooterButtonSection>
          </FilterViewFooterSection>
        </EachFilterWrapper>
      )}
    </Wrapper>
  );
}

export default PopOverContent;
