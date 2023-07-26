/* eslint-disable default-case */
import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import SubAccordion from './SubAccordion';

function AccordionDraggable({
  item,
  i,
  title,
  databaseData,
  statusPanels,
  filterRules,
  sortRules,
  workspaceDocsSearchKey,
}: any) {
  const [currentItems, setCurrentItem] = useState<any>(null);
  const [filterRulesWhereArray, setFilterRulesWhere] = useState([]);
  const [filterRulesOrArray, setFilterRulesOr] = useState([]);
  const [filterRulesAndArray, setFilterRulesAnd] = useState([]);
  useEffect(() => {
    // if (filterRules.length > 0) {
    const filterRulesWhere = filterRules.filter(
      (ruleData: any) => ruleData.condition === null
    );
    setFilterRulesWhere(filterRulesWhere);
    const filterRulesAnd = filterRules.filter(
      (ruleData: any) => ruleData.condition === 'and'
    );
    setFilterRulesAnd(filterRulesAnd);
    const filterRulesOr = filterRules.filter(
      (ruleData: any) => ruleData.condition === 'or'
    );
    setFilterRulesOr(filterRulesOr);
    // }
  }, [filterRules]);

  useEffect(() => {
    const filteredArray: any = [];
    if (filterRules.length > 0) {
      const copyOfCurrent: any = item;
      item?.items?.forEach((itemData: any, index: any) => {
        const whereFlagArray: any = [];
        const AndFlagArray: any = [];
        const orFlagArray: any = [];
        const { entry } = itemData;
        const data: any = {
          index,
          Name: itemData.title,
          Priority: entry?.properties.find(
            (propData: any) => propData.type === 'priority'
          ).value,
          Status: entry?.properties.find(
            (propData: any) => propData.type === 'status'
          ).value,
          User: '',
          ...itemData,
        };
        // setCurrentItem(item);
        filterRulesWhereArray.forEach((ruleData: any) => {
          const { op, key, query } = ruleData;

          if (query !== '' && query !== null) {
            switch (op) {
              case 'is':
                whereFlagArray.push(
                  data[`${key}`]?.toLowerCase() === `${query.toLowerCase()}`
                );
                break;
              case 'is_not':
                whereFlagArray.push(
                  data[`${key}`]?.toLowerCase() !== `${query.toLowerCase()}`
                );
                break;
              case 'contains':
                whereFlagArray.push(
                  data[`${key}`]
                    ?.toLowerCase()
                    .includes(`${query.toLowerCase()}`)
                );
                break;
              case 'does_not_contains':
                whereFlagArray.push(
                  !data[`${key}`]
                    ?.toLowerCase()
                    .includes(`${query.toLowerCase()}`)
                );
                break;
              case 'starts_with':
                whereFlagArray.push(
                  data[`${key}`]
                    ?.toLowerCase()
                    .startsWith(`${query.toLowerCase()}`)
                );
                break;
              case 'ends_with':
                whereFlagArray.push(
                  data[`${key}`]
                    ?.toLowerCase()
                    .endsWith(`${query.toLowerCase()}`)
                );
                break;
              case 'is_empty':
                whereFlagArray.push(
                  data[`${key}`] === '' || data[`${key}`] === null
                );
                break;
              case 'is_not_empty':
                whereFlagArray.push(
                  data[`${key}`] !== '' || data[`${key}`] !== null
                );
                break;
            }
          }
        });
        filterRulesAndArray.forEach((ruleData: any) => {
          const { op, key, query } = ruleData;
          if (query !== '' && query !== null) {
            switch (op) {
              case 'is':
                AndFlagArray.push(
                  data[`${key}`].toLowerCase() === `${query.toLowerCase()}`
                );
                break;
              case 'is_not':
                AndFlagArray.push(
                  data[`${key}`].toLowerCase() !== `${query.toLowerCase()}`
                );
                break;
              case 'contains':
                AndFlagArray.push(
                  data[`${key}`]
                    .toLowerCase()
                    .includes(`${query.toLowerCase()}`)
                );
                break;
              case 'does_not_contains':
                AndFlagArray.push(
                  !data[`${key}`]
                    .toLowerCase()
                    .includes(`${query.toLowerCase()}`)
                );
                break;
              case 'starts_with':
                AndFlagArray.push(
                  data[`${key}`]
                    .toLowerCase()
                    .startsWith(`${query.toLowerCase()}`)
                );
                break;
              case 'ends_with':
                AndFlagArray.push(
                  data[`${key}`]
                    .toLowerCase()
                    .endsWith(`${query.toLowerCase()}`)
                );
                break;
              case 'is_empty':
                AndFlagArray.push(
                  data[`${key}`] === '' || data[`${key}`] === null
                );
                break;
              case 'is_not_empty':
                AndFlagArray.push(
                  data[`${key}`] !== '' || data[`${key}`] !== null
                );
                break;
            }
          }
        });
        filterRulesOrArray.forEach((ruleData: any) => {
          const { op, key, query } = ruleData;
          if (query !== '' && query !== null) {
            switch (op) {
              case 'is':
                orFlagArray.push(
                  data[`${key}`].toLowerCase() === `${query.toLowerCase()}`
                );
                break;
              case 'is_not':
                orFlagArray.push(
                  data[`${key}`].toLowerCase() !== `${query.toLowerCase()}`
                );
                break;
              case 'contains':
                orFlagArray.push(
                  data[`${key}`]
                    .toLowerCase()
                    .includes(`${query.toLowerCase()}`)
                );
                break;
              case 'does_not_contains':
                orFlagArray.push(
                  !data[`${key}`]
                    .toLowerCase()
                    .includes(`${query.toLowerCase()}`)
                );
                break;
              case 'starts_with':
                orFlagArray.push(
                  data[`${key}`]
                    .toLowerCase()
                    .startsWith(`${query.toLowerCase()}`)
                );
                break;
              case 'ends_with':
                orFlagArray.push(
                  data[`${key}`]
                    .toLowerCase()
                    .endsWith(`${query.toLowerCase()}`)
                );
                break;
              case 'is_empty':
                orFlagArray.push(
                  data[`${key}`] === '' || data[`${key}`] === null
                );
                break;
              case 'is_not_empty':
                orFlagArray.push(
                  data[`${key}`] !== '' || data[`${key}`] !== null
                );
                break;
            }
          }
        });
        const andWhereArray = [];
        const OrArray = [];
        if (whereFlagArray.length > 0) {
          andWhereArray.push(
            whereFlagArray.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator || currentValue
            )
          );
        }
        if (AndFlagArray.length > 0) {
          andWhereArray.push(
            AndFlagArray.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator && currentValue
            )
          );
        }
        if (orFlagArray.length > 0) {
          OrArray.push(
            orFlagArray.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator || currentValue
            )
          );
        }
        const finalArray = [];
        if (andWhereArray.length > 0) {
          finalArray.push(
            andWhereArray.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator && currentValue
            )
          );
        }
        if (OrArray.length > 0) {
          finalArray.push(
            OrArray.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator || currentValue
            )
          );
        }
        let finalFlag = true;
        if (finalArray.length > 0) {
          finalFlag = finalArray.reduce(
            (accumulator: any, currentValue: any) => accumulator || currentValue
          );
        }
        if (finalFlag) {
          filteredArray.push(itemData);
        }
      });
      copyOfCurrent.items = filteredArray;
      setCurrentItem(copyOfCurrent);
    } else {
      setCurrentItem(item);
    }
  }, [
    currentItems,
    filterRulesAndArray,
    filterRulesOrArray,
    filterRulesWhereArray,
    item,
    filterRules,
  ]);

  useEffect(() => {
    // sort
    if (currentItems && currentItems.items) {
      const filteredArray: any = currentItems.items;
      if (sortRules.length > 0) {
        const priorityOrder: any = {
          High: 0,
          Medium: 1,
          Low: 3,
          Normal: 2,
        };
        const StatusOrder: any = {
          not_started: 0,
          in_progress: 1,
          in_review: 2,
          done: 3,
        };
        const { key, op } = sortRules[0];
        if (key === 'Name') {
          if (op === 'ASC') {
            filteredArray.sort((a: any, b: any) => {
              const nameA = a.title?.toLowerCase();
              const nameB = b.title?.toLowerCase();

              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
          }
          if (op === 'DSC') {
            filteredArray.sort((a: any, b: any) => {
              const nameA = a.title?.toLowerCase();
              const nameB = b.title?.toLowerCase();

              if (nameA > nameB) return -1;
              if (nameA < nameB) return 1;
              return 0;
            });
          }
        }
        if (key === 'Priority') {
          if (op === 'ASC') {
            filteredArray.sort((a: any, b: any) => {
              const priorityA = a.entry?.properties.find(
                (propData: any) => propData.type === 'priority'
              ).value;
              const priorityB = b.entry?.properties.find(
                (propData: any) => propData.type === 'priority'
              ).value;
              // Compare the priorities based on the custom order mapping
              const orderA = priorityOrder[priorityA];
              const orderB = priorityOrder[priorityB];
              // Subtract orderA from orderB to determine the correct sorting order
              return orderA - orderB;
            });
          }
          if (op === 'DSC') {
            filteredArray.sort((a: any, b: any) => {
              const priorityA = a.entry?.properties.find(
                (propData: any) => propData.type === 'priority'
              ).value;
              const priorityB = b.entry?.properties.find(
                (propData: any) => propData.type === 'priority'
              ).value;
              // Compare the priorities based on the custom order mapping
              const orderA = priorityOrder[priorityA];
              const orderB = priorityOrder[priorityB];
              // Subtract orderB from orderA to determine the correct sorting order
              return orderB - orderA;
            });
          }
        }
        if (key === 'Status') {
          if (op === 'ASC') {
            filteredArray.sort((a: any, b: any) => {
              const priorityA = a.entry?.properties.find(
                (propData: any) => propData.type === 'status'
              ).value;
              const priorityB = b.entry?.properties.find(
                (propData: any) => propData.type === 'status'
              ).value;
              // Compare the priorities based on the custom order mapping
              const orderA = StatusOrder[priorityA];
              const orderB = StatusOrder[priorityB];
              // Subtract orderA from orderB to determine the correct sorting order
              return orderA - orderB;
            });
          }
          if (op === 'DSC') {
            filteredArray.sort((a: any, b: any) => {
              const priorityA = a.entry?.properties.find(
                (propData: any) => propData.type === 'status'
              ).value;
              const priorityB = b.entry?.properties.find(
                (propData: any) => propData.type === 'status'
              ).value;
              // Compare the priorities based on the custom order mapping
              const orderA = StatusOrder[priorityA];
              const orderB = StatusOrder[priorityB];
              // Subtract orderB from orderA to determine the correct sorting order
              return orderB - orderA;
            });
          }
        }
        const copyOfCurrent: any = item;
        copyOfCurrent.items = filteredArray;
        setCurrentItem(copyOfCurrent);
      }
      // SetTaskArrayForRender(filteredArray);
    }
  }, [currentItems, sortRules]);
  useEffect(() => {
    if (currentItems) {
      const copyOfCurrentItems = currentItems;
      if (workspaceDocsSearchKey && workspaceDocsSearchKey.length > 0) {
        console.log('copyOfCurrentItems', copyOfCurrentItems);
        copyOfCurrentItems.items = copyOfCurrentItems?.items?.filter((data) =>
          data?.title?.toLowerCase().includes(workspaceDocsSearchKey)
        );
        console.log('copyOfCurrentItems', copyOfCurrentItems);
      }
    }
  }, [currentItems, workspaceDocsSearchKey]);
  return (
    <>
      {' '}
      {currentItems &&
        currentItems?.items?.map((subItems, j) => (
          <Draggable draggableId={`draggable${i}${j}`} index={j} key={j}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.draggableProps}>
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
                    status={subItems.entry.properties[2].value}
                    data={subItems}
                    provided={provided}
                    index={j}
                    title={title}
                    item={subItems}
                    databaseEntries={databaseData.entries}
                    statusPanels={statusPanels}
                    filterRules={filterRules}
                    sortRules={sortRules}
                  />
                </motion.div>
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
}
export default AccordionDraggable;
