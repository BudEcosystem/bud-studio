import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentSelectedUI,
  setSelectedOption,
} from 'redux/slices/activestate';
import TaskView from 'components/TaskView/TaskView';

import { taskViewDataChange, taskViewTitleChange } from 'redux/slices/list';
import HeaderSubComp from '../HeaderSubComp';

function SubAccordion({ status, data, provided, index, title,item }: any) {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const [expanded, setExpanded] = useState(index === 0);
  const [expandedChild, setExpandedChild] = useState(
    Array(data.childs.length).fill(false)
  );
  const [selected, setSelected] = useState(index !== 0);
  const toggleSubAccordion = () => {
    setExpanded(!expanded);
    setSelected(!selected);
  };
  const toggleSubAccordionChild = (index: any) => {
    const updatedExpandedChild = [...expandedChild];
    updatedExpandedChild[index] = !updatedExpandedChild[index];
    setExpandedChild(updatedExpandedChild);
  };
  const [showTaskViewModal, setShowTaskViewModal] = useState(false);

  console.log("HHHHHH", data)

  return (
    <div
      className="subAccordionParent"
      style={{
        border: selected ? '' : `0.8px solid ${color}`,
        background: selected ? `#28272C` : '#1B1C1E',
        cursor: 'pointer',
      }}
      onDoubleClick={() => {
        setShowTaskViewModal(true);
      }}
    >
      <TaskView
        data={data}
        title={title}
        showTaskViewModal={showTaskViewModal}
        setShowTaskViewModal={setShowTaskViewModal}
        status={status}
        item={item}
      />

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
          setShowTaskViewModal={setShowTaskViewModal}
        />
      </div>
      {expanded && (
        <div className="subChildComponent">
          <p className="description">
            <TextClippingComponent text={data.entry.description || ''} limit={100} />
          </p>
          {data?.childs.length > 0 &&
            data.childs.map((subItem: any, i: any) => (
              <div style={{ marginBottom: '16px' }}>
                <HeaderSubComp
                  index={index}
                  childIndex={i}
                  status={status}
                  data={subItem}
                  subChild
                  provided={provided}
                  expanded={expandedChild[i]}
                  toggleSubAccordion={() => toggleSubAccordionChild(i)}
                  setShowTaskViewModal={setShowTaskViewModal}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

class TextClippingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clippedText: this.clipText(props.text, props.limit),
    };
  }

  clipText(text, limit) {
    if (text.length <= limit) {
      return text;
    }
    return `${text.slice(0, limit)}...`;
  }

  render() {
    return <span>{this.state.clippedText}</span>;
  }
}


export default SubAccordion;
