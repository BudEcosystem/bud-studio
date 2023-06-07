import HeaderSection from 'components/ListView/HeaderSection';
import React, { useState } from 'react';
import { data } from './data';
import { useTable } from 'react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './tableviewNew.css';
import './tablecss.scss';
import CircularImageComponent from 'components/ListView/ListViewComponents/CircularImageComponent';

const TableviewNew = () => {
  const [dummy, setDummy] = useState(data);
  console.log('dsa', dummy);
  console.log('dsfasda', data);

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: (row, index) => index + 1,
      },
      {
        Header: 'Account Name',
        accessor: 'account_name',
      },
      {
        Header: 'Account ID',
        accessor: 'account_id',
      },
      {
        Header: 'Annual Revenue',
        accessor: 'annual_revenue',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Due Date',
        accessor: 'due_date',
      },
      {
        Header: 'Assignee',
        accessor: 'assignee',
        Cell: ({ value }) => <CircularImageComponent />,
      },
      {
        Header: 'Priority',
        accessor: 'priority',
      },
      {
        Header: 'Tag',
        accessor: 'tag',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: dummy });
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Reorder the data based on the drag and drop result
    const items = Array.from(dummy);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the data array
    // Note: You may want to update the state or perform any necessary actions here
    setDummy(items);
    console.log('Updated data:', items);
  };
  return (
    <>
      <HeaderSection view="table" />
      <div className="tableContainer">
        <div className="tableParent">
          <DragDropContext onDragEnd={handleDragEnd}>
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, colIdx) => (
                      <th
                        {...column.getHeaderProps()}
                        className={colIdx === 0 ? 'firstCol1' : ''}
                        style={{ textAlign: colIdx === 0 ? 'center' : '' }}
                      >
                        {column.render('Header')}
                        {console.log(column, colIdx)}
                      </th>
                    ))}
                  </tr>
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
                            <tr
                              {...row.getRowProps()}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                padding: '0px',
                                boxSizing: 'border-box',
                                // Adjust the minimum height as needed
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
                                    // Adjust the minimum height as needed
                                    // minWidth: '100px'
                                    paddingLeft: cellIndex === 0 ? '' : '12px',
                                  }}
                                >
                                  {cell.render('Cell')}
                                </td>
                              ))}
                            </tr>
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
