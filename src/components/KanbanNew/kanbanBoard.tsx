/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumnPosition } from 'redux/slices/kanban';
import initialData from './data/initial-data';
import Column from './components/column';

function Kanban() {
  const dispatch = useDispatch();
  // useEffect(() => {
  // setStateData(initialData);
  // }, []);
  const reduxState: any = useSelector((state) => state);
  console.log('reduxState', reduxState);
  const { kanban } = reduxState;
  const { tasks, columns, columnOrder } = kanban;
  const onDragEnd = (result: any) => {
    dispatch(updateColumnPosition(result));
  };
  const Container = styled.div`
    display: flex;
    flex-direction: row;
  `;
  const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
  return (
    <ContainerWrapper>
      <ContainerTopBar />
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
              {columnOrder.map((columnId, index) => {
                const column = columns[`${columnId}`];
                const taskFiltered = column.taskIds.map(
                  (taskId: string) => tasks[`${taskId}`]
                );
                return (
                  <Column
                    key={columnId}
                    title={column.title}
                    tasks={taskFiltered}
                    id={columnId}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </ContainerWrapper>
  );
}

export default Kanban;
