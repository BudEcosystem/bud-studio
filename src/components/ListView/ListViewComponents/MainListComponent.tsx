import React, { useState } from 'react';
import '../ListView.css';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { Arrow } from '../ListViewIcons';
import ChildMainListComponent from './ChildMainListComponent';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const panelArr = [
  {
    headerText: 'To-do',
    colorIcon: '#939AFF',
  },
  {
    headerText: 'In-progress',
    colorIcon: '#FFD976',
  },
  {
    headerText: 'In-review',
    colorIcon: '#4184E9',
  },
  {
    headerText: 'Completed',
    colorIcon: '#36D95A',
  },
];

const MainListComponent = () => {
  const [activePanel, setActivePanel] = useState([true, false, false, false]);
  const panelStyle = {
    marginBottom: 18,
    background: '#101010',
    border: ' 0.5px dashed #2F2F2F',
    borderRadius: '12px',
    color: 'white',
  };
  const handlePanelChange = (index) => {
    const newActivePanel = [...activePanel];
    console.log(index)
    newActivePanel[index] = !newActivePanel[index];
    setActivePanel(newActivePanel);
  };
  const panelHeader = (text, col, index) => (
    <div className="flexVerticalCenter" style={{justifyContent: "space-between"}}>
      <div className="flexVerticalCenter">
        <div className="textIcon" style={{ background: col }}></div>
        <span style={{ marginLeft: '8px' }}>{text}</span>
      </div>
      {activePanel[index] && (
        <div style={{marginRight:"14px"}}>
          <p>New Task +</p>
        </div>
      )}
    </div>
  );
  return (
    <div className="mainListContainer">
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        expandIcon={({ isActive }) => (
          <div
            style={{
              transform: !isActive ? 'rotate(-90deg)' : '',
              transition: 'all 0.2s ease',
            }}
          >
            <Arrow />
          </div>
        )}
        className="customCollapse"
        style={{ background: 'var(--primary-bgc-light' }}
        // onChange={handlePanelChange}
      >
        {panelArr.map((item, i) => (
          <Panel
            header={panelHeader(item.headerText, item.colorIcon, i)}
            key={i}
            style={panelStyle}
            onClick={e => handlePanelChange(i)}
            className='insideCollapse'
          >
            <div className='hello'>
                <ChildMainListComponent />
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default MainListComponent;
