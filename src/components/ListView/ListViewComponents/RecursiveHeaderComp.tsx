import React, { useEffect, useState } from 'react';
import HeaderSubComp from './HeaderSubComp';
import { useSelector } from 'react-redux';

const RecursiveHeaderComp = ({
  todoId,
  provided,
  item,
  expanded,
  title,
  status,
  toggleSubAccordion,
  showTaskViewModal,
  setShowTaskViewModal,
  databaseEntries,
  descHeight,
  statusPanels,
  activeHeaderSubComp,
  setActiveHeaderSubComp,
  removeLine,
  toggleSubAccordionChild2,
  docsDictionary,
}) => {
  console.log(todoId, 'asdkfjadshj');
  const { workspace }: any = useSelector((state) => state);
  const { workSpaceDocs } = workspace;
  const [todoArr, setTodoArr] = useState([]);
  useEffect(() => {
    const fetchTodoArr = (structure, id) => {
      if (!structure || structure.length === 0) {
        return [];
      }
      const tempArr = [];
      structure.forEach((item) => {
        if (item.documentID === id) {
          item.childs.forEach((child) => {
            workSpaceDocs.forEach((doc) => {
              if (doc.uuid === child.documentID) {
                const obj = {
                  childs: [],
                  description: '',
                  entry: doc,
                  title: doc.name,
                };
                tempArr.push(obj);
              }
            });
          });
        } else if (item.childs && item.childs.length > 0) {
          const foundInFolders = fetchTodoArr(item.childs, id);
          if (foundInFolders.length > 0) {
            tempArr.push(...foundInFolders);
          }
        }
      });
      return tempArr;
    };
    const tempArr2 = [];
    todoId.map((to, j) => {
      const updatedTodoArr = fetchTodoArr(databaseEntries, to?.entry.uuid);
      tempArr2.push(updatedTodoArr);
    });
    setTodoArr(tempArr2);
  }, [databaseEntries, todoId, workSpaceDocs]);

  console.log('todoARR', todoArr, todoId, docsDictionary);
  return (
    <div>
      {todoId.length > 0 &&
        todoId?.map((subItem: any, i: any) => (
          <div style={{ marginBottom: '0px' }}>
            <HeaderSubComp
              // index={index}
              childIndex={i}
              status={subItem.entry.properties[2].value}
              data={subItem}
              subChild={true}
              title={title}
              item={item}
              provided={provided}
              expanded={expanded[i]}
              toggleSubAccordion={() => toggleSubAccordion(i)}
              showTaskViewModal={showTaskViewModal}
              setShowTaskViewModal={setShowTaskViewModal}
              databaseEntries={databaseEntries}
              descHeight={descHeight}
              statusPanels={statusPanels}
              activeHeaderSubComp={activeHeaderSubComp}
              setActiveHeaderSubComp={setActiveHeaderSubComp}
              removeLine={removeLine}
              toggleSubAccordionChild2={toggleSubAccordionChild2}
              docsDictionary={docsDictionary}
            />
            {docsDictionary[subItem.entry.uuid] === true &&
              todoArr[i]?.length > 0 && (
                <div style={{ marginLeft: '25px', marginBottom: '10px' }}>
                  <RecursiveHeaderComp
                    todoId={todoArr[i]}
                    provided={provided}
                    expanded={expanded}
                    item={item}
                    title={title}
                    status={status}
                    toggleSubAccordion={toggleSubAccordion}
                    showTaskViewModal={showTaskViewModal}
                    setShowTaskViewModal={setShowTaskViewModal}
                    databaseEntries={databaseEntries}
                    descHeight={descHeight}
                    statusPanels={statusPanels}
                    activeHeaderSubComp={activeHeaderSubComp}
                    setActiveHeaderSubComp={setActiveHeaderSubComp}
                    removeLine={true}
                    toggleSubAccordionChild2={toggleSubAccordionChild2}
                    docsDictionary={docsDictionary}
                  />
                </div>
              )}
          </div>
        ))}
    </div>
  );
};

export default RecursiveHeaderComp;
