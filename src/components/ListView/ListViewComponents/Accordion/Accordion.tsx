import React, { useState } from 'react';
import './Accordion.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Arrow, DownArrow, FourDots } from 'components/ListView/ListViewIcons';
import { updatePosition } from 'redux/slices/list';
import SubAccordion from './SubAccordion';
import HeaderSubCompInput from '../HeaderSubCompInput';

function Accordion() {
  const panelArray = useSelector((state) => state.list.panelArray);
  const [expandedItems, setExpandedItems] = useState([]);
  const { list }: any = useSelector((state) => state);
  const { newTaskClicked } = list;
  const toggleAccordion = (index) => {
    const updatedItems = [...expandedItems];
    if (updatedItems.includes(index)) {
      updatedItems.splice(updatedItems.indexOf(index), 1);
    } else {
      updatedItems.push(index);
    }
    setExpandedItems(updatedItems);
  };

  const selectItem = (index) => {
    setSelectedItemIndex(index);
  };

  const onDragEnd = (result) => {
    console.log('drag');
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
                      <Draggable key={10} draggableId="draggable33" index={10}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {newTaskClicked && i === selectedItemIndex && (
                              <div className="subAccordionParent">
                                <HeaderSubCompInput
                                  provided={provided}
                                  selectedItem={selectedItemIndex}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
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
}

export default Accordion;
