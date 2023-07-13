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
}) => {
  console.log(todoId, 'asdkfjadshj');
  const { workspace }: any = useSelector((state) => state);
  const { workSpaceDocs } = workspace;
  const [todoArr, setTodoArr] = useState([]);
  // const solveRec = (structure, id) => {
  //   console.log({ ...structure }, id, 'rec1');
  //   if (!structure || structure.length === 0) {
  //     return null;
  //   }
  //   for (const item of structure) {
  //     console.log({ ...structure }, id, { ...item }, 'rec2');
  //     if (item.documentID === id) {
  //       console.log(structure, id, { ...item }, 'rec3');
  //       return item;
  //     }
  //     if (item.childs && item.childs.length > 0) {
  //       const foundInFolders = solveRec(item.childs, id);
  //       if (foundInFolders) {
  //         console.log(foundInFolders, 'rec4');
  //         return foundInFolders;
  //       }
  //     }
  //   }
  //   return null;
  // };
  // useEffect(() => {
  //   const x = solveRec(databaseEntries, todoId[0]?.entry.uuid);
  //   console.log(x, 'oopopo');
  //   const tempArr = [];
  //   x?.childs?.map((it, i) => {
  //     workSpaceDocs.map((doc, j) => {
  //       if (doc.uuid === it.documentID) {
  //         const obj = {
  //           childs: [],
  //           description: '',
  //           entry: doc,
  //           title: doc.name,
  //         };
  //         tempArr.push(obj);
  //       }
  //     });
  //   });
  //   setTodoArr(tempArr);
  // });
  // const subChildsHandler = (subItem) => {
  //   const x = solveRec(databaseEntries, subItem.entry.uuid);
  //   console.log(x, 'oopopo');
  //   const tempArr = [];
  //   x?.childs?.map((item, i) => {
  //     workSpaceDocs.map((doc, j) => {
  //       if (doc.uuid === item.documentID) {
  //         const obj = {
  //           childs: [],
  //           description: '',
  //           entry: doc,
  //           title: doc.name,
  //         };
  //         tempArr.push(obj);
  //       }
  //     });
  //   });
  //   setTodoArr(tempArr);
  //   return tempArr.length
  // };
  // useEffect(() => {
  //   if (todoArr.length !== 0) {
  //     // Call RecursiveHeaderComp again with the new todoArr
  //     // You might need to pass additional props as well
  //     // Make sure to define the appropriate exit condition to prevent infinite rendering
  //     return <RecursiveHeaderComp
  //           todoId={todoArr}
  //           provided={provided}
  //           expanded={expanded}
  //           item={item}
  //           title={title}
  //           status={status}
  //           toggleSubAccordion={toggleSubAccordion}
  //           showTaskViewModal={showTaskViewModal}
  //           setShowTaskViewModal={setShowTaskViewModal}
  //           databaseEntries={databaseEntries}
  //           descHeight={descHeight}
  //           statusPanels={statusPanels}
  //           activeHeaderSubComp={activeHeaderSubComp}
  //           setActiveHeaderSubComp={setActiveHeaderSubComp}
  //         />
  //   }
  // }, [todoArr]);
  return (
    <div>
      {todoId.length > 0 &&
        todoId?.map((subItem: any, i: any) => (
          <div style={{ marginBottom: '16px' }}>
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
            />
            {/* {todoArr.length > 0 && <RecursiveHeaderComp
            todoId={todoArr}
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
          />} */}
          </div>
        ))}
    </div>
  );
};

export default RecursiveHeaderComp;
