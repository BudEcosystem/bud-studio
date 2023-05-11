import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableColumn from './Column';
import { getItems } from '../data/sampleData';
const KanbanBoard = () => {
  const onDragEndTriggered = (result: any) => {
    console.log(result);
  };
  const [sections,setSections] = useState(getItems(3))
  return (
    <DragDropContext onDragEnd={onDragEndTriggered}>
      {/* droppable area */}
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={true}
        isCombineEnabled={true}
      >
        {(provided) => (
          <div
            style={{ display: 'inline-flex' }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sections.map(({ title,color,id }) => {
              console.log('key- index', title);
              return <DraggableColumn title={title} index={id} key={id} color={color} isCombineEnabled={false} useClone={false} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default KanbanBoard;
