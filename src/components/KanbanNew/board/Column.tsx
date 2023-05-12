/* eslint-disable react/jsx-props-no-spreading */
import { Draggable, Droppable } from 'react-beautiful-dnd';
import KanbanColumnChildList from '../List';

interface draggableDiv {
  title: string;
  index: number;
  color: string;
  isCombineEnabled: boolean;
  useClone: boolean;
}
function DraggableColumn({
  title,
  index,
  color,
  isCombineEnabled,
  useClone,
}: draggableDiv) {
  console.log('title', title);
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => {
        console.log('dragSnapshot par', snapshot,provided);
        return (
          // container div
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              style={{
                marginTop: '10px',
                height: '70vh',
                width: '400px',
                background: color,
                marginLeft: '10px',
                padding: '10px',
              }}
            >
              <div
                data-isDragging={snapshot?.isDragging}
                //   isDragging={snapshot?.isDragging}
                {...provided?.dragHandleProps}
              >
                {title}
              </div>
              {/* <Droppable></Droppable> */}
              <KanbanColumnChildList
                listType="LIST"
                listId={`${title}-LISTCHILD`}
                isDropDisabled={false}
                isCombineEnabled={Boolean(isCombineEnabled)}
                useClone={Boolean(useClone)}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default DraggableColumn;
