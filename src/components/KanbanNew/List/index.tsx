/* eslint-disable react/jsx-props-no-spreading */
import { Droppable, Draggable } from 'react-beautiful-dnd';
import InnerChildList from './InnerChildList';
import { getListItems } from '../data/sampleData';

function KanbanColumnChildList({
  isDropDisabled,
  ignoreContainerClipping,
  internalScroll,
  scrollContainerStyle,
  isCombineEnabled,
  listId,
  listType = 'LIST',
  useClone,
}: any) {
  console.log('title listId', listId);
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          style={{
            overflow: 'scroll',
            height: '100%',
            backgroundColor: 'yellow',
          }}
          data-isDropDisabled={false}
          data-isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          data-isDraggingOver={dropSnapshot.isDraggingOver}
          {...dropProvided.droppableProps}
        >
          {/* drop zone */}
          <div ref={dropProvided.innerRef}>
            <InnerChildList
              childComp={getListItems(3)}
              provided={dropProvided}
            />
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
export default KanbanColumnChildList;
