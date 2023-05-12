import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableColumn from './Column';
import { getItems } from '../data/sampleData';

function KanbanBoard() {
  const onDragEndTriggered = (result: any) => {
    console.log(result);
  };
  const [sections, setSections] = useState(getItems(3));
  return (
    <DragDropContext onDragEnd={onDragEndTriggered}>
      {/* droppable area */}
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping
        isCombineEnabled
      >
        {(provided) => (
          // container div
          <div
            style={{ display: 'inline-flex' }}
            ref={provided.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
          >
            {sections.map(({ title, color, id }) => {
              return (
                // column
                <DraggableColumn
                  title={title}
                  index={id}
                  key={id}
                  color={color}
                  isCombineEnabled={false}
                  useClone={false}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default KanbanBoard;
