import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowIcon } from '../TaskViewIcons';
import '../TaskView.css';
import HeaderSubCompInput from 'components/ListView/ListViewComponents/HeaderSubCompInput';
import InputComponent from './InputComponent';
import TextComponent from './TextComponent';

const ToDoPanel = () => {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  return (
    <div className="KanbanPanel__todo">
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: '16px' }}>To Do</div>
        <div
          style={{
            marginLeft: '10px',
            color: `${color}`,
            border: `1px solid ${color}`,
          }}
          className="AddIcon"
        >
          <div style={{ fontSize: '12px' }}>Add</div>
          <div
            style={{
              marginLeft: '5px',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <ArrowIcon themeColor={color} />
          </div>
        </div>
      </div>
      <div className="subtaskText">1 Subtask</div>
      <div style={{ marginTop: '8px' }}>
        <TextComponent text="Filter important mails" />
        <InputComponent />
      </div>
      <div className="subtaskText">2 Checklists +</div>
      <div style={{ marginTop: '8px' }}>
        <TextComponent text="Create group mails" />
        <TextComponent text="Add Checklist" />
      </div>
    </div>
  );
};

export default ToDoPanel;
