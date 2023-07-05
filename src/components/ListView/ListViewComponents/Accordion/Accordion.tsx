import React, { useState } from 'react';
import './Accordion.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Arrow, DownArrow, FourDots } from 'components/ListView/ListViewIcons';
import {
  setExpandedItems,
  setSelectedItemIndex,
  updatePosition,
} from 'redux/slices/list';
import SubAccordion from './SubAccordion';
import HeaderSubCompInput from '../HeaderSubCompInput';
const dummmyArray = [
  {
    status: 'todo',
    headerText: 'To-do',
    colorIcon: '#939AFF',
    items: [
      // {
      //   title: 'Check for meetings 1',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 2,
      //   checklist: {
      //     checked: 2,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [
      //     {
      //       title: 'Check for sub-meetings 1',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //     {
      //       title: 'Check for sub-meetings 2',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //   ],
      // },
      // {
      //   title: 'Check for meetings 2',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 1,
      //   checklist: {
      //     checked: 4,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
      // {
      //   title: 'Check for meetings 3',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 3,
      //   checklist: {
      //     checked: 3,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
    ],
  },
  {
    status: 'inprogress',
    headerText: 'In-progress',
    colorIcon: '#FFD976',
    items: [
      // {
      //   title: 'In progress meetings 1',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 2,
      //   checklist: {
      //     checked: 2,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [
      //     {
      //       title: 'In progress sub-meetings 1',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //     {
      //       title: 'In progress sub-meetings 2',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //   ],
      // },
      // {
      //   title: 'In progress meetings 2',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 1,
      //   checklist: {
      //     checked: 4,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
      // {
      //   title: 'In progress meetings 3',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 3,
      //   checklist: {
      //     checked: 3,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
    ],
  },
  {
    status: 'inreview',
    headerText: 'In-review',
    colorIcon: '#4184E9',
    items: [
      // {
      //   title: 'In-review meetings 1',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 2,
      //   checklist: {
      //     checked: 2,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [
      //     {
      //       title: 'In-review sub-meetings 1',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //     {
      //       title: 'In-review sub-meetings 2',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //   ],
      // },
      // {
      //   title: 'In-review meetings 2',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 1,
      //   checklist: {
      //     checked: 4,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
      // {
      //   title: 'In-review meetings 3',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 3,
      //   checklist: {
      //     checked: 3,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
    ],
  },
  {
    status: 'completed',
    headerText: 'Completed',
    colorIcon: '#36D95A',
    items: [
      // {
      //   title: 'Completed meetings 1',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 2,
      //   checklist: {
      //     checked: 2,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [
      //     {
      //       title: 'Completed sub-meetings 1',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //     {
      //       title: 'Completed sub-meetings 2',
      //       description: '',
      //       siconValue: 2,
      //       checklist: {
      //         checked: 2,
      //         total: 6,
      //       },
      //       imagesData: ['', ''],
      //       page: true,
      //       flag: true,
      //       recurring: true,
      //     },
      //   ],
      // },
      // {
      //   title: 'Completed meetings 2',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 1,
      //   checklist: {
      //     checked: 4,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
      // {
      //   title: 'Completed meetings 3',
      //   description:
      //     'Make note of any appointments or meetings that you have scheduled for the day and ensure that you have the necessary information and materials.',
      //   siconValue: 3,
      //   checklist: {
      //     checked: 3,
      //     total: 6,
      //   },
      //   imagesData: ['', ''],
      //   page: true,
      //   flag: true,
      //   recurring: true,
      //   childs: [],
      // },
    ],
  },
];

function Accordion({ isAppMode, title }) {
  const dispatch = useDispatch();
  // const [newTaskClicked, setNewTaskClicked] = useState(false)
  const { 
    // panelArray, 
    newTaskClicked, 
    // expandedItems, 
    // selectedItemIndex 
  } =
    useSelector((state) => state.list);
  const [expandedItems, setExpandedItems] = useState([0]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { workspace, database }: any = useSelector((state) => state);
  const {databases} = database

  const { color } = workspace;
  console.log(database)

  const [panelArray, setPanelArray] = useState(databases[2].propertyPresets.status.options)

  const toggleAccordion = (index) => {
    const updatedItems = [...expandedItems];
    if (updatedItems.includes(index)) {
      updatedItems.splice(updatedItems.indexOf(index), 1);
    } else {
      updatedItems.push(index);
    }
    setExpandedItems(updatedItems)
    // dispatch(setExpandedItems(index));
  };

  const selectItem = (index) => {
    setSelectedItemIndex(index)
    // dispatch(setSelectedItemIndex(index));
  };

  const onDragEnd = (result) => {
    const mapping = { todo: 0, inprogress: 1, inreview: 2, completed: 3 };
      const { source, destination, draggableId } = result
      if (destination === undefined || destination === null) return null;
      if (
        source.droppableId === destination.droppableId &&
        destination.index === source.index
      )
        return null;

      const start = panelArray[mapping[source.droppableId]];
      const end = panelArray[mapping[destination.droppableId]];
      const draggedItem = start.items[source.index];
      start.items.splice(source.index, 1);
      end.items.splice(destination.index, 0, draggedItem);

      const expandedItemsNew = [...expandedItems];
      if (!expandedItemsNew.includes(mapping[source.droppableId])) {
        expandedItemsNew.push(mapping[source.droppableId]);
      }
      if (!expandedItemsNew.includes(mapping[destination.droppableId])) {
        expandedItemsNew.push(mapping[destination.droppableId]);
      }
      setExpandedItems(expandedItemsNew)
      // state.expandedItems = expandedItems;
    //   const updatedPanelArray = [...panelArray];
    //   state.panelArray = updatedPanelArray;
    // dispatch(updatePosition(result));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="accordionParent"
        style={{
          width: `${isAppMode ? '100%' : ''}`,
          marginLeft: `${isAppMode ? '32px' : ''}`,
        }}
      >
        {panelArray?.map((item, i) => (
          <Droppable droppableId={item.title} key={i}>
            {(provided, snapshot) => (
              <div
                className="statusParent"
                key={i}
                {...provided.droppableProps}
                ref={provided.innerRef}
                onClick={() => selectItem(i)}
                // style={{
                //   border:
                //     selectedItemIndex === i
                //       ? `0.5px dashed ${color}`
                //       : `0.5px dashed #2F2F2F`,
                // }}
              >
                <div className="titleContainerParent">
                  <div className="arrowAndTitleContainer">
                    <div className="flex">
                      <div
                        className="arrowContainer"
                        onClick={() => toggleAccordion(i)}
                        style={{
                          transform: expandedItems?.includes(i)
                            ? ''
                            : 'rotate(-90deg)',
                        }}
                      >
                        <Arrow />
                      </div>
                      <div className="titleContainer">
                        <div
                          className="textIcon"
                          style={{ background: item.color }}
                        />
                        <p className="textHeader" style={{ marginLeft: '8px' }}>
                          {item.title}
                        </p>
                      </div>
                    </div>
                    {expandedItems?.includes(i) && (
                      <div className="newTaskText2">
                        New Task <span style={{ color: '#8A8B8B' }}>+</span>
                      </div>
                    )}
                  </div>
                  {expandedItems?.includes(i) && ( 
                    <div className="subAccordionContainer">
                      {item.items?.map((subItems, j) => (
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
                                status={item.title}
                                data={subItems}
                                provided={provided}
                                index={j}
                                title={title}
                              />
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
