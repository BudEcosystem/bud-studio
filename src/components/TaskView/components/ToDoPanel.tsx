import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowIcon } from '../TaskViewIcons';
import '../TaskView.css';
import HeaderSubCompInput from 'components/ListView/ListViewComponents/HeaderSubCompInput';
import InputComponent from './InputComponent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextComponent from './TextComponent';

const ToDoPanel = ({dataId}: any) => {
  const { workspace, list }: any = useSelector((state) => state);
  const { color, workspacestodos } = workspace;
  const [childData, setChildData] = useState(dataId);
  const [TaskArrayForRender, SetTaskArrayForRender] = useState([]);
  const [workspaceDocs, setWorkspaceDocs] = useState(workspace.workSpaceDocs)
  console.log(workspace)

  useEffect(() => {
    const TaskArray: any = [];
    dataId?.forEach((entry: any, index: any) => {
      workspacestodos?.forEach((doc: any, index: any) => {
        if(entry.id == doc.uuid) {
          TaskArray.push(doc);
        }
      });
    }); 
    SetTaskArrayForRender(TaskArray);
  }, [dataId, workspaceDocs, workspacestodos]);

  console.log("ARUNS", dataId)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newRowOrder = Array.from(childData);
    const [removed] = newRowOrder.splice(result.source.index, 1);
    newRowOrder.splice(result.destination.index, 0, removed);
    setChildData(newRowOrder);
  };
  return (
    <div className="KanbanPanel__todo">
      <div style={{ display: 'flex' }}>
        <div style={{ color: "white", fontSize: '16px' }}>To Do</div>
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ marginTop: '8px' }}
            >
              {TaskArrayForRender?.map((item: any, i: any) => (
                <Draggable
                  key={`todo-${i}`}
                  draggableId={`todo-${i}`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <TextComponent
                        provided={provided}
                        snapshot={snapshot}
                        text={item.name}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <InputComponent />
            </div>
          )}
        </Droppable>

        <div className="subtaskText">2 Checklists +</div>
        <div style={{ marginTop: '8px' }}>
          <TextComponent text="Create group mails" />
          <TextComponent text="Add Checklist" />
        </div>
      </DragDropContext>
    </div>
  );
};

export default ToDoPanel;
