/* eslint-disable prettier/prettier */
import { useDrag, useDrop } from 'react-dnd'
import {useRef} from 'react'

function GridCol({index,header, moveCol, colDropped}:any){
    const ref:any = useRef(null)
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: 'col',
          item: { index},
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
        }),
        []
      )
      const [, dropRef] = useDrop(() => ({
        accept: 'col',
        hover: (item:any, monitor:any) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.left - hoverBoundingRect.right) / 2
            const hoverActualY = monitor.getClientOffset().x - hoverBoundingRect.right

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveCol(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
        drop:colDropped
      }))
      const dragDropRef:any = dragRef(dropRef(ref))    
    return (
        <th ref={dragDropRef} style={{ opacity }} >{header.name}</th>
    )
}
export default GridCol;