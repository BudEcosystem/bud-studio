import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckListRow } from '@/redux/slices/workspace';
import { ArrowIcon } from '../TaskViewIcons';
import '../../TaskView/TaskView.css';
import HeaderSubCompInput from 'components/ListView/ListViewComponents/HeaderSubCompInput';
import InputComponent from './InputComponent';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextComponent from './TextComponent';
import {
  changeRowOrderTodos,
  changeRowOrderTodosKanban,
} from '@/redux/slices/database';
import CheckList from './CheckList';
import CheckListInput from './CheckListInput';

function ToDoPanel({
  dataId,
  data,
  statusPanels,
  subChild,
  databaseEntries,
  dbHeader,
  level,
}: any) {
  const dispatch = useDispatch();
  const { workspace, database }: any = useSelector((state) => state);
  const { color } = workspace;
  const checkListInput = data.checkList;
  const [showCheckListInput, setShowCheckListInput] = useState(false);

  const [checkList, setCheckList] = useState();
  useEffect(() => {
    workspace.workSpaceDocs.forEach((it: any, i: any) => {
      if (it.uuid === data.uuid) {
        setCheckList(it.checkList);
      }
    });
  }, [data, workspace, data.checkList]);

  const handleDragEndKanban = (result: any) => {
    dispatch(changeRowOrderTodosKanban({ id: data.uuid, result }));
  };
  const handleDragEndForChecklist = (result: any) => {
    dispatch(setCheckListRow({ result, parentId: data.uuid }));
  };

  const findStatusColor = (statusText: any, data: any) => {
    var stCol = "";
    statusPanels.map((st: any) => {
      if(st.status == statusText) {
        stCol = st.colorIcon
      }
    })
    return stCol
  }

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
      <DragDropContext onDragEnd={handleDragEndKanban}>
        <Droppable droppableId="todo">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ marginTop: '8px' }}
            >
              {dataId?.map((item: any, i: any) => {
                var statusText = dataId[i].properties[2].value.replace(/_/g, ' ').replace(/\b\w/g, (match: string) => match.toUpperCase());
                const statusColor = findStatusColor(statusText, data);
                return (
                  <Draggable
                  key={`todo-${i}`}
                  draggableId={`todo-${i}`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <TextComponent
                        id={item.uuid}
                        removeBox
                        provided={provided}
                        snapshot={snapshot}
                        text={item.name}
                        dataId={dataId}
                        completeData={data}
                        data={dataId[i]}
                        statusPanels={statusPanels}
                        databaseEntries={databaseEntries}
                        dbHeader={dbHeader}
                        level={level}
                        statusColor={statusColor}
                      />
                    </div>
                  )}
                </Draggable>
                )
                })}
              {provided.placeholder}
              {level < 3 && <InputComponent data={data} />}
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
            {data.checkList?.length} Checklists +
          </div>
          <DragDropContext onDragEnd={handleDragEndForChecklist}>
            <Droppable droppableId="todo2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ marginTop: '8px' }}
                >
                  {checkList?.map((it: any, i: any) => (
                    <Draggable
                      key={`check-${i}`}
                      draggableId={`check-${i}`}
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
                            item={it}
                            parentId={data.uuid}
                            color={color}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {/* {data.entry.checkList?.map((item: any, i: any) => (
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
                  ))} */}
                  {/* {provided.placeholder} */}
                  {showCheckListInput && (
                    <CheckListInput
                      parentId={data.uuid}
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
}

export default ToDoPanel;
