import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentSelectedUI,
  setSelectedOption,
} from 'redux/slices/activestate';
import TaskView from 'components/TaskView/TaskView';

import { taskViewDataChange, taskViewTitleChange } from 'redux/slices/list';
import HeaderSubComp from '../HeaderSubComp';
import RecursiveHeaderComp from '../RecursiveHeaderComp';

function SubAccordion({
  status,
  data,
  provided,
  index,
  title,
  item,
  databaseEntries,
  statusPanels,
}: any) {
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const [expanded, setExpanded] = useState(index === 0);
  const [expandedChild, setExpandedChild] = useState(
    Array(data.childs.length).fill(false)
  );
  const [docsDictionary, setDocsDictionary] = useState(() => {
    return workspace.workSpaceDocs.reduce((acc, doc) => {
      acc[doc.uuid] = false;
      return acc;
    }, {});
  });
  console.log(docsDictionary, 'jkjkjkjkjk');
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
  const toggleSubAccordionChild2 = (childUUID) => {
    setDocsDictionary((prevState) => {
      const updatedState = { ...prevState };
      updatedState[childUUID] = !updatedState[childUUID];
      return updatedState;
    });
  };
  const [showTaskViewModal, setShowTaskViewModal] = useState(false);
  const [todoID, setToDoId] = useState([]);
  const [activeHeaderSubComp, setActiveHeaderSubComp] = useState(null);

  console.log('HHHHHH', databaseEntries, data);

  useEffect(() => {
    const TaskArray: any = [];
    databaseEntries.map((dbentry, i) => {
      if (dbentry.documentID === data.entry.uuid) {
        console.log(dbentry);
        dbentry?.childs?.map((child, j) => {
          workspace.workSpaceDocs.forEach((doc: any, i: any) => {
            if (doc.uuid == child.documentID) {
              const obj = {
                childs: [],
                description: '',
                entry: doc,
                title: doc.name,
              };
              TaskArray.push(obj);
            }
          });
        });
      }
    });
    setToDoId(TaskArray);
  }, [data, workspace]);

  const descriptionRef = useRef(null);
  const [descHeight, setDescHeight] = useState(null);
  useEffect(() => {
    if (descriptionRef.current) {
      setDescHeight(descriptionRef.current.offsetHeight);
    }
  }, [status]);

  console.log(todoID, 'asdfjhads');
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
      {/* <TaskView
        data={data}
        title={title}
        showTaskViewModal={showTaskViewModal}
        setShowTaskViewModal={setShowTaskViewModal}
        status={status}
        item={item}
        databaseEntries={databaseEntries}
        statusPanels={statusPanels}
      /> */}

      <div className="headerSubComponentContainer">
        <HeaderSubComp
          index={index}
          title={title}
          item={item}
          childIndex={null}
          status={status}
          data={data}
          subChild={false}
          provided={provided}
          expanded={expanded}
          toggleSubAccordion={toggleSubAccordion}
          showTaskViewModal={showTaskViewModal}
          setShowTaskViewModal={setShowTaskViewModal}
          databaseEntries={databaseEntries}
          statusPanels={statusPanels}
          activeHeaderSubComp={activeHeaderSubComp}
          setActiveHeaderSubComp={setActiveHeaderSubComp}
          toggleSubAccordionChild2={toggleSubAccordionChild2}
          docsDictionary={docsDictionary}
        />
      </div>
      {expanded && (
        <div className="subChildComponent">
          <p className="description" ref={descriptionRef}>
            <TextClippingComponent
              text={data.entry.description || ''}
              limit={100}
            />
          </p>
          <RecursiveHeaderComp
            todoId={todoID}
            provided={provided}
            expanded={expandedChild}
            item={item}
            title={title}
            status={status}
            toggleSubAccordion={toggleSubAccordionChild}
            showTaskViewModal={showTaskViewModal}
            setShowTaskViewModal={setShowTaskViewModal}
            databaseEntries={databaseEntries}
            descHeight={descHeight}
            statusPanels={statusPanels}
            activeHeaderSubComp={activeHeaderSubComp}
            setActiveHeaderSubComp={setActiveHeaderSubComp}
            removeLine={false}
            toggleSubAccordionChild2={toggleSubAccordionChild2}
            docsDictionary={docsDictionary}
          />
          {/* {todoID.length > 0 &&
            todoID?.map((subItem: any, i: any) => (
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
                  setShowTaskViewModal={setShowTaskViewModal}
                  databaseEntries={databaseEntries}
                  descHeight={descHeight}
                />
              </div>
            ))} */}
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
