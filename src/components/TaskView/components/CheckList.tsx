import React, { useEffect, useState } from 'react';
import { FourDots } from '../../ListView/ListViewIcons';
import '../TaskView.css';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { Arrow } from '../TaskViewIcons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { setCheckedReducer } from '@/redux/slices/workspace';

const CheckList = ({ provided, snapshot, item, parentId, color }: any) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(
      setCheckedReducer({ parentId, id: item.id, label: !item.checked })
    );
  };

  const style = {
    width: '12px',
    height: ' 12px',
    borderRadius: '4px',
    border: `0.8px solid ${item.checked ? color : '#FFF'}`,
    background: item.checked ? color : '',
    cursor: 'pointer',
  };

  return (
    <div
      className="headerComponentInputParent"
      style={{ background: snapshot?.isDragging ? '#25272B' : 'none' }}
      // style={{ background: 'none' }}
    >
      <div className="flex">
        <div className="iconsContainer">
          <div
            className="flexCenter"
            style={{ marginRight: '8px' }}
            {...provided?.dragHandleProps}
          >
            <FourDots />
          </div>
          <div className="flexCenter" style={{ marginRight: '8px' }}>
            <Arrow />
          </div>
          <div
            className="checkedContainer"
            style={style}
            onClick={clickHandler}
          ></div>
        </div>
        <div
          style={{
            textDecoration: `${item.checked ? 'line-through' : ''}`,
            textDecorationColor: color,
            textDecorationThickness: '2px',
          }}
          className="textTodo"
        >
          {item.title}
        </div>
      </div>
    </div>
  );
};

export default CheckList;
