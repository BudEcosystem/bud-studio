import React from 'react';
import '../ListView.css';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { DownArrow, FourDots } from '../ListViewIcons';
import HeaderSubComp from './HeaderSubComp';
import { useEffect } from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const { Panel } = Collapse;

const text = `
Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.
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
    <div className="flexVerticalCenter">
      <FourDots />
      <div
        style={{
          transform: !isActive ? 'rotate(-90deg)' : '',
          transition: 'all 0.2s ease',
          marginLeft: '11px',
        }}
      >
        <DownArrow />
      </div>
      <div className="textIcon2"></div>
    </div>
  );
  const expandIcon1 = ({ isActive }) => (
    <div className="flexVerticalCenter">
      <div
        style={{
          transform: !isActive ? 'rotate(-90deg)' : '',
          transition: 'all 0.2s ease',
          marginLeft: '11px',
        }}
      >
        <DownArrow />
      </div>
      <div className="textIcon2"></div>
    </div>
  );

  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.draggableContainer');

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        draggable.style.transform = '';
      });
    });

    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll('.draggable:not(.dragging)'),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPosition, setDraggingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        setDraggingPosition({
          x: event.clientX - draggingPosition.x,
          y: event.clientY - draggingPosition.y,
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggingPosition]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDraggingPosition({
      x: event.clientX - event.currentTarget.offsetLeft,
      y: event.clientY - event.currentTarget.offsetTop,
    });
  };

  const getPosition = () => {
    return {
      left: `${draggingPosition.x}px`,
      top: `${draggingPosition.y}px`,
      position: 'absolute',
      zIndex: 9999,
    };
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={expandIcon}
      style={{ background: '#101010' }}
      className="panelHeader draggableContainer"
    > 
      <Panel
        header={<HeaderSubComp name={1} />}
        key="1"
        style={panelStyle}
        className="draggable"
        draggable={true}
      >
        <div className="innerCollapseContainer">
          <p className="panelText">{text}</p>
          <div className="mgtop">
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={expandIcon1}
              style={{ background: '#101010', marginLeft: '25px' }}
              className="innerCollapse"
            >
              <Panel
                header={<HeaderSubComp name={6} />}
                key="2"
                style={panelStyle}
                onMouseDown={handleMouseDown}
              >
                {/* <p>{text}</p> */}
              </Panel>
            </Collapse>
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={expandIcon1}
              style={{ background: '#101010', marginLeft: '25px' }}
              className="innerCollapse"
            >
              <Panel
                header={<HeaderSubComp name={9} />}
                key="2"
                style={panelStyle}
              >
                {/* <p>{text}</p> */}
              </Panel>
            </Collapse>
          </div>
        </div>
      </Panel>
      <Panel
        header={<HeaderSubComp name={2} />}
        key="2"
        style={panelStyle}
        className="draggable"
        draggable={true}
      >
        {/* <p>{text}</p> */}
      </Panel>
      <Panel
        header={<HeaderSubComp name={3} />}
        key="3"
        style={panelStyle}
        className="draggable"
        draggable={true}
      >
        {/* <p>{text}</p> */}
      </Panel>
    </Collapse>
  );
};

export default ChildMainListComponent;
