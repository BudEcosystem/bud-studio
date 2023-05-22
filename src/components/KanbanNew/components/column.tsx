/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { styled } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tasks from './taks';
import { createNewTaskOnEnter } from 'redux/slices/kanban';

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
const AddNewTaskWrapper = styled.div`
  width: 214px;
  height: 44px;
  background: #141414;
  border: 0.5px dashed #2f2f2f;
  border-radius: 8px;
  margin: 0px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const AddNewTaskColoredBorderLeft = styled.div`
  width: 0px;
  height: 17.64px;
  border: 1.25336px solid #f9d45d;
  border-radius: 0.313339px;
  margin-left: 14px;
`;
const AddNewTaskinput = styled.input`
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
  const [showNewTaskUI, setNewTaskUI] = useState(false);
  const { kanban } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.index === 0) {
      const { triggerTaskCreation } = kanban;
      setNewTaskUI(triggerTaskCreation);
    }
  }, [props.index, kanban]);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const input = document.getElementById('newtaskinput');
    input?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Enter clikcked', inputRef.current?.value);
        if (inputRef.current?.value) {
          console.log('Enter clikcked', inputRef.current?.value);
          dispatch(
            createNewTaskOnEnter({ task: inputRef.current?.value, props })
          );
        }
      }
    });
  });
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
          {showNewTaskUI && (
            <AddNewTaskWrapper>
              <AddNewTaskColoredBorderLeft />
              <AddNewTaskinput ref={inputRef} id="newtaskinput" />
            </AddNewTaskWrapper>
          )}
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
