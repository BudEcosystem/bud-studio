/*
 *
 * TableView
 *
 */

import React from 'react';
import '@glideapps/glide-data-grid/dist/index.css';
import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';

import { ReactComponent as DragButtonIcon } from '../../../../public/images/drag-button.svg';

import './table.view.css';

const data = [
  {
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    firstName: 'Maria',
    lastName: 'Garcia',
  },
  {
    firstName: 'Nancy',
    lastName: 'Jones',
  },
  {
    firstName: 'James',
    lastName: 'Smith',
  },
];

// Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
const columns: GridColumn[] = [{ title: 'First Name' }, { title: 'Last Name' }];

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData([col, row]: Item): GridCell {
  const person = data[row];

  if (col === 0) {
    return {
      kind: GridCellKind.Text,
      data: person.firstName,
      allowOverlay: false,
      displayData: person.firstName,
    };
  }
  if (col === 1) {
    return {
      kind: GridCellKind.Text,
      data: person.lastName,
      allowOverlay: false,
      displayData: person.lastName,
    };
  }
  throw new Error();
}
export default function TableView(): JSX.Element {
  return (
    <div className="table-wrapper">
      <DataEditor
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
          <div>
            <button onClick={() => window.alert('Add a column!')}>+</button>
          </div>
        }
        rightElementProps={{
          fill: false,
          sticky: false,
        }}
      />
      <div className="table-drag-button">
        <DragButtonIcon />
      </div>
    </div>
  );
}
