/*
 *
 * TableView
 *
 */

import React, { useEffect, useRef, useState } from 'react';

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

import { useSelector } from 'react-redux';
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

  // State Data
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState<GridColumn[]>([]);
  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);

  // Row Hover Effect
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== 'cell' ? undefined : row);
  }, []);

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

    if (col === 0) {
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: '4',
        data: {
          kind: 'document-cell',
          title: rowData.name,
          uuid: '123',
          onOpenClick: () => {
            console.log('open');
          },
        },
      } as DocumentCell;
    }

    if (col <= rowData.properties.length) {
      const propRpw = rowData.properties.find(
        (property) => property.order === col
      );

      if (propRpw.type === 'tags') {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: 'dropdown-cell',
            allowedValues: databaseData.propertyPresets.status.options.map(
              (option) => option.title
            ),
            value: propRpw.value,
          },
        };
      }

      if (propRpw.type === 'status') {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: 'dropdown-cell',
            allowedValues: databaseData.propertyPresets.status.options.map(
              (option) => option.title
            ),
            value: propRpw.value,
          },
        };
      }

      if (propRpw.type === 'priority') {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: 'priority-cell',
            allowedValues: databaseData.propertyPresets.priority.options.map(
              (option) => option.title
            ),
            value: propRpw.value,
          },
        };
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: '',
        data: '',
        allowWrapping: true,
      };
    }

    const propRpw = rowData.customProperties.find(
      (property) => property.order === col
    );

    if (propRpw) {
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: propRpw.value,
        data: propRpw.value,
        allowWrapping: true,
      };
    }

    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: '',
      data: '',
      allowWrapping: true,
    };

    throw new Error();
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
    // Prepare Data
    console.log('Prepare Data Called');

    const column:
      | React.SetStateAction<GridColumn[]>
      | { title: any; order: any }[] = [{ title: 'Document', order: 0 }];

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

    // Prepare Thw Data

    setData(databaseEntries);
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

  return (
    <div className="table-wrapper" id="table-wrapper">
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
          onRowMoved={(s, e) => window.alert(`Moved row ${s} to ${e}`)}
          onColumnMoved={(s, e) => window.alert(`Moved col ${s} to ${e}`)}
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
            sticky: true,
            tint: true,
            hint: 'Add',
          }}
          rightElementProps={{
            fill: false,
            sticky: false,
          }}
          onRowAppended={addNewRow}
          onCellEdited={(cell, newVal) => {
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
