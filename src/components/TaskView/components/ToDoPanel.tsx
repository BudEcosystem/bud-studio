import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowIcon } from '../TaskViewIcons';
import '../TaskView.css';
import HeaderSubCompInput from 'components/ListView/ListViewComponents/HeaderSubCompInput';
import InputComponent from './InputComponent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextComponent from './TextComponent';
import { changeRowOrderTodos } from '@/redux/slices/database';
import CheckList from './CheckList';
import CheckListInput from './CheckListInput';

const ToDoPanel = ({ dataId, data, statusPanels, subChild }: any) => {
  const dispatch = useDispatch();
  const { workspace, list }: any = useSelector((state) => state);
  const { color, workspacestodos } = workspace;
  const [childData, setChildData] = useState(dataId);
  const checkListInput = data.entry.checkList;
  const [showCheckListInput, setShowCheckListInput] = useState(false);
  // const [TaskArrayForRender, SetTaskArrayForRender] = useState([]);
  // const [workspaceDocs, setWorkspaceDocs] = useState(workspace.workSpaceDocs);

  // useEffect(() => {
  //   const TaskArray: any = [];
  //   dataId?.forEach((entry: any, index: any) => {
  //     workspacestodos?.forEach((doc: any, index: any) => {
  //       if (entry.id == doc.uuid) {
  //         TaskArray.push(doc);
  //       }
  //     });
  //   });
  //   SetTaskArrayForRender(TaskArray);
  // }, [dataId, workspaceDocs, workspacestodos]);

  console.log('ARUNS', data);

  const [sortedArray, setSortedArray] = useState([]);

  const handleDragEnd = (result: any) => {
    dispatch(changeRowOrderTodos({ id: data.entry.uuid, result }));
    // if (!result.destination) return;
    // const newRowOrder = Array.from(childData);
    // const [removed] = newRowOrder.splice(result.source.index, 1);
    // newRowOrder.splice(result.destination.index, 0, removed);
    // setChildData(newRowOrder);
  };
  return (
    <div className="KanbanPanel__todo">
      <div style={{ display: 'flex' }}>
        <div style={{ color: 'white', fontSize: '16px' }}>To Do</div>
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
      <div className="subtaskText">{dataId.length} Subtask</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ marginTop: '8px' }}
            >
              {dataId?.map((item: any, i: any) => (
                <Draggable
                  key={`todo-${i}`}
                  draggableId={`todo-${i}`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <TextComponent
                        id={item.uuid}
                        removeBox={true}
                        provided={provided}
                        snapshot={snapshot}
                        text={item.name}
                        dataId={dataId}
                        statusPanels={statusPanels}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <InputComponent data={data} />
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {!subChild && (
        <>
          <div
            onClick={() => {
              setShowCheckListInput(!showCheckListInput);
            }}
            style={{ cursor: 'pointer' }}
            className="subtaskText"
          >
            {data.entry.checkList?.length} Checklists +
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ marginTop: '8px' }}
                >
                  {data.entry.checkList?.map((item: any, i: any) => (
                    <>
                      {!item.checked && (
                        <Draggable
                          key={`todo-${i}`}
                          draggableId={`todo-${i}`}
                          index={i}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <CheckList
                                provided={provided}
                                snapshot={snapshot}
                                item={item}
                                parentId={data.entry.uuid}
                              />
                            </div>
                          )}
                        </Draggable>
                      )}
                    </>
                  ))}
                  {provided.placeholder}
                  {data.entry.checkList?.map((item: any, i: any) => (
                    <>
                      {item.checked && (
                        <Draggable
                          key={`todo-${i}`}
                          draggableId={`todo-${i}`}
                          index={i}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <CheckList
                                provided={provided}
                                snapshot={snapshot}
                                item={item}
                                parentId={data.entry.uuid}
                              />
                            </div>
                          )}
                        </Draggable>
                      )}
                    </>
                  ))}
                  {provided.placeholder}
                  {showCheckListInput && (
                    <CheckListInput
                      parentId={data.entry.uuid}
                      setShowCheckListInput={setShowCheckListInput}
                    />
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
};

export default ToDoPanel;
