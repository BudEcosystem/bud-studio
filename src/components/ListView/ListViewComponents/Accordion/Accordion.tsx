import React, { useEffect, useState, useLayoutEffect } from 'react';
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
import {
  createTableDocument,
  updateDocumentStatusByStatusAndID,
} from '@/redux/slices/workspace';
import {
  attachDocumentToDatabase,
  sortEntryByArray,
} from '@/redux/slices/database';
import HeaderSubCompInput from '../HeaderSubCompInput';
import SubAccordion from './SubAccordion';

function Accordion({ isAppMode, title, databaseData, databaseEntries }: any) {
  const dispatch = useDispatch();

  const { panelArray, newTaskClicked, expandedItems, selectedItemIndex } =
    useSelector((state) => state.list);

  // const [expandedItems, setExpandedItems] = useState([0]);
  // const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { workspace, database }: any = useSelector((state) => state);
  const { color, currentSelectedDocId, workSpaceDocs } = workspace;

  // Local States
  const [statusPanels, setStatusPanels] = useState(null);
  console.log(workspace, 'lkjlkj', database);

  // On List View Load
  // useEffect(() => {
  //   // Get Database entries
  //   const sortedContent = [];
  //   databaseData.entries.map((item) => {
  //     const document = workspace.workSpaceDocs.filter(
  //       (obj) => obj.uuid === item.documentID
  //     );
  //     sortedContent.push(document[0]);
  //   });
  //
  //   const data: any[] = [];
  //   databaseData.propertyPresets.status.options.map((item: any) => {
  //     const entries = [];
  //     // Optimize The Code
  //     sortedContent.forEach((entry: any) => {
  //       entry.properties.forEach((property: any) => {
  //         if (property.title === 'Status') {
  //           if (property.value === item.title) {
  //             entries.push({
  //               title: entry.name,
  //               description: '',
  //               childs: [],
  //             });
  //           }
  //         }
  //       });
  //     });
  //
  //     data.push({
  //       status: item.title,
  //       headerText: item.title,
  //       colorIcon: item.color,
  //       items: entries,
  //     });
  //   });
  //
  //   setStatusPanels(data);
  // }, [databaseData]);

  // Local States
  // const [statusPanels, setStatusPanels] = useState(null);

  // On List View Load
  useLayoutEffect(() => {
    // Get Database entries
    const sortedContent = [];
    databaseData.entries.map((item) => {
      const document = workspace.workSpaceDocs.filter(
        (obj) => obj.uuid === item.documentID
      );
      sortedContent.push(document[0]);
    });

    const data: any[] = [];
    databaseData.propertyPresets.status.options.map((item: any) => {
      const entries = [];
      // Optimize The Code
      sortedContent.forEach((entry: any) => {
        entry.properties.forEach((property: any) => {
          if (property.title === 'Status') {
            if (property.value === item.key) {
              entries.push({
                title: entry.name,
                description: item.description,
                childs: [],
                entry,
              });
            }
          }
        });
      });

      data.push({
        status: item.title,
        headerText: item.title,
        colorIcon: item.color,
        items: entries,
      });
    });

    setStatusPanels(data);
  }, [databaseData, databaseEntries]);

  const toggleAccordion = (index) => {
    const updatedItems = [...expandedItems];
    if (updatedItems.includes(index)) {
      updatedItems.splice(updatedItems.indexOf(index), 1);
    } else {
      updatedItems.push(index);
    }
    setExpandedItems(updatedItems);
    dispatch(setExpandedItems(index));
  };

  const selectItem = (index) => {
    setSelectedItemIndex(index);
    dispatch(setSelectedItemIndex(index));
  };

  const onDragEnd = (result) => {
    console.log('Drag End', result);
    console.log('sortedContent', statusPanels);
    // dispatch(updatePosition(result));

    // Check if source and destination are not same
    if (result.destination.droppableId === result.source.droppableId) {
      const item = statusPanels.find(
        (item) => item.headerText === result.destination.droppableId
      );
      const [reorderedItem] = item.items.splice(result.source.index, 1);
      item.items.splice(result.destination.index, 0, reorderedItem);
      // setStatusPanels([...statusPanels]);
    }

    // Check if Destinations are different
    if (result.destination.droppableId !== result.source.droppableId) {
      const sourceItem = statusPanels.find(
        (item) => item.headerText === result.source.droppableId
      );
      const destinationItem = statusPanels.find(
        (item) => item.headerText === result.destination.droppableId
      );
      const [reorderedItem] = sourceItem.items.splice(result.source.index, 1);
      destinationItem.items.splice(result.destination.index, 0, reorderedItem);

      console.log('Source Item', sourceItem);
      console.log(
        'Destination Item',
        destinationItem.items[result.destination.index]
      );

      // Dispatch The Status Change
      const payload = {
        status: result.destination.droppableId,
        documentID: destinationItem.items[result.destination.index].entry.uuid,
      };

      dispatch(updateDocumentStatusByStatusAndID(payload));
      //setStatusPanels([...statusPanels]);
    }

    // get each entry from setStatusPanels and push to an array in order
    // const sortedContent = [];
    // const entryOrder: string[] = [];
    //
    // console.log('Database Entries', databaseData);
    //
    // statusPanels.forEach((item) => {
    //   console.log('Item', item);
    //   item.items.forEach((entry) => {
    //     sortedContent.push(entry.entry);
    //     entryOrder.push(entry.entry.uuid);
    //   });
    // });

    // Sort the database entries
    // dispatch(sortEntryByArray({ entryOrder, databaseID: databaseData.id }));
  };

  const newDocument = async (item) => {
    // console.log('New Doc Requested', item, databaseData);
    const initialDocumentID = uuidv4();

    const workspaceDetails = workSpaceDocs.filter(
      (doc: any) => doc.uuid === currentSelectedDocId
    )[0];

    // console.log('Current Workspace', workspaceDetails);

    // Get Current Workspace Info

    // Document Meta
    const documentMeta = {
      name: 'Untitled',
      childOf: null,
      workSPaceId: workspaceDetails.workSPaceId,
      type: 'doc',
      uuid: initialDocumentID,
      workSpaceUUID: workspaceDetails.workSpaceUUID,
      customProperties: [], // User defined Properties
      properties: [
        // Copy From Database
        {
          title: 'Tags',
          value: ['no-tag'],
          type: 'tags',
          id: '',
          order: 1,
        },
        {
          title: 'Priority',
          value: 'Normal',
          type: 'priority',
          id: '',
          order: 2,
        },
        {
          title: 'Status',
          value: item.headerText.toLowerCase().replaceAll(' ', '_'),
          type: 'status',
          id: '',
          order: 3,
        },
        {
          title: 'Date',
          value: null,
          type: 'date',
          id: '3717e4c0-6b5e-40f2-abfc-bfa4f22gcdc4',
          order: 6,
        },
      ],
      checkList: [

      ],
    };

    // Create Document With Status
    const docTemplate = generateListTemplate();
    // Add Database Entry

    // Dispatch Create Event For Doc
    await dispatch(
      createTableDocument({
        documentMeta,
        initialDocumentID,
        docTemplate,
        databaseData,
      })
    );

    // Attach Document
    await dispatch(
      attachDocumentToDatabase({ databaseData, initialDocumentID })
    );
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
        {statusPanels &&
          statusPanels?.map((item, i) => (
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
                            style={{ background: item.colorIcon }}
                          />
                          <p
                            className="textHeader"
                            style={{ marginLeft: '8px' }}
                          >
                            {item.headerText}
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
                                  <>
                                    {console.log(
                                      item,
                                      subItems,
                                      databaseEntries,
                                      databaseData,
                                      statusPanels,
                                      'uioui'
                                    )}
                                    <SubAccordion
                                      status={item.status}
                                      data={subItems}
                                      provided={provided}
                                      index={j}
                                      title={title}
                                      item={item}
                                      databaseEntries={databaseData.entries}
                                      statusPanels={statusPanels}
                                    />
                                  </>
                                </motion.div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {/* <Draggable key={10} draggableId="draggable33" index={10}> */}
                        {/*  {(provided, snapshot) => ( */}
                        {/*    <div */}
                        {/*      ref={provided.innerRef} */}
                        {/*      {...provided.draggableProps} */}
                        {/*    > */}
                        {/*      {newTaskClicked && i === selectedItemIndex && ( */}
                        {/*        <div className="subAccordionParent"> */}
                        {/*          <HeaderSubCompInput */}
                        {/*            provided={provided} */}
                        {/*            selectedItem={selectedItemIndex} */}
                        {/*          /> */}
                        {/*        </div> */}
                        {/*      )} */}
                        {/*    </div> */}
                        {/*  )} */}
                        {/* </Draggable> */}
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
