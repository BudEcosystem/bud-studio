import React, { useState } from 'react';
import './Accordion.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { Arrow } from 'components/ListView/ListViewIcons';
import SubAccordion from './SubAccordion';

const Accordion = () => {
  const panelArray = useSelector((state) => state.list.panelArray);
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleAccordion = (index) => {
    const updatedItems = [...expandedItems];
    if (updatedItems.includes(index)) {
      // Item is already expanded, so remove it from the array
      updatedItems.splice(updatedItems.indexOf(index), 1);
    } else {
      // Item is collapsed, so add it to the array
      updatedItems.push(index);
    }
    setExpandedItems(updatedItems);
  };
  const onDragEnd = (result) => {
   console.log("drag")
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="accordionParent">
      {panelArray?.map((item, i) => (
        <Droppable droppableId={`droppable${i}`} key={i}>
          {(provided, snapshot) => (
            <div
              className="statusParent"
              key={i}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="titleContainerParent">
                <div className="arrowAndTitleContainer">
                  <div
                    className="arrowContainer"
                    onClick={() => toggleAccordion(i)}
                  >
                    <Arrow />
                  </div>
                  <div className="titleContainer">
                    <div
                      className="textIcon"
                      style={{ background: item.colorIcon }}
                    />
                    <p style={{ marginLeft: '8px' }}>{item.headerText}</p>
                  </div>
                </div>
                {expandedItems.includes(i) && (
                  <div className="subAccordionContainer">
                    {item.items.map((subItems, j) => (
                      <Draggable
                        key={j}
                        draggableId={`draggable${i}${j}`}
                        index={j}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SubAccordion data={subItems} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  </DragDropContext>
  );
};

export default Accordion;
