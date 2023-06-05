import React, { useState } from 'react';
import HeaderSubComp from '../HeaderSubComp';
import { useSelector } from 'react-redux';

const SubAccordion = ({ status, data, provided, index }) => {
  const { workspace }: any = useSelector((state) => state);
  let { color } = workspace;
  const [expanded, setExpanded] = useState(index === 0 ? true : false);
  const [expandedChild, setExpandedChild] = useState(
    Array(data.childs.length).fill(false)
  );
  const [selected, setSelected] = useState(index === 0 ? false : true);
  const toggleSubAccordion = () => {
    setExpanded(!expanded);
    setSelected(!selected);
  };
  const toggleSubAccordionChild = (index) => {
    const updatedExpandedChild = [...expandedChild];
    updatedExpandedChild[index] = !updatedExpandedChild[index];
    setExpandedChild(updatedExpandedChild);
  };
  return (
    <div
      className={`subAccordionParent`}
      style={{ border: selected ? '' : `0.8px solid ${color}` }}
    >
      <div className="headerSubComponentContainer">
        <HeaderSubComp
          index={index}
          childIndex={null}
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
