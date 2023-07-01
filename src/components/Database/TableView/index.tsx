/*
 *
 * TableView
 *
 */

import React, { useState } from 'react';
import '@glideapps/glide-data-grid/dist/index.css';
import '@glideapps/glide-data-grid-cells/dist/index.css';
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
  StarCellType,
} from '@glideapps/glide-data-grid-cells';
// import type { StarCell, TagsCell } from '@glideapps/glide-data-grid-cells';
import DocumentCellRenderer, { DocumentCell } from './Cells/DocumentCell';

import { ReactComponent as DragButtonIcon } from '../../../../public/images/drag-button.svg';

import './table.view.css';

// Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
// @ts-ignore
const columns: GridColumn[] = [
  { title: 'First Name' },
  { title: 'Last Name' },
  { title: 'Star' },
  { title: 'Account Name' },
];

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

// tags
const possibleTags = [
  {
    tag: 'Bug',
    color: '#ff4d4d35',
  },
  {
    tag: 'Feature',
    color: '#35f8ff35',
  },
  {
    tag: 'Enhancement',
    color: '#48ff5735',
  },
  {
    tag: 'First Issue',
    color: '#436fff35',
  },
  {
    tag: 'PR',
    color: '#e0ff3235',
  },
  {
    tag: 'Assigned',
    color: '#ff1eec35',
  },
];

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.

export default function TableView(): JSX.Element {
  // State Data
  const [data, setData] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      star: 4,
      title: 'Duff Beer',
    },
    {
      firstName: 'Maria',
      lastName: 'Garcia',
      star: 4,
      title: 'Soylent corp',
    },
    {
      firstName: 'Nancy',
      lastName: 'Jones',
      star: 4,
      title: 'Wonka industries',
    },
    {
      firstName: 'James',
      lastName: 'Smith',
      star: 4,
      title: 'Wayne enterprise',
    },
  ]);
  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);

  const cellProps = useExtraCells();

  // Row Hover Effect
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== 'cell' ? undefined : row);
  }, []);

  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(
    (row) => {
      if (row !== hoverRow) return undefined;
      return {
        bgCell: '#464856',
      };
    },
    [hoverRow]
  );

  // Return Data
  function getData([col, row]: Item): GridCell {
    const person = data[row];

    if (col === 0) {
      return {
        kind: GridCellKind.Text,
        data: person.firstName,
        allowOverlay: true,
        displayData: person.firstName,
      };
    }
    if (col === 2) {
      return {
        kind: GridCellKind.Text,
        data: person.lastName,
        allowOverlay: true,
        displayData: person.lastName,
      };
    }

    if (col === 1) {
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: '4',
        data: {
          kind: 'star-cell',
          label: 'Test',
          rating: 4,
        },
      };
    }
    if (col === 3) {
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: '4',
        data: {
          kind: 'document-cell',
          title: person.title,
          uuid: '123',
          onOpenClick: () => {
            console.log('open');
          },
        },
      } as DocumentCell;
    }
    // if (col === 3) {
    //   return {
    //     kind: GridCellKind.Custom,
    //     allowOverlay: true,
    //     copyData: '4',
    //     data: {
    //       kind: "tags-cell",
    //       possibleTags,
    //       readonly: row % 2 === 0,
    //       tags: [
    //         possibleTags[0].tag,
    //         possibleTags[1].tag,
    //         possibleTags[2].tag,
    //         possibleTags[3].tag,
    //       ],
    //     },
    //   } as TagsCell;

    throw new Error();
  }

  const onAddRowDrag = (e: DraggableEvent, ui: DraggableData) => {
    // Push The State
    const newData = [...data];
    newData.push({ firstName: '', lastName: '', star: 0, title: '' });
    setData(newData);
  };

  return (
    <div className="table-wrapper" id="table-wrapper">
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
            >
            </div>
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
        onRowAppended={(e) => console.log(e)}
        onCellEdited={(cell, newVal) => {
          console.log(cell, newVal);
        }}
        allowOverlay
        readonly={false}
        onItemHovered={onItemHovered}
        getRowThemeOverride={getRowThemeOverride}
        customRenderers={[DocumentCellRenderer, StarCell]}
      />

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
