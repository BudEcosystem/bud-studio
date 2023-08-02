/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import { createNewColumn, updateColumnPosition } from 'redux/slices/kanban';
import { useDispatch, useSelector } from 'react-redux';
import { changeKanbanStatusForWorkSpaceDocs } from '@/redux/slices/workspace';
import {
  addNewPropertPresetsStatusOptions,
  changeDatabaseStatusOrder,
} from '@/redux/slices/database';
import Column from './components/column';
import KanbanFilter from './components/FilterComponent';
import KanbanSort from './components/SortComponent';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  align-content: flex-start;
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
function Kanban({
  dbId,
  showSubtask,
  setShowSubtask,
  setTaskCount,
  taskCount,
}: any) {
  const [kanbanDBData, setKanbanDBData] = useState<any>({});
  const [currentWorkSpace, setCurrentWorkSpace] = useState(null);
  const [docSubtasks, setDocSubtasks] = useState<any>([]);
  const dispatch = useDispatch();
  const onDragEnd = (result: any) => {
    const { destination } = result;
    if (destination) {
      const statusKeyArray = kanbanDBData.propertyPresets.status.options.map(
        (statObj: any) => statObj.key
      );
      if (statusKeyArray.includes(result.draggableId)) {
        dispatch(changeDatabaseStatusOrder({ dragResult: result }));
      } else {
        dispatch(changeKanbanStatusForWorkSpaceDocs({ dragResult: result }));
      }
    }
  };

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    function toSnakeCase(str: string) {
      // Replace all spaces and punctuation marks with underscores
      let snakeCaseStr = str.replace(/[\s\W]+/g, '_');
      // Convert to lowercase
      snakeCaseStr = snakeCaseStr.toLowerCase();
      return snakeCaseStr;
    }
    const input = document.getElementById(`newColumninput`);
    input?.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (inputRef.current?.value) {
          const newSectionParams = {
            title: inputRef.current?.value,
            color: 'yellow',
            key: toSnakeCase(inputRef.current?.value),
          };
          dispatch(
            addNewPropertPresetsStatusOptions({
              newSectionParams,
              id: dbId,
            })
          );
          inputRef.current.value = '';
        }
      }
    });
  });

  const { database: databaseData, workspace }: any = useSelector(
    (state) => state
  );
  useEffect(() => {
    if (workspace) {
      const { currentWorkspace: cw } = workspace;
      setCurrentWorkSpace(cw);
    }
  }, [workspace]);
  useEffect(() => {
    if (databaseData?.databases) {
      const kanbanRelatedDBData = databaseData.databases.find(
        (data: any) => data.defaultView === 'Kanban' && data.id === dbId
      );
      setKanbanDBData(kanbanRelatedDBData);
    }
  }, [databaseData, dbId]);
  const [filterRules, setFilterRules] = useState<any>([]);
  const [sortRules, setSortRules] = useState<any>([]);

  const [filterType, setFilterType] = useState<string>('chain');
  const [sortType, setSortType] = useState<string>('chain');

  const {
    workSpaceFilterKey,
    workSpaceFiltertype,
    workSpaceSortKey,
    workSpaceSortType,
  } = workspace;
  useEffect(() => {
    if (workspace) {
      if (workSpaceFiltertype === 'chain') {
        setFilterType('chain');
        const filterRuleObject = {
          key: workSpaceFilterKey,
          query: '',
          op: 'is',
          condition: null,
        };
        setFilterRules([filterRuleObject]);
      } else if (workSpaceFiltertype === 'group') {
        setFilterRules([
          {
            key: 'Name',
            query: '',
            op: 'is',
            condition: null,
          },
        ]);
        setFilterType('group');
      }
      if (workSpaceSortType === 'chain') {
        setSortType('chain');
        const sortRuleObject = {
          key: workSpaceSortKey,
          query: '',
          op: 'ASC',
          condition: null,
        };
        setSortRules([sortRuleObject]);
      } else if (workSpaceSortType === null) {
        setSortType('chain');
        setSortRules([]);
      }
    }
  }, [
    workSpaceFilterKey,
    workSpaceFiltertype,
    workspace,
    workSpaceSortKey,
    workSpaceSortType,
  ]);
  const callBackOnNewFilter = (arrayPassed: any) => {
    setFilterRules([...arrayPassed]);
  };
  const callBackOnNewSort = (arrayPassed: any) => {
    setSortRules([...arrayPassed]);
  };
  console.log('MMMM', sortRules);

  function getDocumentIds(obj: any) {
    const documentIds: any[] = [];

    function traverse(obj: any) {
      if (typeof obj === 'object' && obj !== null) {
        if ('documentID' in obj) {
          documentIds.push(obj.documentID);
        }

        for (const key in obj) {
          traverse(obj[key]);
        }
      }
    }

    traverse(obj);
    return documentIds;
  }

  function getChildsArrayForDocumentID(obj: any, targetDocumentID: any) {
    let targetChilds: never[] = [];

    function traverse(obj: any) {
      if (typeof obj === 'object' && obj !== null) {
        if ('documentID' in obj && obj.documentID === targetDocumentID) {
          targetChilds = obj.childs;
        }

        for (const key in obj) {
          traverse(obj[key]);
        }
      }
    }

    traverse(obj);
    return targetChilds;
  }

  function isDocumentIdInParentLevel(data: any, documentId: any) {
    for (const item of data) {
      if (item.documentID === documentId) {
        return false;
      }
    }
    return true;
  }

  function findParentDocumentId(
    data: any,
    inputDocumentId: any,
    parentDocumentId = null
  ) {
    for (const item of data) {
      if (item.documentID === inputDocumentId) {
        return parentDocumentId;
      }
      if (item.childs.length > 0) {
        const foundParent = findParentDocumentId(
          item.childs,
          inputDocumentId,
          item.documentID
        );
        if (foundParent !== null) {
          return foundParent;
        }
      }
    }
    return null; // If the input document ID is not found or is already at the parent level in the array.
  }

  function findLevel(data, targetId, currentLevel = 0) {
    for (const item of data) {
      if (item.documentID === targetId) {
        return currentLevel;
      }
      if (item.childs.length > 0) {
        const nestedLevel = findLevel(item.childs, targetId, currentLevel + 1);
        if (nestedLevel !== null) {
          return nestedLevel;
        }
      }
    }
    return null; // Return null if the targetId is not found in the object
  }

  const temp: {
    childs: never[];
    documentID: string;
    statusKey: string;
    subChild: /* eslint-disable react/jsx-props-no-spreading */ boolean;
    parentName: string;
  }[] = [];

  if (showSubtask) {
    const docIds = getDocumentIds(kanbanDBData.entries);
    docIds.forEach((id: any, i: any) => {
      let parentName = '';
      const subChild = isDocumentIdInParentLevel(kanbanDBData.entries, id);
      const level = findLevel(kanbanDBData.entries, id);

      if (subChild == true) {
        parentName = findParentDocumentId(kanbanDBData.entries, id);
        if (parentName) {
          workspace.workSpaceDocs.map((doc: any) => {
            if (parentName == doc.uuid) {
              parentName = doc.name;
            }
          });
        }
      }
      const childArray = getChildsArrayForDocumentID(kanbanDBData.entries, id);

      const addObj = {
        childs: childArray,
        documentID: `${id}`,
        statusKey: 'not_started',
        subChild,
        parentName,
        level,
      };
      temp.push(addObj);
    });
  }
  console.log('ttt filterRules', filterRules);
  return (
    <ContainerWrapper
      style={{
        width: '100%',
        overflow: 'scroll',
      }}
    >
      {filterRules?.length > 0 && (
        <KanbanFilter
          filterRules={filterRules}
          callBackOnNewFilter={callBackOnNewFilter}
          filterType={filterType}
        />
      )}
      {sortRules?.length > 0 && (
        <KanbanSort
          sortRules={sortRules}
          callBackOnNewFilter={callBackOnNewSort}
          filterType={sortType}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={`${kanbanDBData.id}`}
          direction="horizontal"
          type="column"
        >
          {(provided: {
            droppableProps: any;
            innerRef: any;
            placeholder: any;
          }) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {kanbanDBData?.propertyPresets?.status?.options?.map(
                (columnId: any, index: any) => {
                  const column =
                    kanbanDBData?.propertyPresets?.status?.options[index];
                  return (
                    <Column
                      key={column?.key}
                      currentKey={column?.key}
                      title={column?.title}
                      entries={showSubtask ? temp : kanbanDBData?.entries}
                      databaseData={kanbanDBData}
                      id={columnId?.key}
                      index={index}
                      color={column?.color}
                      dbId={dbId}
                      filterRules={filterRules}
                      sortRules={sortRules}
                      showSubtask={showSubtask}
                      setShowSubtask={setShowSubtask}
                      setTaskCount={setTaskCount}
                      taskCount={taskCount}
                    />
                  );
                }
              )}
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
