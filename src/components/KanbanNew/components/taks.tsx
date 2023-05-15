import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const TaskContainer = styled.div`
  height: 30px;
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 10px;
  background: blue;
  color: white;
`;
const Tasks = (props: any) => {
    // console.log("Draggable",props)
  return (
    <Draggable draggableId={props.task.id} index={props.task.index}>
      {(provided) => {
        return (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {props?.task?.content}
          </TaskContainer>
        );
      }}
    </Draggable>
  );
};

export default Tasks;
