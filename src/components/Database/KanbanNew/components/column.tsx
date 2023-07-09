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
import { addNewWorkSpaceDocument } from '@/redux/slices/workspace';
import { v4 as uuidv4 } from 'uuid';
import {
  addNewDocumentEntry,
  editPropertPresetsStatusOptions,
} from '@/redux/slices/database';
import {
  ColumnMenuItems,
  ColumnMenuLabel,
  ColumnMenuWrapper,
  Container,
  EditColumnNameInput,
  EditColumnWrapper,
  TitleHeader,
  TitleHeaderColoured,
  TitleHeaderDragable,
  TitleHeaderFirst,
  Title,
  TitleHeaderSecond,
  TitleHeaderPlusIconWrapper,
  TitleHeaderPlusIcon,
  TitleHeaderThreedot,
  AddNewTaskWrapper,
  AddNewTaskColoredBorderLeft,
  AddNewTaskinput,
  TaskList,
} from '../styled-components';
import Tasks from './tasks';

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
  const dispatch = useDispatch();
  const [showNewTaskUI, setNewTaskUI] = useState(false);
  const [addButtonClickedFromColumn, SetAddButtonClickedFromColumn] =
    useState(false);
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
  const { workspace }: any = useSelector((state) => state);
  console.log('workspace', workspace);
  const { workSpaceDocs, currentWorkspace } = workspace;

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRefForColumnEdit =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const addTaskButtonClicked = (flag: any) => {
    SetAddButtonClickedFromColumn(flag);
  };
  useEffect(() => {
    const input = document.getElementById(`newtaskinput${props.id}`);
    const inputNameEdit = document.getElementById(`columnNameEdit-${props.id}`);
    input?.focus();
    inputNameEdit?.focus();
    input?.addEventListener('keypress', function (event) {
      alert(event.key);
      if (event.key === 'Enter') {
        event.preventDefault();
        if (inputRef.current?.value && inputRef.current?.value !== '') {
          const docIdGenerated = uuidv4();
          dispatch(
            addNewWorkSpaceDocument({
              docId: docIdGenerated,
              statusKey: props?.currentKey,
              workspaceId: currentWorkspace,
              docName: inputRef.current?.value,
            })
          );
          dispatch(
            addNewDocumentEntry({
              docId: docIdGenerated,
              statusKey: props?.currentKey,
              dbId: props?.dbId,
            })
          );
          inputRef.current.value = '';
          addTaskButtonClicked(false);
        }
      }
    });
    inputNameEdit?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (inputRefForColumnEdit.current?.value) {
          dispatch(
            editPropertPresetsStatusOptions({
              id: props?.databaseData?.id,
              statusKey: props?.currentKey,
              name: inputRefForColumnEdit.current?.value,
            })
          );
          setNameEditable(false);
          setOpen(false);
          inputRefForColumnEdit.current.value = '';
        }
      }
    });
  });

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
  const [TaskArrayForRender, SetTaskArrayForRender] = useState([]);
  useEffect(() => {
    const TaskArray: any = [];
    props?.entries?.forEach((entry: any, index: any) => {
      workSpaceDocs?.forEach((doc: any, index: any) => {
        const statusOrder = doc.properties?.find(
          (data: any) => data.type === 'status'
        );
        if (
          doc.uuid === entry.documentID &&
          props.currentKey === statusOrder.value
        ) {
          const docId = entry.documentID;
          const mappedTask: Task = {
            index,
            id: docId,
            content: `${doc?.name}`,
            heading: `${doc?.name}`,
            progress: '',
            user: '',
            description: 'Make hay',
            footer: '',
            image: '',
            type: '',
          };
          TaskArray.push(mappedTask);
        }
      });
    });
    SetTaskArrayForRender(TaskArray);
  }, [props, workSpaceDocs, workspace]);
  return (
    <Draggable draggableId={props.currentKey} index={props.index}>
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
              <TitleHeaderColoured color={props.color} />
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
                onClick={() =>
                  addTaskButtonClicked(!addButtonClickedFromColumn)
                }
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
                {TaskArrayForRender?.map((mappedTask: any) => {
                  console.log('mappedTask', mappedTask);
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
