import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
const InnerChildList = React.memo(function InnerChildList(props: any) {
  const {
    childComp,
    isDragging,
    isGroupedOver,
    provided,
    style,
    isClone,
    index,
  } = props;
  // console.log('title listId child',child);
  return (
    <div>
      {childComp?.map((child:any, index:any) => (
        <Draggable key={child.id} draggableId={`${child.id}`} index={index}>
          {(dragProvided, dragSnapshot) => (
            <div
            ref={dragProvided.innerRef}
              style={{
                width: '90%',
                height: '100px',
                background: 'grey',
                margin: '10px',
              }}
              key={child.id}
              data-isDragging={dragSnapshot.isDragging}
              data-isGroupedOver = {Boolean(dragSnapshot.combineTargetFor)}
              data-provided = {dragProvided}
            >
              {' '}
              Hello there {index}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
});

export default InnerChildList;
