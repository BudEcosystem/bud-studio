import React, { useEffect, useState } from 'react';
import { FourDots } from '../../ListView/ListViewIcons';
import '../../TaskView/TaskView.css';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Arrow } from '../TaskViewIcons';
import { changeStatus } from '@/redux/slices/workspace';
import TaskViewKanban from '../TaskViewKanban';

const TextComponent = ({
  id,
  provided,
  snapshot,
  text,
  dataId,
  data,
  completeData,
  statusPanels,
  databaseEntries,
  dbHeader,
  level,
  statusColor
}: any) => {
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const [statusObj, setStatusObj] = useState(statusPanels);
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;

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

  const statusText = data.properties[2].value.replace(/_/g, ' ').replace(/\b\w/g, (match: string) => match.toUpperCase());

  // var statusColor = "";

  // database.databases.map((db: any) => {
  //   if(db.id ==  completeData.databaseId) {
  //     db.propertyPresets.status.options.map((op: any) => {
  //       if(op.title == statusText) {
  //         statusColor = op.color
  //       }
  //     })
  //   }
  // })

  const [dataTaskView, setDataTaskView] = useState();

  useEffect(() => {
    setDataTaskView({
      ...data,
      Name: data.name,
      id: data.uuid,
      dbHeader: dbHeader,
      description: '',
      Priority: data.properties[1].value,
      status: statusText,
      color: statusColor,
      heading: data.name,
      statusPanels: statusPanels,
      databaseEntries: databaseEntries,
      content: data.name,
    });
  }, [data]);

  const [insideTaskView, setInsideTaskView] = useState(false);

  const insideClickHandler = () => {
    setInsideTaskView(true);
  };

  return (
    <>
      {insideTaskView && (
        <TaskViewKanban
          data={dataTaskView}
          showKanbanTaskView={insideTaskView}
          setShowKanbanTaskView={setInsideTaskView}
          statusPanels={statusPanels}
          databaseEntries={databaseEntries}
          level={level + 1}
        />
      )}
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

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              marginRight: '10px',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              color: 'white',
              background: `${color}`,
              height: '20px',
              width: '50px',
              borderRadius: '5px',
            }}
            onClick={insideClickHandler}
          >
            View
          </div>
          <div
            className="SubtaskDrop"
            style={{ width: '100px', height: '24px' }}
          >
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
            style={{
              width: '135px',
              height: '10px',
              background: 'transparent',
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TextComponent;
