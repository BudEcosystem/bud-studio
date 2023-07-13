import React from 'react';
import HeaderSubComp from './HeaderSubComp';

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
  console.log(todoId);
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
          </div>
        ))}
    </div>
  );
};

export default RecursiveHeaderComp;
