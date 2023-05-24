import React, { useState } from 'react';
import HeaderSubComp from '../HeaderSubComp';

const SubAccordion = ({ status, data, provided, index }) => {
  const [expanded, setExpanded] = useState(index === 0 ? true : false);
  const [expandedChild, setExpandedChild] = useState(
    Array(data.childs.length).fill(false)
  );

  const toggleSubAccordion = () => {
    setExpanded(!expanded);
  };
  const toggleSubAccordionChild = (index) => {
    const updatedExpandedChild = [...expandedChild];
    updatedExpandedChild[index] = !updatedExpandedChild[index];
    setExpandedChild(updatedExpandedChild);
  };
  return (
    <div className="subAccordionParent">
      <div className="headerSubComponentContainer">
        <HeaderSubComp
          index={index}
          status={status}
          data={data}
          subChild={false}
          provided={provided}
          expanded={expanded}
          toggleSubAccordion={toggleSubAccordion}
        />
      </div>
      {expanded && (
        <div className="subChildComponent">
          <p className="description">{data?.description}</p>
          {data?.childs.length > 0 &&
            data.childs.map((subItem, i) => (
              <div style={{ marginBottom: '16px' }}>
                <HeaderSubComp
                  index={index}
                  childIndex={i}
                  status={status}
                  data={subItem}
                  subChild={true}
                  provided={provided}
                  expanded={expandedChild[i]}
                  toggleSubAccordion={() => toggleSubAccordionChild(i)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SubAccordion;
