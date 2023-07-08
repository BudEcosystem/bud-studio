import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTitle, taskViewDataChange } from 'redux/slices/list';
import { setCurrentSelectedUI } from 'redux/slices/activestate';
import {
  editDocumentTitleById,
  updateDocumentTagById,
} from '@/redux/slices/workspace';
import { Calendar, Button, Popover, Icon, Space, Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import {
  BoxArrow,
  CheckList,
  DownArrow,
  Flag,
  FoldedCard,
  FourDots,
  Sicon,
  SmallerFlag,
  User,
} from '../ListViewIcons';
import SkillBar from './SkillBar';
import CircularImageComponent from './CircularImageComponent';
import CircularBorder from './CircularBorder';

const data = ['', ''];

function HeaderSubComp({
  index,
  childIndex,
  status,
  data,
  subChild,
  provided,
  expanded,
  toggleSubAccordion,
}) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title);

  const { color } = useSelector((state) => state.workspace);
  const handleDoubleClick = (e) => {
    setEditing(true);
    e.stopPropagation();
  };
  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        editDocumentTitleById({ documentID: data.entry.uuid, newTitle })
      );
      // setNewTitle('');
      setEditing(false);
    }
  };

  // Tag
  const setTag = (tag) => {
    dispatch(
      updateDocumentTagById({ documentID: data.entry.uuid, newTags: 'test' })
    );
  };

  return (
    <div className="flexVerticalCenter HeaderSubCompParent">
      <div className="flexVerticalCenter">
        <div className="iconsContainer">
          <div
            {...provided?.dragHandleProps}
            style={{
              display: subChild ? 'none' : '',
            }}
          >
            <FourDots />
          </div>
          <div
            style={{
              transform: !expanded ? 'rotate(-90deg)' : '',
              transition: 'all 0.2s ease',
              marginLeft: '5px',
            }}
            onClick={() => toggleSubAccordion()}
          >
            <DownArrow />
          </div>
          <div className="textIcon22" />
        </div>
        {editing ? (
          <input
            className="titleInput"
            type="text"
            value={newTitle}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onBlur={() => setEditing(false)}
          />
        ) : (
          <p
            className="datatitleText"
            id="cardTitle"
            style={{ marginLeft: '16px' }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDoubleClick(e);
            }}
          >
            {data.title}
          </p>
        )}
        <div className="siconContainer">
          <div className="flexVerticalCenter" style={{ marginLeft: '0px' }}>
            <Sicon />
          </div>
          <div className="list-view-count">{data.siconValue || 0}</div>
          <div className="vertical-bar">|</div>
          <div style={{ marginLeft: '5px' }}>+</div>
        </div>
        <div className="checklistContainer">
          <div style={{ marginLeft: '0px' }}>
            <CheckList />
          </div>
          <div style={{ marginLeft: '2px' }}>
            <span>{data.checklist?.checked || 0}</span>/
            <span>{data.checklist?.total || 0}</span>
          </div>
        </div>
      </div>
      <div className="flexVerticalCenter">
        <div style={{ marginRight: '40px' }}>
          {data.checklist?.total && (
            <SkillBar
              percentage={
                (data.checklist?.checked / data.checklist?.total) * 100
              }
            />
          )}
        </div>
        <div style={{ marginRight: '40px' }}>
          {/* {data?.imagesData?.length > 0 ? ( */}
          {/*  <CircularImageComponent images={data.imagesData} /> */}
          {/* ) : ( */}
          {/*  <div style={{ marginRight: '14px' }}> */}
          {/*    <CircularBorder icon={<User />} /> */}
          {/*  </div> */}
          {/* )} */}
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          {data.page ? (
            <FoldedCard />
          ) : (
            <Popover
              trigger="click"
              placement="bottom"
              arrow={false}
              content={
                <div style={{ width: 300 }}>
                  <Calendar fullscreen={false} />
                </div>
              }
            >
              <Button type="text">
                <CircularBorder icon={<FoldedCard />} />
              </Button>
            </Popover>
            // <DatePicker />
            // <div style={{ marginRight: '-22px' }}>
            //
            // </div>
          )}
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          {data.flag ? (
            <Flag />
          ) : (
            <div style={{ marginRight: '15px' }}>
              <CircularBorder icon={<SmallerFlag />} />
            </div>
          )}
        </div>

        {true ? (
          //

          // eslint-disable-next-line react/prop-types
          <p className="recContainer flexCenter">
            {
              data.entry.properties.find(
                (prop: { title: string; value: any }) => prop.title === 'Tags'
              )?.value[0]
            }
          </p>
        ) : (
          <Popover
            overlayClassName="list-view-tag-set-pop"
            content={
              <div className="list-view-tag-set">
                <Input defaultValue="Recurring" />
                <AddTagButton color={color} onClick={setTag}>
                  Update Tag
                </AddTagButton>
              </div>
            }
            arrow={false}
            title="Tag"
            trigger="click"
            placement="bottom"
          >
            <Button type="text">
              <CircularBorder icon={<BoxArrow />} />
            </Button>
          </Popover>
          // <CircularBorder icon={<BoxArrow />} />
        )}
      </div>
    </div>
  );
}

// Styles
const AddTagButton = styled.div`
  background-color: ${(props) => props.color};
  border: none;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  height: 30px;
  border-radius: 4px;
  outline: none;
  opacity: 0.5;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;

export default HeaderSubComp;
