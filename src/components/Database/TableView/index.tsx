/*
 *
 * TableView
 *
 */

import React, { useEffect, useState } from 'react';

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
  const [data, setData] = useState(databaseEntries);
  const [columns, setColumns] = useState<GridColumn[]>([
    { title: 'Document' },
    { title: 'Status' },
    { title: 'Priority' },
    // { title: 'Status' },
  ]);
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
    if (col === 1) {
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: '4',
        data: {
          kind: 'dropdown-cell',
          allowedValues: databaseData.propertyPresets.status.options.map(
            (option) => option.title
          ),
          value: rowData.properties.status,
        },
      };
    }
    if (col === 2) {
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: '4',
        data: {
          kind: 'priority-cell',
          allowedValues: databaseData.propertyPresets.priority.options.map(
            (option) => option.title
          ),
          value: rowData.properties.priority,
        },
      };
    }

    // if (col === 3) {
    //   return {
    //     kind: GridCellKind.Custom,
    //     allowOverlay: true,
    //     copyData: '4',
    //     data: {
    //       kind: 'tags-cell',
    //       allowedValues: databaseData.propertyPresets.priority.options.map(
    //         (option) => option.title
    //       ),
    //       value: rowData.properties.priority,
    //     },
    //   };
    // }

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
    setData(databaseEntries);
  }, [databaseEntries]);

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
              <div
                contentEditable
                className="table-add-column-button"
                style={{
                  width: '85px',
                  height: '19px',
                }}
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
