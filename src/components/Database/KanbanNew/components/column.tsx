/* eslint-disable no-eval */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { styled } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import { EnterOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { createNewTaskOnEnter, editColumnName } from 'redux/slices/kanban';
import {
  addNewWorkSpaceDocument,
  triggerDefaultNewTask,
} from '@/redux/slices/workspace';
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
  const [statusPanels, setStatusPanels] = useState(null);
  const hide = () => {
    setNameEditable(true);
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setNameEditable(false);
    setOpen(newOpen);
  };

  const { workspace }: any = useSelector((state) => state);
  console.log('triggerTaskCreation', workspace);
  console.log('triggerTaskCreation - props', props);
  const {
    workSpaceDocs,
    currentWorkspace,
    workspaceDocsSearchKey,
    triggerTaskCreation,
  } = workspace;

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRefForColumnEdit =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const addTaskButtonClicked = (flag: any) => {
    SetAddButtonClickedFromColumn(flag);
  };
  const onEscapeButtonPressed = (event: any) => {
    if (event.code === 'Escape') {
      addTaskButtonClicked(false);
      dispatch(triggerDefaultNewTask({ triggerFlag: false }));
    }
  };
  useEffect(() => {
    const input = document.getElementById(`newtaskinput${props.id}`);
    const inputNameEdit = document.getElementById(`columnNameEdit-${props.id}`);
    input?.focus();
    inputNameEdit?.focus();
    input?.addEventListener('keypress', function (event) {
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

  useLayoutEffect(() => {
    // Get Database entries
    const sortedContent = [];
    props.databaseData.entries.map((item: any) => {
      const document = workspace.workSpaceDocs.filter(
        (obj: any) => obj.uuid === item.documentID
      );
      sortedContent.push(document[0]);
    });

    const data: any[] = [];
    props.databaseData.propertyPresets.status.options.map((item: any) => {
      const entries = [];
      // Optimize The Code
      sortedContent.forEach((entry: any) => {
        entry.properties.forEach((property: any) => {
          if (property.title === 'Status') {
            if (property.value === item.key) {
              entries.push({
                title: entry.name,
                description: item.description,
                childs: [],
                entry,
              });
            }
          }
        });
      });

      data.push({
        status: item.title,
        headerText: item.title,
        colorIcon: item.color,
        items: entries,
      });
    });

    setStatusPanels(data);
  }, [props.databaseData]);

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
  const { filterRules } = props;
  const [filterConditionsGenerated, setFilterConditionsGenerated] =
    useState('');
  const [filterRulesWhereArray, setFilterRulesWhere] = useState([]);
  const [filterRulesOrArray, setFilterRulesOr] = useState([]);
  const [filterRulesAndArray, setFilterRulesAnd] = useState([]);

  useEffect(() => {
    if (filterRules.length > 0) {
      const filterRulesWhere = filterRules.filter(
        (data: any) => data.condition === null
      );
      setFilterRulesWhere(filterRulesWhere);
      const filterRulesAnd = filterRules.filter(
        (data: any) => data.condition === 'and'
      );
      setFilterRulesAnd(filterRulesAnd);
      const filterRulesOr = filterRules.filter(
        (data: any) => data.condition === 'or'
      );
      setFilterRulesOr(filterRulesOr);
    } else if (filterRules.length === 0) {
      setFilterRulesAnd([]);
      setFilterRulesOr([]);
      setFilterRulesWhere([]);
    }
  }, [filterRules]);

  useEffect(() => {
    const TaskArray: any = [];
    const { sortRules } = props;
    props?.entries?.forEach((entry: any, index: any) => {
      workSpaceDocs?.forEach((doc: any, index: any) => {
        const statusOrder = doc.properties?.find(
          (data: any) => data.type === 'status'
        );
        const name = doc.name.toLowerCase();
        const condition = workspaceDocsSearchKey
          ? doc.uuid === entry.documentID &&
            props.currentKey === statusOrder.value &&
            name.includes(workspaceDocsSearchKey)
          : doc.uuid === entry.documentID &&
            props.currentKey === statusOrder.value;

        if (condition) {
          const docId = entry.documentID;
          const mappedTask: Task = {
            index,
            id: docId,
            Name: doc.name,
            content: `${doc?.name}`,
            heading: `${doc?.name}`,
            progress: '',
            user: '',
            description: '',
            footer: '',
            image: '',
            type: '',
            Priority: doc.properties.find(
              (data: any) => data.type === 'priority'
            ).value,
            ...doc,
            ...entry,
            status: props.title,
            color: props.color,
            dbHeader: props.databaseData.title,
            Status: entry.statusKey,
            User: '',
            statusPanels,
            databaseEntries: props.entries,
            databaseId: props.databaseData.id,
          };
          TaskArray.push(mappedTask);
        }
      });
    });

    const filteredArray: any = [];
    TaskArray.forEach((data: any) => {
      const whereFlagArray: any = [];
      const AndFlagArray: any = [];
      const orFlagArray: any = [];
      filterRulesWhereArray.forEach((ruleData: any) => {
        const { op, key, query } = ruleData;
        if (query !== '' && query !== null) {
          switch (op) {
            case 'is':
              whereFlagArray.push(
                data[`${key}`]?.toLowerCase() === `${query.toLowerCase()}`
              );
              break;
            case 'is_not':
              whereFlagArray.push(
                data[`${key}`]?.toLowerCase() !== `${query.toLowerCase()}`
              );
              break;
            case 'contains':
              whereFlagArray.push(
                data[`${key}`]?.toLowerCase().includes(`${query.toLowerCase()}`)
              );
              break;
            case 'does_not_contains':
              whereFlagArray.push(
                !data[`${key}`]
                  ?.toLowerCase()
                  .includes(`${query.toLowerCase()}`)
              );
              break;
            case 'starts_with':
              whereFlagArray.push(
                data[`${key}`]
                  ?.toLowerCase()
                  .startsWith(`${query.toLowerCase()}`)
              );
              break;
            case 'ends_with':
              whereFlagArray.push(
                data[`${key}`]?.toLowerCase().endsWith(`${query.toLowerCase()}`)
              );
              break;
            case 'is_empty':
              whereFlagArray.push(
                data[`${key}`] === '' || data[`${key}`] === null
              );
              break;
            case 'is_not_empty':
              whereFlagArray.push(
                data[`${key}`] !== '' || data[`${key}`] !== null
              );
              break;
          }
        }
      });

      filterRulesAndArray.forEach((ruleData: any) => {
        const { op, key, query } = ruleData;
        if (query !== '' && query !== null) {
          switch (op) {
            case 'is':
              AndFlagArray.push(
                data[`${key}`].toLowerCase() === `${query.toLowerCase()}`
              );
              break;
            case 'is_not':
              AndFlagArray.push(
                data[`${key}`].toLowerCase() !== `${query.toLowerCase()}`
              );
              break;
            case 'contains':
              AndFlagArray.push(
                data[`${key}`].toLowerCase().includes(`${query.toLowerCase()}`)
              );
              break;
            case 'does_not_contains':
              AndFlagArray.push(
                !data[`${key}`].toLowerCase().includes(`${query.toLowerCase()}`)
              );
              break;
            case 'starts_with':
              AndFlagArray.push(
                data[`${key}`]
                  .toLowerCase()
                  .startsWith(`${query.toLowerCase()}`)
              );
              break;
            case 'ends_with':
              AndFlagArray.push(
                data[`${key}`].toLowerCase().endsWith(`${query.toLowerCase()}`)
              );
              break;
            case 'is_empty':
              AndFlagArray.push(
                data[`${key}`] === '' || data[`${key}`] === null
              );
              break;
            case 'is_not_empty':
              AndFlagArray.push(
                data[`${key}`] !== '' || data[`${key}`] !== null
              );
              break;
          }
        }
      });
      
      filterRulesOrArray.forEach((ruleData: any) => {
        const { op, key, query } = ruleData;
        if (query !== '' && query !== null) {
          switch (op) {
            case 'is':
              orFlagArray.push(
                data[`${key}`].toLowerCase() === `${query.toLowerCase()}`
              );
              break;
            case 'is_not':
              orFlagArray.push(
                data[`${key}`].toLowerCase() !== `${query.toLowerCase()}`
              );
              break;
            case 'contains':
              orFlagArray.push(
                data[`${key}`].toLowerCase().includes(`${query.toLowerCase()}`)
              );
              break;
            case 'does_not_contains':
              orFlagArray.push(
                !data[`${key}`].toLowerCase().includes(`${query.toLowerCase()}`)
              );
              break;
            case 'starts_with':
              orFlagArray.push(
                data[`${key}`]
                  .toLowerCase()
                  .startsWith(`${query.toLowerCase()}`)
              );
              break;
            case 'ends_with':
              orFlagArray.push(
                data[`${key}`].toLowerCase().endsWith(`${query.toLowerCase()}`)
              );
              break;
            case 'is_empty':
              orFlagArray.push(
                data[`${key}`] === '' || data[`${key}`] === null
              );
              break;
            case 'is_not_empty':
              orFlagArray.push(
                data[`${key}`] !== '' || data[`${key}`] !== null
              );
              break;
          }
        }
      });
      console.log('ttt whereFlagArray', whereFlagArray);
      console.log('ttt AndFlagArray', AndFlagArray);
      console.log('ttt orFlagArray', orFlagArray);
      const andWhereArray = [];
      const OrArray = [];
      if (whereFlagArray.length > 0) {
        andWhereArray.push(
          whereFlagArray.reduce(
            (accumulator: any, currentValue: any) => accumulator && currentValue
          )
        );
      }
      if (AndFlagArray.length > 0) {
        andWhereArray.push(
          AndFlagArray.reduce(
            (accumulator: any, currentValue: any) => accumulator && currentValue
          )
        );
      }
      if (orFlagArray.length > 0) {
        OrArray.push(
          orFlagArray.reduce(
            (accumulator: any, currentValue: any) => accumulator || currentValue
          )
        );
      }

      const finalArray = [];
      if (andWhereArray.length > 0) {
        finalArray.push(
          andWhereArray.reduce(
            (accumulator: any, currentValue: any) => accumulator && currentValue
          )
        );
      }
      if (OrArray.length > 0) {
        finalArray.push(
          OrArray.reduce(
            (accumulator: any, currentValue: any) => accumulator || currentValue
          )
        );
      }
      let finalFlag = true;
      if (finalArray.length > 0) {
        finalFlag = finalArray.reduce(
          (accumulator: any, currentValue: any) => accumulator || currentValue
        );
      }
      if (finalFlag) {
        filteredArray.push(data);
      }
    });
    if (sortRules.length > 0) {
      const priorityOrder: any = {
        High: 0,
        Medium: 1,
        Low: 3,
        Normal: 2,
      };
      const StatusOrder: any = {
        not_started: 0,
        in_progress: 1,
        in_review: 2,
        done: 3,
      };
      const { key, op } = sortRules[0];
      console.log('sortRules - sorted', key);
      if (key === 'Name') {
        if (op === 'ASC') {
          filteredArray.sort((a: any, b: any) => {
            const nameA = a.Name.toLowerCase();
            const nameB = b.Name.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
        }
        if (op === 'DSC') {
          filteredArray.sort((a: any, b: any) => {
            const nameA = a.Name.toLowerCase();
            const nameB = b.Name.toLowerCase();

            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
          });
        }
      }
      if (key === 'Priority') {
        if (op === 'ASC') {
          filteredArray.sort((a: any, b: any) => {
            const priorityA = a.Priority;
            const priorityB = b.Priority;
            // Compare the priorities based on the custom order mapping
            const orderA = priorityOrder[priorityA];
            const orderB = priorityOrder[priorityB];
            // Subtract orderA from orderB to determine the correct sorting order
            return orderA - orderB;
          });
        }
        if (op === 'DSC') {
          filteredArray.sort((a: any, b: any) => {
            const priorityA = a.Priority;
            const priorityB = b.Priority;
            // Compare the priorities based on the custom order mapping
            const orderA = priorityOrder[priorityA];
            const orderB = priorityOrder[priorityB];
            // Subtract orderB from orderA to determine the correct sorting order
            return orderB - orderA;
          });
        }
      }
      if (key === 'Status') {
        if (op === 'ASC') {
          filteredArray.sort((a: any, b: any) => {
            const priorityA = a.Priority;
            const priorityB = b.Priority;
            // Compare the priorities based on the custom order mapping
            const orderA = StatusOrder[priorityA];
            const orderB = StatusOrder[priorityB];
            // Subtract orderA from orderB to determine the correct sorting order
            return orderA - orderB;
          });
        }
        if (op === 'DSC') {
          filteredArray.sort((a: any, b: any) => {
            const priorityA = a.Priority;
            const priorityB = b.Priority;
            // Compare the priorities based on the custom order mapping
            const orderA = StatusOrder[priorityA];
            const orderB = StatusOrder[priorityB];
            // Subtract orderB from orderA to determine the correct sorting order
            return orderB - orderA;
          });
        }
      }
      console.log('sortRules - sorted', filteredArray);
      // SetTaskArrayForRender(filteredArray);
    }
    SetTaskArrayForRender(filteredArray);
  }, [
    filterConditionsGenerated,
    filterRules,
    filterRulesAndArray,
    filterRulesOrArray,
    filterRulesWhereArray,
    props,
    statusPanels,
    workSpaceDocs,
    workspace,
    workspaceDocsSearchKey,
  ]);
  useEffect(() => {
    const { index } = props;
    if (index === 0) {
      setNewTaskUI(triggerTaskCreation);
    }
  }, [triggerTaskCreation, props]);
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
                </svg>{' '}
              </TitleHeaderDragable>
              <TitleHeaderColoured color={props.color} />
              {nameEditable ? (
                <EditColumnWrapper>
                  <EditColumnNameInput
                    onKeyDown={() => setNameEditable(false)}
                    id={`columnNameEdit-${props.id}`}
                    ref={inputRefForColumnEdit}
                  />
                  <EnterOutlined rev={undefined} />
                </EditColumnWrapper>
              ) : (
                <Title>
                  {props.title}
                  {`     (${TaskArrayForRender.length})`}
                </Title>
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
                onKeyDown={onEscapeButtonPressed}
                placeholder="Enter new task"
                ref={inputRef}
                id={`newtaskinput${props.id}`}
              />
            </AddNewTaskWrapper>
          )}
          {}
          <Droppable droppableId={props.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {TaskArrayForRender?.map((mappedTask: any) => {
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
