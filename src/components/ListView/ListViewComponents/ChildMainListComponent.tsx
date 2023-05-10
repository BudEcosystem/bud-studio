import React from 'react';
import '../ListView.css';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { DownArrow, FourDots } from '../ListViewIcons';
import HeaderSubComp from './HeaderSubComp';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ChildMainListComponent = () => {
  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 6,
    background: '#1B1C1E',
    borderRadius: '8px',
    border: 'none',
  };

  const expandIcon = ({ isActive }) => (
    <div className='flexVerticalCenter'>
      <FourDots />
      <div style={{transform: !isActive ? "rotate(-90deg)" : "", transition: 'all 0.2s ease', marginLeft: "11px"}}>
        <DownArrow />
      </div>
      <div className="textIcon2"></div>
    </div>
  );

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={expandIcon}
      style={{ background: '#101010' }}
      className='panelHeader'
    >
      <Panel header={<HeaderSubComp />} key="1" style={panelStyle} >
        <p>{text}</p>
      </Panel>
      <Panel header={<HeaderSubComp />} key="2" style={panelStyle}>
        <p>{text}</p>
      </Panel>
      <Panel header={<HeaderSubComp />} key="3" style={panelStyle}>
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};

export default ChildMainListComponent;
