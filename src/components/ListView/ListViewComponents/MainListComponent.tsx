import React, { useState } from 'react';
import '../ListView.css';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { Arrow } from '../ListViewIcons';
import ChildMainListComponent from './ChildMainListComponent';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { addPanelItems } from 'redux/slices/list';

const { Panel } = Collapse;

function MainListComponent() {
  const [activePanel, setActivePanel] = useState(['0']);
  const panelArray = useSelector((state) => state.list.panelArray);
  const { workspace }: any = useSelector((state) => state);
  let { color } = workspace;
  // const panelStyle = {
  //   marginBottom: 18,
  //   background: '#101010',
  //   border: `0.5px dashed #2F2F2F`,
  //   borderRadius: '12px',
  //   color: 'white',
  // };
  const getPanelStyle = (index) => {
    if (activePanel === index) {
      return {
        marginBottom: 18,
        background: '#101010',
        border: `0.5px dashed ${color}`,
        borderRadius: '12px',
        color: 'white',
      };
    } else {
      return {
        marginBottom: 18,
        background: '#101010',
        border: `0.5px dashed #2F2F2F`,
        borderRadius: '12px',
        color: 'white',
      };
    }
  };
  const handlePanelChange = (panelIndex) => {
    const selectedPanel = activePanel === panelIndex ? activePanel : panelIndex;
    setActivePanel(selectedPanel);
    // const updatedActivePanel = [...activePanel];
    // updatedActivePanel[panelIndex] = !updatedActivePanel[panelIndex];
    // setActivePanel(updatedActivePanel);
  };
  const panelHeader = (text, col, index) => (
    <div
      className="flexVerticalCenter"
      style={{ justifyContent: 'space-between' }}
    >
      <div className="flexVerticalCenter">
        <div className="textIcon" style={{ background: col }} />
        <span style={{ marginLeft: '8px' }}>{text}</span>
      </div>
      {/* {activePanel[index] && (
        <div style={{ marginRight: '14px' }}>
          <p>New Task +</p>
        </div>
      )} */}
    </div>
  );
  return (
    <div className="mainListContainer">
      <Collapse
        bordered={false}
        defaultActiveKey={activePanel}
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
        style={{ background: 'var(--bud-container-background)' }}
        // onChange={handlePanelChange}
        // onChange={(expandedPanels) => setActivePanel(expandedPanels)}
      >
        {panelArray?.map((item, i) => (
          <Panel
            header={panelHeader(item.headerText, item.colorIcon, i)}
            key={i}
            style={getPanelStyle(i)}
            onClick={() => handlePanelChange(i)}
            className="insideCollapse"
          >
            <div className="hello">
              <ChildMainListComponent
                childItems={item.items}
                activepanel={activePanel}
              />
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default MainListComponent;
