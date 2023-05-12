/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ChildELement from './innerChild';

function InnerChildList(props: any) {
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
      {childComp?.map((child: any, index: any) => (
        <Draggable key={child.id} draggableId={`${child.id}`} index={index}>
          {(dragProvided, dragSnapshot) => {
            console.log('dragSnapshot', dragSnapshot);
            return (
              <div
                {...dragProvided.draggableProps}
                ref={dragProvided.innerRef}
                style={style}
                key={child.id}
                data-isDragging={dragSnapshot.isDragging}
                data-isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                data-provided={dragProvided}
              >
                <ChildELement />
              </div>
            );
          }}
        </Draggable>
      ))}
    </div>
  );
}

export default InnerChildList;
