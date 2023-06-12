import HeaderSection from 'components/ListView/HeaderSection';
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './tableviewNew.css';
import './tablecss.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setColumnOrder,
  setNewCellValueRedux,
  setNewColumn,
  setNewRow,
  setNewTaskClickedtable,
  setRowOrder,
} from 'redux/slices/table';

const TableviewNew = () => {
  const { table }: any = useSelector((state) => state);
  const { columnsArray, newTaskClickedtable, addNewRow, rowsInTable } = table;
  const [addCol, setAddCol] = useState(true);
  const [newRowValues, setNewRowValues] = useState({});
  const [newCellValues, setNewCellValues] = useState({});
  const [editingCell, setEditingCell] = useState(null);

  const dispatch = useDispatch();
  const [newColumnInput, setNewColumnInput] = useState('');
  const handleNewColumnInputChange = (e) => {
    setNewColumnInput(e.target.value);
  };
  const handleNewColumnInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newColumn = {
        accessor: `new_column_${columnsArray.length}`,
        Header: newColumnInput,
      };
      dispatch(setNewColumn(newColumn));
      setNewColumnInput('');
      dispatch(setNewTaskClickedtable(false));
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columnsArray, data: rowsInTable });
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.type === 'column') {
      dispatch(setColumnOrder(result));
    } else {
      dispatch(setRowOrder(result));
    }
  };

  const sendRowValues = (e) => {
    if (e.key === 'Enter') {
      dispatch(setNewRow(newRowValues));
      setNewRowValues({});
      dispatch(setNewTaskClickedtable(false));
    }
  };
  const sendCellValues = (e, r, c) => {
    if (e.key === 'Enter') {
      console.log(newCellValues, r, c);
      dispatch(
        setNewCellValueRedux({
          val: newCellValues['newVal'],
          row: r,
          col: c.id,
        })
      );
      setNewCellValues({});
      setEditingCell(null);
    }
  };
  return (
    <div>
      <HeaderSection view="table" />
      <div className="tableContainer">
        <div className="tableParent">
          <DragDropContext onDragEnd={handleDragEnd}>
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map((headerGroup, idx) => (
                  <Droppable
                    droppableId="tableHeader"
                    type="column"
                    direction="horizontal"
                  >
                    {(provided, snapshot) => (
                      <tr
                        {...headerGroup.getHeaderGroupProps()}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {headerGroup.headers.map((column, colIdx) => (
                          <Draggable
                            key={`col-${colIdx}`}
                            draggableId={`col-${colIdx}`}
                            index={colIdx}
                          >
                            {(provided) => (
                              <th
                                {...column.getHeaderProps()}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={colIdx === 0 ? 'firstCol1' : ''}
                                style={{
                                  ...provided.draggableProps.style,
                                  textAlign: colIdx === 0 ? 'center' : '',
                                }}
                              >
                                {column.render('Header')}
                              </th>
                            )}
                          </Draggable>
                        ))}
                        {addCol && (
                          <th>
                            <input
                              type="text"
                              className="titleInputtable"
                              placeholder="Add column"
                              value={newColumnInput}
                              onChange={handleNewColumnInputChange}
                              onKeyPress={handleNewColumnInputKeyPress}
                            />
                          </th>
                        )}
                        {provided.placeholder}
                      </tr>
                    )}
                  </Droppable>
                ))}
              </thead>

              <Droppable droppableId="tableBody">
                {(provided, snapshot) => (
                  <tbody
                    {...getTableBodyProps()}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {rows.map((row, index) => {
                      prepareRow(row);
                      if (newTaskClickedtable && index === rows.length - 1) {
                        return (
                          <tr>
                            {columnsArray.map((cols, i) => {
                              if (i === 0) return <td></td>;
                              return (
                                <td>
                                  <input
                                    type="text"
                                    className="titleInputtable"
                                    name={cols.accessor}
                                    placeholder={`Add ${cols.Header}`}
                                    value={newRowValues[cols.accessor] || ''}
                                    onChange={(e) =>
                                      setNewRowValues((prevValues) => ({
                                        ...prevValues,
                                        [cols.accessor]: e.target.value,
                                      }))
                                    }
                                    onKeyPress={sendRowValues}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }
                      return (
                        <Draggable
                          key={row.id}
                          draggableId={row.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <>
                              <tr
                                {...row.getRowProps()}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  padding: '0px',
                                  boxSizing: 'border-box',
                                }}
                              >
                                {row.cells.map((cell, cellIndex) => (
                                  <td
                                    className={`${
                                      cellIndex === 0 ? 'firstCol' : 'rest'
                                    } col${index}${cellIndex}`}
                                    {...cell.getCellProps()}
                                    {...(cellIndex === 0
                                      ? provided.dragHandleProps
                                      : {})}
                                    style={{
                                      paddingLeft:
                                        cellIndex === 0 ? '' : '12px',
                                    }}
                                    onDoubleClick={() =>
                                      setEditingCell({
                                        rowIndex: index,
                                        cellIndex,
                                      })
                                    }
                                  >
                                    {editingCell?.rowIndex === index &&
                                    editingCell?.cellIndex === cellIndex ? (
                                      <input
                                        type="text"
                                        className="titleInputtable"
                                        name={cell.column.accessor}
                                        placeholder={`Change ${cell.column.Header}`}
                                        value={newCellValues['newVal'] || ''}
                                        onChange={(e) =>
                                          setNewCellValues((prevValues) => ({
                                            ...prevValues,
                                            newVal: e.target.value,
                                          }))
                                        }
                                        onKeyPress={(e) =>
                                          sendCellValues(e, index, cell.column)
                                        }
                                        autoFocus
                                      />
                                    ) : (
                                      cell.render('Cell')
                                    )}
                                  </td>
                                ))}
                                {addCol && <td></td>}
                              </tr>
                            </>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default TableviewNew;
