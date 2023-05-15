/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { styled } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Tasks from './taks';

const Container = styled.div`
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  min-width: 400px;
  background: grey;
`;
const Title = styled.h3`
  padding: 10px;
`;
const TaskList = styled.div`
  padding: 10px;
`;
interface Task {
  index: any;
  id: any;
  content: any;
}
function Column(props: any) {
  //   console.log(props);
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.title}</Title>
          <Droppable droppableId={props.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {Object.entries(props.tasks).map(([key, value], index) => {
                  const taskvalue = value as Task;
                  const mappedTask: Task = {
                    index,
                    id: `${taskvalue.id}`,
                    content: `${taskvalue.content}`,
                  };
                  return <Tasks key={mappedTask.id} task={mappedTask} />;
                })}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
export default Column;
