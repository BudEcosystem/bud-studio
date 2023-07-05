import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { editTitle, taskViewDataChange } from 'redux/slices/list';
import { setCurrentSelectedUI } from 'redux/slices/activestate';

const data = ['', ''];

const HeaderSubComp = ({
  index,
  childIndex,
  status,
  data,
  subChild,
  provided,
  expanded,
  toggleSubAccordion,
}) => { 
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title);
  const handleDoubleClick = (e) => {
    setEditing(true);
    e.stopPropagation()
  };
  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(editTitle({ index, childIndex, newTitle, status }));
      setEditing(false);
      setNewTitle('');
    }
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
            onDoubleClick={(e) => {e.stopPropagation(); handleDoubleClick(e)}}
          >
            {data.title}
          </p>
        )}
        <div className="siconContainer">
          <div className="flexVerticalCenter" style={{ marginLeft: '0px' }}>
            <Sicon />
          </div>
          <div style={{ marginLeft: '0px' }}>{data.siconValue}</div>
          <div
            style={{ marginLeft: '8px', color: 'rgba(123, 131, 136, 0.25)' }}
          >
            |
          </div>
          <div style={{ marginLeft: '5px' }}>+</div>
        </div>
        <div className="checklistContainer">
          <div style={{ marginLeft: '0px' }}>
            <CheckList />
          </div>
          <div style={{ marginLeft: '2px' }}>
            <span>{data.checklist?.checked}</span>/
            <span>{data.checklist?.total}</span>
          </div>
        </div>
      </div>
      <div className="flexVerticalCenter">
        <div style={{ marginRight: '40px' }}>
          <SkillBar
            percentage={(data.checklist?.checked / data.checklist?.total) * 100}
          />
        </div>
        <div style={{ marginRight: '40px' }}>
          {data?.imagesData?.length > 0 ? (
            <CircularImageComponent images={data.imagesData} />
          ) : (
            <div style={{ marginRight: '14px' }}>
              <CircularBorder icon={<User />} />
            </div>
          )}
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          {data.page ? (
            <FoldedCard />
          ) : (
            <div style={{ marginRight: '-22px' }}>
              <CircularBorder icon={<FoldedCard />} />
            </div>
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

        {data.recurring ? (
          <p className="recContainer flexCenter">Recurring</p>
        ) : (
          <CircularBorder icon={<BoxArrow />} />
        )}
      </div>
    </div>
  );
};

export default HeaderSubComp;
