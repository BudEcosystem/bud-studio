/* eslint-disable prettier/prettier */
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

function GridRow({ tableHeader, index, header, moveRow, dropped }: any) {
  const ref: any = useRef(null);
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'row',
      item: { index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  const [, dropRef] = useDrop(() => ({
    accept: 'row',
    hover: (item: any, monitor: any) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: dropped,
  }));
  const dragDropRef: any = dragRef(dropRef(ref));
  return (
    <tr ref={dragDropRef}>
      <td>{index + 1}</td>
      {tableHeader.map((y: any) => (
        <td style={{ opacity }} key={`row-${header.id}-col-${y.key}`}>
          {header[y.key]}
        </td>
      ))}
    </tr>
  );
}
export default GridRow;
