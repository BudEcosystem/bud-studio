import HeaderSection from 'components/ListView/HeaderSection';
import React, { useEffect, useState } from 'react';
import { data } from './data';
import { useTable } from 'react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './tableviewNew.css';
import './tablecss.scss';
import CircularImageComponent from 'components/ListView/ListViewComponents/CircularImageComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  setColumnOrder,
  setNewColumn,
  setNewTaskClickedtable,
} from 'redux/slices/table';

const TableviewNew = () => {
  const [dummy, setDummy] = useState(data);
  const { table }: any = useSelector((state) => state);
  const { columnsArray, newTaskClickedtable, addNewRow } = table;
  const dispatch = useDispatch();
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: '#',
  //       accessor: (row, index) => index + 1,
  //     },
  //     {
  //       Header: 'Account Name',
  //       accessor: 'account_name',
  //     },
  //     {
  //       Header: 'Account ID',
  //       accessor: 'account_id',
  //     },
  //     {
  //       Header: 'Annual Revenue',
  //       accessor: 'annual_revenue',
  //     },
  //     {
  //       Header: 'Score',
  //       accessor: 'score',
  //     },
  //     {
  //       Header: 'Due Date',
  //       accessor: 'due_date',
  //     },
  //     {
  //       Header: 'Assignee',
  //       accessor: 'assignee',
  //       Cell: ({ value }) => <CircularImageComponent />,
  //     },
  //     {
  //       Header: 'Priority',
  //       accessor: 'priority',
  //     },
  //     {
  //       Header: 'Tag',
  //       accessor: 'tag',
  //     },
  //   ],
  //   []
  // );
  const [columns, setColumns] = useState(() => {
    const initialColumns = [...columnsArray];
    return initialColumns;
  });

  const [newColumnInput, setNewColumnInput] = useState('');
  const handleNewColumnInputChange = (e) => {
    setNewColumnInput(e.target.value);
  };
  const handleNewColumnInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newColumn = {
        accessor: `new_column_${columnsArray.length}`,
        Header: () => newColumnInput,
      };
      // setColumns((prevColumns) => [...prevColumns, newColumn]);
      dispatch(setNewColumn(newColumn));
      setNewColumnInput('');
      dispatch(setNewTaskClickedtable(false));
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columnsArray, data: dummy });
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.type === 'column') {
      console.log(result);
      //   const newColumnOrder = Array.from(columnsArray);
      // const [removed] = newColumnOrder.splice(result.source.index, 1);
      // newColumnOrder.splice(result.destination.index, 0, removed);
      dispatch(setColumnOrder(result));
    } else {
      const items = Array.from(dummy);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setDummy(items);
      console.log('Updated data:', items);
    }
  };

  useEffect(() => {
    if (addNewRow) {
      const newRow = {
        id: 8,
        account_name: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
        account_id: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
        annual_revenue: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
        score: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
        due_date: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
        assignee: [],
        priority: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
        tag: (
          <input
            type="text"
            className="titleInputtable"
            placeholder="Add Account name"
          />
        ),
      };
      setDummy((prevData) => [...prevData, newRow]);
      // dispatch(setNewTaskClickedtable(false));
    }
  }, [addNewRow]);
  return (
    <>
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
                                {/* {console.log(column, colIdx)} */}
                              </th>
                            )}
                          </Draggable>
                        ))}
                        {newTaskClickedtable && (
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
                                  >
                                    {cell.render('Cell')}
                                  </td>
                                ))}
                                {newTaskClickedtable && <td></td>}
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
    </>
  );
};

export default TableviewNew;
