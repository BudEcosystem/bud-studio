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
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { Arrow } from '../TaskViewIcons';
import { data } from '@/components/TableviewNew/data';
import { changeStatus, setSubTaskStatus } from '@/redux/slices/workspace';

const TextComponent = ({removeBox, id, provided, snapshot, text, dataId, statusPanels }: any) => {

  const [status,setStatus] = useState("");
  const [dropList, setDropList] = useState([]);
const dispatch = useDispatch();
const [statusObj, setStatusObj] = useState(statusPanels)
  

  const items: MenuProps['items'] = [
    
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    items.forEach((item) => {
      if(item?.key==e.key){
      console.log("GGG", item.label )
      var label = item.label
      setStatus(item.label)
      dispatch(changeStatus({id, label}))
    }
    })
  };

  const menuProps = {
  items,
  onClick: handleMenuClick,
};

statusObj?.forEach((status: any, i: any) => {
  const obj  = {key: `${i}`, label: `${status.headerText}`}
  items.push(obj)
})

  useEffect(() => {
    dataId?.forEach((doc: any) => {
      if(id == doc.uuid) {
        const temp = doc.properties[2].value;
        const formattedStatus = temp.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());
        setStatus(formattedStatus)

        
      }
    })
  }, [dataId])
  

  
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
          {!removeBox && <div className="textIcon22"></div>}
        </div>
        <div className="textTodo">{text}</div>
      </div>

    <div style={{display: 'flex'}}>
      <div style={{width: "100px", height: "18px"}}>
      <Dropdown className='SubTaskDropDown' menu={menuProps} trigger={['click']}>
      <Button>
          {status}
          <DownOutlined />
      </Button>
    </Dropdown>
      </div>
      <div style={{width: "135px", height: "10px", background: "transparent"}}></div>
      </div>

    </div>
  );
};

export default TextComponent;
