import React, { useState } from 'react';
import './Accordion.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Arrow, DownArrow, FourDots } from 'components/ListView/ListViewIcons';
import SubAccordion from './SubAccordion';
import HeaderSubCompInput from '../HeaderSubCompInput';
import { updatePosition } from 'redux/slices/list';

const Accordion = () => {
  const dispatch = useDispatch()
  const { panelArray, newTaskClicked } = useSelector((state) => state.list);
  const [expandedItems, setExpandedItems] = useState([0]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { workspace }: any = useSelector((state) => state);
  let { color } = workspace;

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
    dispatch(updatePosition(result))
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="accordionParent">
        {panelArray?.map((item, i) => (
          <Droppable droppableId={item.status} key={i}>
            {(provided, snapshot) => (
              <div
                className="statusParent"
                key={i}
                {...provided.droppableProps}
                ref={provided.innerRef}
                onClick={() => selectItem(i)}
                style={{
                  border:
                    selectedItemIndex === i
                      ? `0.5px dashed ${color}`
                      : `0.5px dashed #2F2F2F`,
                }}
              >
                <div className="titleContainerParent">
                  <div className="arrowAndTitleContainer">
                    <div
                      className="arrowContainer"
                      onClick={() => toggleAccordion(i)}
                      style={{
                        transform: expandedItems.includes(i)
                          ? ''
                          : 'rotate(-90deg)',
                      }}
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
                            >
                              <SubAccordion
                                status={item.status}
                                data={subItems}
                                provided={provided}
                                index={j}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      <Draggable
                        key={10}
                        draggableId={`draggable33`}
                        index={10}
                      >
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
