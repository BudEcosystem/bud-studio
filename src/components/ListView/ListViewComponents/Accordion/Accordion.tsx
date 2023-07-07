import React, { useEffect, useState } from 'react';
import './Accordion.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Arrow, DownArrow, FourDots } from 'components/ListView/ListViewIcons';
import {
  setExpandedItems,
  setSelectedItemIndex,
  updatePosition,
} from 'redux/slices/list';
import { motion } from 'framer-motion';
import { generateListTemplate } from 'utils/dataTemplates';
import { v4 as uuidv4 } from 'uuid';
import { createTableDocument } from '@/redux/slices/workspace';
import HeaderSubCompInput from '../HeaderSubCompInput';
import SubAccordion from './SubAccordion';

function Accordion({ isAppMode, title, databaseData, databaseEntries }: any) {
  const dispatch = useDispatch();

  const { 
    panelArray, 
    newTaskClicked, 
    expandedItems, 
    selectedItemIndex 
  } =
    useSelector((state) => state.list);

  // const [expandedItems, setExpandedItems] = useState([0]);
  // const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;


  // Local States
  const [statusPanels, setStatusPanels] = useState(null);

  // On List View Load
  useEffect(() => {
    // List View Load
    console.log('panelArray', panelArray);
    console.log('Data From Store', databaseData);
    console.log('Data From Entries', databaseEntries);

    const data: any[] = [];
    databaseData.propertyPresets.status.options.map((item: any) => {
      console.log('item', item);

      const entries = [];

      // Optimize The Code
      databaseEntries.databaseEntries.forEach((entry: any) => {
        entry.properties.forEach((property: any) => {
          if (property.title === 'Status') {
            console.log('===Entry', property);
            console.log('===Item', item);
            console.log('===Doc', entry);
            if (property.value === item.title) {
              entries.push({
                title: entry.name,
                description: 'test',
                childs: [],
              });
            }
          }
        });

        // console.log("Status",entry.status);
        // console.log("Status",item.title);

        // if (entry.status === item.title) {
        //   entries.push({
        //     title: item.title,
        //   });
        // }
      });

      data.push({
        status: item.title,
        headerText: item.title,
        colorIcon: item.color,
        items: entries,
      });
    });

    console.log('Final data', data);

    setStatusPanels(data);
  }, [databaseData]);

  // Local States
  const [statusPanels, setStatusPanels] = useState(null);

  // On List View Load
  useEffect(() => {
    // List View Load
    console.log('panelArray', panelArray);
    console.log('Data From Store', databaseData);
    console.log('Data From Entries', databaseEntries);

    const data: any[] = [];
    databaseData.propertyPresets.status.options.map((item: any) => {
      console.log('item', item);

      const entries = [];

      // Optimize The Code
      databaseEntries.databaseEntries.forEach((entry: any) => {
        entry.properties.forEach((property: any) => {
          if (property.title === 'Status') {
            console.log('===Entry', property);
            console.log('===Item', item);
            console.log('===Doc', entry);
            if (property.value === item.title) {
              entries.push({
                title: entry.name,
                description: 'test',
                childs: [],
              });
            }
          }
        });

        // console.log("Status",entry.status);
        // console.log("Status",item.title);

        // if (entry.status === item.title) {
        //   entries.push({
        //     title: item.title,
        //   });
        // }
      });

      data.push({
        status: item.title,
        headerText: item.title,
        colorIcon: item.color,
        items: entries,
      });
    });

    console.log('Final data', data);

    setStatusPanels(data);
  }, [databaseData]);

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
    dispatch(updatePosition(result));
  };

  const newDocument = (item) => {
    console.log('New Doc Requested', item, databaseData);
    const initialDocumentID = uuidv4();

    // Get Current Workspace Info

    // Document Meta
    const documentMeta = {};

    // Create Document With Status
    const docTemplate = generateListTemplate();
    // Add Database Entry

    // Dispatch Create Event For Doc
    dispatch(createTableDocument({ initialDocumentID, docTemplate }));
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
        {statusPanels?.map((item, i) => (
          <Droppable droppableId={item.status} key={i}>
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
                      <div
                        className="newTaskText2"
                        onClick={(e) => newDocument(item)}
                      >
                        New Task <span style={{ color: '#8A8B8B' }}>+</span>
                      </div>
                    )}
                  </div>
                  {expandedItems?.includes(i) && ( 
                    <div className="subAccordionContainer">
                      {item.items.length === 0 && (
                        <div className="empty-list">
                          Add a task or drag here.
                        </div>
                      )}
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
                              <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                                variants={{
                                  visible: { opacity: 1, scale: 1 },
                                  hidden: { opacity: 0, scale: 0.5 },
                                }}
                              >
                                <SubAccordion
                                  status={item.status}
                                  data={subItems}
                                  provided={provided}
                                  index={j}
                                  title={title}
                                />
                              </motion.div>
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
