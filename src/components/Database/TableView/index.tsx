/*
 *
 * TableView
 *
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';
import type {
  GetRowThemeCallback,
  GridMouseEventArgs,
} from '@glideapps/glide-data-grid';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import {
  useExtraCells,
  StarCell,
  DropdownCell,
  TagsCell,
} from '@glideapps/glide-data-grid-cells';

import { useDispatch, useSelector } from 'react-redux';
import { moveDatabaseRow } from '@/redux/slices/database';
import TaskViewTable from '@/components/TaskViewTable/TaskViewTable';
import { changePriority, changeStatus } from '@/redux/slices/workspace';
import DocumentCellRenderer, { DocumentCell } from './Cells/DocumentCell';
import PriorityCellRenderer, { PriorityCell } from './Cells/PriorityCell';

import { ReactComponent as DragButtonIcon } from '../../../../public/images/drag-button.svg';
import '@glideapps/glide-data-grid/dist/index.css';
import '@glideapps/glide-data-grid-cells/dist/index.css';
import './table.view.css';

// Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
// @ts-ignore

export default function TableView({
  databaseData,
  databaseEntries,
  appendEmptyDocument,
}: any): JSX.Element {
  const cellProps = useExtraCells();

  // const { workspace } = useSelector((state) => state);

  const dispatch = useDispatch();

  // State Data
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState<GridColumn[]>([]);
  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);
  const [taskViewOpen, setTaskViewOpen] = useState(false);
  const { workspace }: any = useSelector((state) => state);
  const { database }: any = useSelector((state) => state);
  const [taskViewData, setTaskViewData] = useState();
  const [statusPanels, setStatusPanels] = useState(null);

  // Row Hover Effect
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== 'cell' ? undefined : row);
  }, []);

  // console.log('TABLE GOV', databaseData);
  //
  // const TaskTitle = database?.databases.map((dt: any) => {
  //   // if(dataId == dt.id) {
  //   //   return dt.title;
  //   // }
  // });

  // Theme Override
  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(
    (row: number | undefined) => {
      if (row !== hoverRow) return undefined;
      return {
        bgCell: '#464856',
      };
    },
    [hoverRow]
  );

  function getData([col, row]: Item): GridCell {
    const rowData = data[row];
    const newDataArr = [];
    rowData.properties.map((item) => newDataArr.push(item));
    rowData.customProperties.map((item) => newDataArr.push(item));
    // console.log(newDataArr, col, rowData, columns);

    const matchingItem = newDataArr.find((item) => item.order === col);
    // console.log(matchingItem);
    if (matchingItem === undefined && columns[col].title === 'Document') {
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: '4',
        data: {
          kind: 'document-cell',
          title: rowData.name,
          uuid: '123',
          onOpenClick: () => {
            console.log('ROWDATAGOV', rowData);
            setTaskViewData(rowData);
            setTaskViewOpen(true);
          },
        },
      } as DocumentCell;
    }

    if (matchingItem) {
      if (matchingItem.type === 'tags') {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: 'tags-cell',
            possibleTags: databaseData.propertyPresets.tags.options,
            tags: ['PR'],
          },
        };
      }

      if (matchingItem.type === 'status') {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: 'dropdown-cell',
            allowedValues: databaseData.propertyPresets.status.options.map(
              (option) => option.title
            ),
            value: matchingItem.value,
            id: rowData.uuid,
            changeValue: (id: any, label: any) => {
              dispatch(changeStatus({ id, label }));
            },
          },
        };
      }

      if (matchingItem.type === 'priority') {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: 'priority-cell',
            allowedValues: databaseData.propertyPresets.priority.options.map(
              (option) => option.title
            ),
            value: matchingItem.value,
            id: rowData.uuid,
            changeValue: (id: any, label: any) => {
              dispatch(changePriority({ id, label }));
            },
          },
        };
      }
      if (matchingItem.type === 'date') {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          displayData: matchingItem.value || '',
          data: matchingItem.value || ' ',
          allowWrapping: true,
        };
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: matchingItem.value,
        data: matchingItem.value,
        allowWrapping: true,
      };
    }

    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: 'Untitled',
      data: '',
      allowWrapping: true,
    };

    // console.log(col)
    // if (col === 0) {
    //   return {
    //     kind: GridCellKind.Custom,
    //     allowOverlay: true,
    //     copyData: '4',
    //     data: {
    //       kind: 'document-cell',
    //       title: rowData.name,
    //       uuid: '123',
    //       onOpenClick: () => {
    //         console.log('open');
    //         setTaskViewOpen(true);
    //       },
    //     },
    //   } as DocumentCell;
    // }

    // if (col <= rowData.properties.length) {
    //   const propRpw = rowData.properties.find(
    //     (property) => property.order === col
    //   );

    //   if (propRpw?.type === 'tags') {
    //     return {
    //       kind: GridCellKind.Custom,
    //       allowOverlay: true,
    //       copyData: '4',
    //       data: {
    //         kind: 'tags-cell',
    //         possibleTags: databaseData.propertyPresets.tags.options,
    //         tags: ['PR'],
    //       },
    //     };
    //   }

    //   if (propRpw?.type === 'status') {
    //     return {
    //       kind: GridCellKind.Custom,
    //       allowOverlay: true,
    //       copyData: '4',
    //       data: {
    //         kind: 'dropdown-cell',
    //         allowedValues: databaseData.propertyPresets.status.options.map(
    //           (option) => option.title
    //         ),
    //         value: propRpw.value,
    //       },
    //     };
    //   }

    //   if (propRpw?.type === 'priority') {
    //     return {
    //       kind: GridCellKind.Custom,
    //       allowOverlay: true,
    //       copyData: '4',
    //       data: {
    //         kind: 'priority-cell',
    //         allowedValues: databaseData.propertyPresets.priority.options.map(
    //           (option) => option.title
    //         ),
    //         value: propRpw.value,
    //       },
    //     };
    //   }

    //   return {
    //     kind: GridCellKind.Text,
    //     allowOverlay: true,
    //     displayData: '',
    //     data: '',
    //     allowWrapping: true,
    //   };
    // }

    // const propRpw = rowData.customProperties.find(
    //   (property) => property.order === col
    // );

    // if (propRpw) {
    //   return {
    //     kind: GridCellKind.Text,
    //     allowOverlay: true,
    //     displayData: propRpw.value,
    //     data: propRpw.value,
    //     allowWrapping: true,
    //   };
    // }

    // return {
    //   kind: GridCellKind.Text,
    //   allowOverlay: true,
    //   displayData: '',
    //   data: '',
    //   allowWrapping: true,
    // };

    // throw new Error();
  }

  const onAddRowDrag = (e: DraggableEvent, ui: DraggableData) => {
    // Push The State
    const newData = [...data];
    newData.push({ name: '' });
    setData(newData);
  };

  // const prepareData = () => {
  //   console.log('Data prepration');
  //   console.log(workspace.workSpaceDocs);
  //
  //   const selectedDocs = workspace.workSpaceDocs;
  //   setData(selectedDocs);
  // };

  // Get The Documents Linked Inside the database
  // useEffect(() => {
  //   if (databaseData) {
  //     // const documents = databaseData.documents;
  //     // setData(documents);
  //     prepareData();
  //   }
  // }, [databaseData]);

  // Create New Row => Create New Document
  const addNewRow = (e) => {
    // const newData = [...data];
    // Identify the current workspace and folder
    // create new document
    // newData.push({ name: 'untitled' });
    // setData(newData);
    appendEmptyDocument();
  };

  useEffect(() => {
    const updateData = () => {
      console.log('Prepare Data Called');
      console.log(databaseEntries);

      const column:
        | React.SetStateAction<GridColumn[]>
        | { title: any; order: any }[] = [{ title: 'Document', order: 0 }];

      // Properties
      // column.push(
      //   {
      //     title: 'Status',
      //     order: 1,
      //   },
      //   {
      //     title: 'Tags',
      //     order: 2,
      //   },
      //   {
      //     title: 'Priority',
      //     order: 3,
      //   }
      // );

      // databaseEntries.forEach((entry) => {
      // System Defined Properties
      databaseEntries[0].properties.forEach((property) => {
        column.push({ title: property.title, order: property.order });
      });

      // User Defined Properties
      databaseEntries[0].customProperties.forEach((property) => {
        column.push({ title: property.title, order: property.order });
      });
      // });

      // Set The Columns
      setColumns(column);

      console.log('Entries', databaseEntries);

      // Prepare Thw Data

      setData(databaseEntries);
    };

    // For Smooth Re-rendering
    if (data === null) {
      // Prepare Data
      updateData();
    } else if (data && databaseEntries.length !== data.length) {
      updateData();
    }
  }, [databaseEntries]);

  // Add New Column
  const newColumnInput = useRef(null);
  const addNewColumn = (e) => {
    // check if caracter presses is enter

    if (e.key === 'Enter') {
      const newColumnTitle = newColumnInput.current.value;
      const newColumns = [...columns];
      newColumns.push({ title: newColumnTitle, order: columns.length });
      setColumns(newColumns);
      newColumnInput.current.value = '';

      // Update The Properties
    }
  };

  /*
   * Row Sorting handler
   */
  const onRowSort = (s, e) => {
    dispatch(
      moveDatabaseRow({ databaseID: databaseData.id, oldIndex: s, newIndex: e })
    );

    // Update the Local State
    let newData = [...data];
    newData = moveArrayItemToNewIndex(newData, s, e);
    setData(newData);
  };

  /*
   * Column Sorting handler
   */
  const onColumnMoved = (s, e) => {
    let newColumns = [...columns];
    newColumns = changeOrder(newColumns, s, e);

    setColumns(newColumns);
    console.log('Chnaged Columns', newColumns, columns, data);
    let newData = [...data];
    newData = newData.map((rowData) => {
      const updatedRowData = { ...rowData };

      updatedRowData.customProperties = updatedRowData.customProperties.map(
        (customProp) => {
          const matchingColumn = newColumns.find(
            (column) => column.title === customProp.title
          );
          if (matchingColumn) {
            return { ...customProp, order: matchingColumn.order };
          }
          return customProp;
        }
      );

      updatedRowData.properties = updatedRowData.properties.map((prop) => {
        const matchingColumn = newColumns.find(
          (column) => column.title === prop.title
        );
        if (matchingColumn) {
          return { ...prop, order: matchingColumn.order };
        }
        return prop;
      });

      return updatedRowData;
    });

    setData(newData);
    console.log(newData);
  };

  // Move To Util Class
  function moveArrayItemToNewIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  // Move to Util Class
  function changeOrder(arr: any, oldIndex: number, newIndex: number): any {
    const item = arr.splice(oldIndex, 1)[0]; // remove the item at the old index
    arr.splice(newIndex, 0, item); // add that item back at the new index

    // Update the order property for each item
    for (let i = 0; i < arr.length; i++) {
      arr[i].order = i;
    }
    return arr;
  }

  const cellEditHandler = (cell, newVal) => {
    console.log(data);
  };

  useLayoutEffect(() => {
    // Get Database entries
    const sortedContent = [];
    databaseData.entries.map((item) => {
      const document = workspace.workSpaceDocs.filter(
        (obj) => obj.uuid === item.documentID
      );
      sortedContent.push(document[0]);
    });

    const data: any[] = [];
    databaseData.propertyPresets.status.options.map((item: any) => {
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
  }, [databaseData, databaseEntries]);

  const getTaskView = () => {
    console.log('Changes', taskViewData);
    const taskViewDataTemp = { ...taskViewData };
    taskViewDataTemp.entry = taskViewDataTemp;

    console.log("Task View Data", taskViewDataTemp);
    return taskViewDataTemp;
  };

  console.log("VAYYA", getTaskView())

  var checkedNum = 0;

  return (
    <div className="table-wrapper" id="table-wrapper">
      {taskViewOpen && (
        <TaskViewTable
          data={getTaskView()}
          title={databaseData.title}
          showTaskViewModal={taskViewOpen}
          databaseEntries={databaseData.entries}
          setShowTaskViewModal={setTaskViewOpen}
          item={getTaskView()}
          status={getTaskView()?.properties[2].value}
          level={0}
          checkedNum={checkedNum}
          subChild={false}
          statusPanels={statusPanels}
        />
      )}

      {data && (
        <DataEditor
          {...cellProps}
          width={1151}
          theme={{
            bgHeader: '#1B1C1E',
            textHeader: '#BBB',
            bgCell: '#28272C',
            textDark: '#FFFFFF',
            textMedium: '#FFFFFF',
            textLight: '#FFFFFF',
            borderColor: '#2F2F2F',
            bgHeaderHovered: '#939AFF',
            bgHeaderHasFocus: '#151515',
            accentColor: '#939AFF',
            textHeaderSelected: '#FFFFFF',
            accentLight: '#3C3C49',
            fontFamily: 'Noto Sans, sans-serif',
          }}
          columns={columns}
          getCellContent={getData}
          onPaste
          rows={data.length}
          getCellsForSelection
          rowMarkers="number"
          isDraggable={false}
          onRowMoved={onRowSort}
          onColumnMoved={onColumnMoved}
          onDragStart={(e) => {
            e.setData('text/plain', 'Drag data here!');
          }}
          rightElement={
            <div className="table-add-column">
              <div className="table-column-virtalbar" />
              <input
                className="table-add-column-button"
                ref={newColumnInput}
                placeholder="Add Column"
                style={{
                  width: '85px',
                  height: '19px',
                }}
                onKeyDown={addNewColumn}
              />
            </div>
          }
          trailingRowOptions={{
            // How to get the trailing row to look right
            sticky: false,
            tint: true,
            hint: 'Add',
          }}
          rightElementProps={{
            fill: false,
            sticky: false,
          }}
          onRowAppended={addNewRow}
          onCellEdited={(cell, newVal) => {
            cellEditHandler(cell, newVal);
            console.log(cell, newVal);
          }}
          allowOverlay
          readonly={false}
          onItemHovered={onItemHovered}
          getRowThemeOverride={getRowThemeOverride}
          customRenderers={[
            DocumentCellRenderer,
            StarCell,
            DropdownCell,
            PriorityCellRenderer,
            TagsCell,
          ]}
        />
      )}

      <Draggable
        axis="y"
        handle=".table-drag-button"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[5, 5]}
        scale={1}
        onDrag={(e, ui) => onAddRowDrag(e, ui)}
        onStop={(e, ui) => console.log(ui)}
      >
        <div>
          <div className="table-drag-button">
            <DragButtonIcon />
          </div>
        </div>
      </Draggable>
    </div>
  );
}
