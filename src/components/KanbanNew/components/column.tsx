/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { styled } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Tasks from './taks';

const Container = styled.div`
  margin: 10px;
  border-radius: 5px;
  border: 0.5px dashed #2f2f2f;
  background: #101010;
  width: 238px;
  height: auto;
`;
const TitleHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  justify-content: space-between;
`;
const TitleHeaderFirst = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TitleHeaderSecond = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TitleHeaderDragable = styled.img``;
const TitleHeaderThreedot = styled.img`
  margin-left: 13px;
  margin-right: 13px;
`;

const TitleHeaderColoured = styled.div`
  width: 12px;
  height: 12px;
  background: #939aff;
  border-radius: 4px;
  margin-left: 7px;
`;
const Title = styled.h3`
  padding: 10px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 154.5%;
  /* identical to box height, or 22px */
  color: #ffffff;
`;
const TitleHeaderPlusIconWrapper = styled.div`
  width: 22px;
  height: 22px;
  background: #151517;
  border-radius: 5.67742px;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-left: 107px;
`;
const TitleHeaderPlusIcon = styled.img``;

const TaskList = styled.div`
  padding: 10px;
`;
// TaskColumnPlusIcon
interface Task {
  index: any;
  id: any;
  content: any;
  heading: any;
  progress: any;
  user: any;
  description: any;
  footer: any;
  image: any;
  type: any;
}
function Column(props: any) {
  //   console.log(props);
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleHeader>
            <TitleHeaderFirst>
              <TitleHeaderDragable
                {...provided.dragHandleProps}
                src="/images/other/DragIconKanban.svg"
                alt="#"
              />
              <TitleHeaderColoured />
              <Title>{props.title}</Title>
            </TitleHeaderFirst>
            <TitleHeaderSecond>
              <TitleHeaderPlusIconWrapper>
                <TitleHeaderPlusIcon
                  src="/images/other/TaskColumnPlusIcon.svg"
                  alt="#"
                />
              </TitleHeaderPlusIconWrapper>
              <TitleHeaderThreedot
                src="/images/other/TaskMenuIcon.svg"
                alt="#"
              />
            </TitleHeaderSecond>
          </TitleHeader>
          <Droppable droppableId={props.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {Object.entries(props.tasks).map(([key, value], index) => {
                  const taskvalue = value as Task;
                  const mappedTask: Task = {
                    index,
                    id: `${taskvalue.id}`,
                    content: `${taskvalue.content}`,
                    heading: taskvalue.heading,
                    progress: taskvalue.progress,
                    user: taskvalue.user,
                    description: taskvalue.description,
                    footer: taskvalue.footer,
                    image: taskvalue.image,
                    type: taskvalue.type,
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
