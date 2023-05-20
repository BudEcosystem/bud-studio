/* eslint-disable prettier/prettier */
import { useState, useEffect, useCallback, useRef } from 'react';
import { DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import './grid.scss';
import GridRow from './GridRow';
import GridCol from './GridCol';

const getGridData = () => {
    const list:any = Array(10)
    .fill({})
    .map((x,i) => {
        return{
            id:`id-${i}`,
            name:`name${i}`,
            age: 10+i,
            class:10,
            div:'A',
            mark:100,
            grade:'A'
        }
    })

    const headerlist:any = [
        {key:'name',name:'Name'},
        {key:'age',name:'Age'},
        {key:'class',name:'Class'},
        {key:'div',name:'Div'},
        {key:'mark',name:'Mark'},
        {key:'grade',name:'Grade'}
    ]
    return{
        headerlist,
        list
    }
  }
function GridView() {
    const refRow = useRef();
    const refCol = useRef();
  const {list,headerlist} = getGridData()    
  const [tableList, setTableList] = useState(list);
  const [tableHeader, setTableHeader] = useState(headerlist);

  const moveRow = useCallback(
    (dragIndex:number, hoverIndex:number) => {
        setTableList((row:any) => {
            const dragItem = row[dragIndex]
            refRow.current =  update(row, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragItem],
                ],
              });
              return refRow.current
        })
    },
    [],
)
const moveCol = useCallback(
    (dragIndex:number, hoverIndex:number) => {
        setTableHeader((col:any) => {
            const dragItem = col[dragIndex]
            refCol.current =  update(col, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, dragItem],
                ],
              });
              return refCol.current
        })
    },
    [],
)
const updateTableList = () => {
    const rows = refRow.current ?? [];
    setTableList([])
    setTimeout(() => {
        setTableList([...rows])
    });
}
const updateTableHeader = () => {
    const cols = refCol.current ?? [];
    setTableHeader([])
    setTimeout(() => {
        setTableHeader([...cols])
    });
}
  const rowDropped = useCallback(() => {
    updateTableList();
  },[])
  const colDropped = useCallback(() => {
    updateTableHeader();
  },[])

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='grid-container'>
        <table>
        <thead>
            <tr>
                <th>#</th>
                {tableHeader.map((y:any,j:number) => <GridCol header={y} index={j} key={y.key} moveCol = {moveCol} colDropped = {colDropped}/>)}          
            </tr>
        </thead>
        <tbody>
            {tableList.map((x:any,i:number) => 
                <GridRow  moveRow={moveRow} header = {x} tableHeader={tableHeader} dropped = {rowDropped} index = {i} key={x.id}/>
            )}
        </tbody>
        </table>
    </div>
    </DndProvider>
  );
}
export default GridView;
