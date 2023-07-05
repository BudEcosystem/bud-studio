/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { styled } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import { EnterOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { createNewTaskOnEnter, editColumnName } from 'redux/slices/kanban';
import Tasks from './taks';

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
  const [showNewTaskUI, setNewTaskUI] = useState(false);
  const [addButtonClickedFromColumn, SetAddButtonClickedFromColumn] =
    useState(false);
  
    const { workspace }: any = useSelector((state) => state);
    const workSpaceDocs = workspace.workSpaceDocs;

    console.log("WOrKSPACE RAHUL", workSpaceDocs)

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRefForColumnEdit =
    useRef() as React.MutableRefObject<HTMLInputElement>;

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
  const TitleHeaderDragable = styled.div``;
  const TitleHeaderThreedot = styled.div`
    margin-left: 13px;
    margin-right: 13px;
  `;

  const TitleHeaderColoured = styled.div`
    width: 12px;
    height: 12px;
    background: ${props.color};
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
    cursor: pointer;
    // margin-left: 107px;
  `;
  const TitleHeaderPlusIcon = styled.div``;

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
  const ColumnMenuWrapper = styled.div`
    width: 100px;
    background: #101010;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding-top: 5px;
    padding-bottom: 5px;
  `;
  const ColumnMenuItems = styled.div`
    height: 25px;
    width: 100px;
    // background: #2c2b30;
    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    text-align: left;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `;
  const ColumnMenuLabel = styled.span`
    width: 70px;
    margin-left: 5px;
  `;
  const EditColumnWrapper = styled.div`
    width: auto;
    height: 22px;
    // background: red;
    margin-top: 15px;
    border: 0.5px dashed #2f2f2f;
    padding-right: 5px;
    margin-left: 5px;
  `;
  const EditColumnNameInput = styled.input`
    // margin-top: -25px;
    width: 90px;
    height: 20px;
    background: #101010;
    border-radius: 2px;
    text-align: left;
    color: #bbbbbb;
    outline: none;
    border: none;
    margin-left: 15px;
    // padding-left: 10px;
    // border-top: 0.5px dashed #2f2f2f;
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

  useEffect(() => {
    const input = document.getElementById(`newtaskinput${props.id}`);
    const inputNameEdit = document.getElementById(`columnNameEdit-${props.id}`);
    input?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (inputRef.current?.value) {
          // CODE FOR ADDING TASKS GOES HERE
        }
      }
    });
    inputNameEdit?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (inputRefForColumnEdit.current?.value) {
         
        }
      }
    });
  });
  const addTaskButtonClicked = (flag: any) => {
    SetAddButtonClickedFromColumn(flag);
  };
  const [nameEditable, setNameEditable] = useState(false);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setNameEditable(true);
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setNameEditable(false);
    setOpen(newOpen);
  };
  const columnMenu = () => {
    return (
      <ColumnMenuWrapper>
        <ColumnMenuItems onClick={hide}>
          <ColumnMenuLabel>Edit</ColumnMenuLabel> <EditFilled rev={undefined} />
        </ColumnMenuItems>
        <ColumnMenuItems style={{ cursor: 'not-allowed', color: 'grey' }}>
          <ColumnMenuLabel>Delete</ColumnMenuLabel>
          <DeleteFilled rev={undefined} />
        </ColumnMenuItems>
      </ColumnMenuWrapper>
    );
  };
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided: any) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleHeader>
            <TitleHeaderFirst>
              <TitleHeaderDragable {...provided.dragHandleProps}>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                    transform="rotate(-90 1.5 1.5)"
                    fill="#242424"
                  />
                  <circle
                    cx="7.5"
                    cy="1.5"
                    r="1.5"
                    transform="rotate(-90 7.5 1.5)"
                    fill="#242424"
                  />
                  <circle
                    cx="1.5"
                    cy="7.5"
                    r="1.5"
                    transform="rotate(-90 1.5 7.5)"
                    fill="#242424"
                  />
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="1.5"
                    transform="rotate(-90 7.5 7.5)"
                    fill="#242424"
                  />
                </svg>
              </TitleHeaderDragable>
              <TitleHeaderColoured />
              {nameEditable ? (
                <EditColumnWrapper>
                  <EditColumnNameInput
                    id={`columnNameEdit-${props.id}`}
                    ref={inputRefForColumnEdit}
                  />
                  <EnterOutlined rev={undefined} />
                </EditColumnWrapper>
              ) : (
                <Title>{props.title}</Title>
              )}
            </TitleHeaderFirst>
            <TitleHeaderSecond>
              <TitleHeaderPlusIconWrapper
                onClick={() => addTaskButtonClicked(!addButtonClickedFromColumn)}
              >
                <TitleHeaderPlusIcon>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.35547 1.09678V9.61291"
                      stroke="#7B8388"
                      strokeWidth="1.41935"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.61328 5.35484L1.09715 5.35484"
                      stroke="#7B8388"
                      strokeWidth="1.41935"
                      strokeLinecap="round"
                    />
                  </svg>
                </TitleHeaderPlusIcon>
              </TitleHeaderPlusIconWrapper>
              <Popover
                content={columnMenu}
                trigger="click"
                placement="bottom"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <>
                  {' '}
                  <TitleHeaderThreedot>
                    <svg
                      width="4"
                      height="15"
                      viewBox="0 0 4 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="2.19976"
                        cy="13.6"
                        r="1.39996"
                        transform="rotate(-90 2.19976 13.6)"
                        fill="#7B8388"
                      />
                      <circle
                        cx="2.19976"
                        cy="7.80012"
                        r="1.39996"
                        transform="rotate(-90 2.19976 7.80012)"
                        fill="#7B8388"
                      />
                      <circle
                        cx="2.19976"
                        cy="2.00019"
                        r="1.39996"
                        transform="rotate(-90 2.19976 2.00019)"
                        fill="#7B8388"
                      />
                    </svg>
                  </TitleHeaderThreedot>
                </>
              </Popover>
            </TitleHeaderSecond>
          </TitleHeader>
          {(showNewTaskUI || addButtonClickedFromColumn) && (
            <AddNewTaskWrapper>
              <AddNewTaskColoredBorderLeft />
              <AddNewTaskinput
                placeholder="Enter new task"
                ref={inputRef}
                id={`newtaskinput${props.id}`}
              />
            </AddNewTaskWrapper>
          )}
          <Droppable droppableId={props.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                 {/* {Object.entries(props.tasks).map(([key, value], index) => {
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
                })} */}
                {props.entries.map((entry: any, index:any) => {
                  workSpaceDocs.map((doc: any, index: any) => {
                    if(doc.uuid == entry.documentID) {
                      console.log("SUCCESS MAPP")
                      const mappedTask: Task = {
                        index,
                        id: `${entry.documentId}`,
                        content: `${doc.name}`,
                        heading: `${doc.name}`,
                        progress: '',
                        user: '',
                        description: "Make hay",
                        footer: '',
                        image: '',
                        type: ''
                      }
                      return <Tasks key={mappedTask.id} task={mappedTask} />
                    }
                  })
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
