import React, { useEffect, useState } from 'react';
import {
  CheckList,
  SmallerFlag,
  FoldedCard,
  Sicon,
  BoxArrow,
  Cross,
  DownArrow,
  FourDots,
} from '../../ListView/ListViewIcons';
import '../TaskView.css';
import CircularBorder from '../../ListView/ListViewComponents/CircularBorder';
import { useSelector, useDispatch } from 'react-redux';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, message, Space, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { Arrow } from '../TaskViewIcons';
import { data } from '@/components/TableviewNew/data';
import { changeStatus, setSubTaskStatus } from '@/redux/slices/workspace';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const CheckList = ({ provided, snapshot, item }: any) => {
    
const dispatch = useDispatch();
const [checked, setChecked] = useState(item.checked)

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`GOCHECKED = ${e.target.checked}`);
    if(e.target.checked) {
        setChecked(true)
    }
    else {
        setChecked(false)
    }
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
          <Checkbox defaultChecked={checked} onChange={onChange}></Checkbox>
        </div>
        <div style={{textDecoration : `${checked ? 'line-through' : ''}`}} className="textTodo">{item.title}</div>
      </div>
    </div>
  );
};

export default CheckList;
