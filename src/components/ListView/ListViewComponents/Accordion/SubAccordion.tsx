import React, { useState } from 'react';
import HeaderSubComp from '../HeaderSubComp';

const SubAccordion = ({ data, provided }) => {
  const [expanded, setExpanded] = useState(false);
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
