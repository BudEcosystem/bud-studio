import React, { useEffect, useState } from 'react';
import {
  FourDots,
} from '../../ListView/ListViewIcons';
import '../TaskView.css';
import { useDispatch } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Arrow } from '../TaskViewIcons';
import {changeStatus} from '@/redux/slices/workspace';

const TextComponent = ({
  id,
  provided,
  snapshot,
  text,
  dataId,
  statusPanels,
}: any) => {
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const [statusObj, setStatusObj] = useState(statusPanels);

  const items: MenuProps['items'] = [];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    items.forEach((item) => {
      if (item?.key == e.key) {
        var label = item.label;
        setStatus(label);
        dispatch(changeStatus({ id, label }));
      }
    });
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  statusObj?.forEach((status: any, i: any) => {
    const obj = { key: `${i}`, label: `${status.headerText}` };
    items.push(obj);
  });

  useEffect(() => {
    dataId?.forEach((doc: any) => {
      if (id == doc.uuid) {
        const temp = doc.properties[2].value;
        const formattedStatus = temp
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (match: string) => match.toUpperCase());
        setStatus(formattedStatus);
      }
    });
  }, [dataId]);

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
        </div>
        <div className="textTodo">{text}</div>
      </div>

      <div style={{ display: 'flex' }}>
        <div className='SubtaskDrop' style={{ width: '100px', height: '24px' }}>
          <Dropdown
            className="SubTaskDropDown"
            menu={menuProps}
            trigger={['click']}
          >
            <Button>
              {status}
              <DownOutlined rev={undefined} />
            </Button>
          </Dropdown>
        </div>
        <div
          style={{ width: '135px', height: '10px', background: 'transparent' }}
        ></div>
      </div>
    </div>
  );
};

export default TextComponent;
