import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowIcon } from '../TaskViewIcons';
import '../TaskView.css';
import HeaderSubCompInput from 'components/ListView/ListViewComponents/HeaderSubCompInput';
import InputComponent from './InputComponent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextComponent from './TextComponent';
import { updateAppData } from 'redux/slices/workspace';
import {
  generateInitialListState,
  updateWholeListState,
} from 'redux/slices/list';

const ToDoPanel = ({ uiDetails }) => {
  const dispatch = useDispatch();
  const { workspace, list }: any = useSelector((state) => state);
  const { color } = workspace;
  const { taskViewData, statusAndIndex, panelArray } = list;
  const foundElement = panelArray.find(
    (item) => item.status === statusAndIndex.status
  );
  const [childData, setChildData] = useState([]);

  // useEffect(() => {
  //   const { editorApplicationsAdded } = workspace;
  //   const currentApplicationId = 'e0b48f05-91fb-4503-a9fd-ed20f166dbde';
  //   const applicationsDataFiltered = editorApplicationsAdded?.find(
  //     (appData: any) => appData.applicatioId === currentApplicationId
  //   );
  //   console.log(applicationsDataFiltered, "Asdfads")
  //   const ListEmptyData = generateInitialListState();
  //   if (applicationsDataFiltered) {
  //     const { appData, titleForDoc } = applicationsDataFiltered;
  //     // setTitle(titleForDoc);
  //     if (appData) {
  //       dispatch(updateWholeListState(appData));
  //     } else {
  //       dispatch(updateWholeListState(ListEmptyData));
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const currentApplicationId = 'e0b48f05-91fb-4503-a9fd-ed20f166dbde';
    dispatch(updateAppData({ appID: currentApplicationId, appData: list }));
  }, [list, foundElement]);
  console.log(
    childData,
    statusAndIndex,
    foundElement.items[statusAndIndex.index].childs,
    panelArray,
    'lko'
  );
  useEffect(() => {
    if (foundElement) {
      setChildData(foundElement.items[statusAndIndex.index].childs);
    }
  }, [foundElement, statusAndIndex, childData]);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newRowOrder = Array.from(childData);
    const [removed] = newRowOrder.splice(result.source.index, 1);
    newRowOrder.splice(result.destination.index, 0, removed);
    setChildData(newRowOrder);
  };
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ marginTop: '8px' }}
            >
              {childData.map((item, i) => (
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
                        text={item.title}
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
