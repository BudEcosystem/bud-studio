import React, { useEffect, useState } from 'react';
import {
  FourDots,
} from '../../ListView/ListViewIcons';
import '../TaskView.css';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { Arrow } from '../TaskViewIcons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { setCheckedReducer } from '@/redux/slices/workspace';

const CheckList = ({ provided, snapshot, item, parentId }: any) => {
    
const dispatch = useDispatch();
const [checked, setChecked] = useState(item.checked)

  const onChange = (e: CheckboxChangeEvent) => {
    if(e.target.checked) {
        setChecked(true)
    }
    else {
        setChecked(false)
    }
    var id = item.id;
    var label = e.target.checked;
    dispatch(setCheckedReducer({parentId, id, label}))
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
          <Checkbox defaultChecked={item.checked} onChange={onChange}></Checkbox>
        </div>
        <div style={{textDecoration : `${checked ? 'line-through' : ''}`}} className="textTodo">{item.title}</div>
      </div>
    </div>
  );
};

export default CheckList;
