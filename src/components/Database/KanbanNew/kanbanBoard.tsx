/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import { createNewColumn, updateColumnPosition } from 'redux/slices/kanban';
import Column from './components/column';

function Kanban({databaseData}: any) {
  // useEffect(() => {
  // setStateData(initialData);
  // }, []);
  const onDragEnd = (result: any) => {
    // CODE HERE TO STORE COLUMN DRAG
  };
  const Container = styled.div`
    display: flex;
    flex-direction: row;
  `;
  const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  `;
  const ContainerTopBar = styled.div`
    width: 101.5%;
    height: 17px;
    border-width: 1px 2px 0px 1px;
    border-style: solid;
    border-color: #252525;
    filter: drop-shadow(0px -2px 5px rgba(0, 0, 0, 0.77));
    border-radius: 21px 21px 0px 0px;
    margin-top: 15px;
  `;

  const AddNewColumnSection = styled.div`
    margin-top: 15px;
    margin-left: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
  `;
  const AddNewColumnSectionColorPicker = styled.div`
    width: 15px;
    height: 15px;
    background: #171718;
    border-radius: 5.29412px;
  `;
  const AddNewColumnBorderLeft = styled.div`
    width: 0px;
    height: 17.64px;
    border: 1.25336px solid #f9d45d;
    border-radius: 0.313339px;
    margin-left: 14px;
  `;

  const AddNewColumnInput = styled.input`
    width: 105px;
    height: 21px;
    left: 331px;
    top: 327px;
    background: rgba(217, 217, 217, 0.05);
    border-radius: 2px;
    text-align: left;
    color: #bbbbbb;
    outline: none;
    border: none;
    margin-left: 5px;
    &::placeholder,
    &::-webkit-input-placeholder {
      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 154.5%;
      /* identical to box height, or 22px */
      text-align: left;
      color: #bbbbbb;
    }
    &:-ms-input-placeholder {
      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 154.5%;
      /* identical to box height, or 22px */
      color: #bbbbbb;
    }
  `;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const input = document.getElementById(`newColumninput`);
    input?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (inputRef.current?.value) {
          
        }
      }
    });
  });

  var columnOrder = ['Not Started', 'In Progress', 'In Review', 'Done'];

  console.log("DATABASE COLS", databaseData.entries)

  // const columns: { [key: string]: object } = {
  //   'column-1': {
  //     id: 'column-1',
  //     title: 'To-do',
  //     taskIds: ['task-1', 'task-2'],
  //     color: "red"
  //   },
  //   'column-2': {
  //     id: 'column-2',
  //     title: 'In-Progress',
  //     taskIds: [],
  //     color: "yellow"
  //   },
  //   'column-3': {
  //     id: 'column-3',
  //     title: 'Done',
  //     taskIds: [],
  //     color: "green"
  //   },
  //   'column-4': {
  //     id: 'column-4',
  //     title: 'Review',
  //     taskIds: [],
  //     color: "blue"
  //   },
  // };

  const tasks: { [key: string]: object } = {
    'task-1': { id: 'task-1', content: 'check for mails' },
    'task-2': { id: 'task-2', content: 'check for messages' },
  };

  return (
    <ContainerWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided: {
            droppableProps: JSX.IntrinsicAttributes;
            innerRef: any;
            placeholder: any;
          }) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder?.map((columnId, index) => {
                const column = databaseData.propertyPresets.status.options[index];
                // const taskFiltered = column.title.map(
                //   (taskId: string) => tasks[`${taskId}`]
                // );
                return (
                  <Column
                    key={columnId}
                    title={column.title}
                    entries={databaseData.entries}
                    id={columnId}
                    index={index}
                    color={column.color}
                  />
                );
              })}
              {provided.placeholder}
              <AddNewColumnSection>
                <AddNewColumnSectionColorPicker />
                <AddNewColumnBorderLeft />
                <AddNewColumnInput
                  ref={inputRef}
                  id="newColumninput"
                  placeholder="Add New"
                />
              </AddNewColumnSection>
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </ContainerWrapper>
  );
}

export default Kanban;
