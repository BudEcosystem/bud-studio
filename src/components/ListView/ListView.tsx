import React, { useEffect, useRef, useState } from 'react';
import { AddCover } from './ListViewIcons';
import './ListView.css';
import OptionsComponent from './ListViewComponents/OptionsComponent';
import MainListComponent from './ListViewComponents/MainListComponent';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from './ListViewComponents/Accordion/Accordion';
import { editListTitle, editListDescription } from 'redux/slices/list';

function ListView({ contentRef, workspaceObj }: any) {
  const dispatch = useDispatch();
  const { content, list }: any = useSelector((state) => state);
  const { listTitleAndDesc } = list;
  const { title, description } = listTitleAndDesc;
  const kabuniRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [oneTime, setOneTime] = useState(true);
  const { tree, workspace }: any = useSelector((state) => state);
  const { color } = workspace;

  useEffect(() => {
    if(oneTime)
    dispatch(editListTitle({newTitle: workspaceObj.currentSelectedDocId}))
  }, [])

  const keyHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(editListTitle({ newTitle: event.target.innerText }));
      setOneTime(false)
      const heading = document.getElementById('editableTitle');
      heading?.blur();
    }
  };
  const keyHandler2 = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(editListDescription({ newDesc: event.target.innerText }));
      const heading = document.getElementById('editableDesc');
      heading?.blur();
    }
  };
  return (
    <>
      <div className="listViewContainer" ref={kabuniRef}>
        <div className="addCoverContainer">
          <div className="flexCenter">
            <AddCover />
          </div>
          <p className="addCoverText">Add cover</p>
        </div>
        <div className="mgLeft">
          <div
            style={{ backgroundColor: 'var(--primary-bgc-light)' }}
            className={`kabuni ${isSticky ? 'sticky' : ''}`}
          >
            <div className="kabuni" style={{}}>
              <div
                className="kabuniLogo"
                style={{
                  fontSize: isSticky ? '10px' : '',
                  width: isSticky ? '14px' : '',
                  height: isSticky ? '14px' : '',
                  background: `${color}`
                }}
              >
                <span className={`tick ${isSticky ? 'tickStick' : ''}`}>L</span>
                <span className={`tick ${isSticky ? 'tickStick' : ''}`}>L</span>
                <span className={`tick ${isSticky ? 'tickStick' : ''}`}>L</span>
              </div>
              <p
                className="kabuniText"
                id="editableTitle"
                style={{
                  fontSize: isSticky ? '18px' : '',
                  border: 'none',
                  outline: 'none',
                }}
                contentEditable={true}
                onKeyDown={keyHandler}
              >
                {title}
              </p>
            </div>
          </div>
          <p
            id="editableDesc"
            className="kabuniBottomText"
            contentEditable={true}
            style={{
              border: 'none',
              outline: 'none',
            }}
            onKeyDown={keyHandler2}
          >
            {description}
          </p>
        </div>
        <div className="optionsComponentContainer mgLeft">
          <OptionsComponent isSticky={isSticky} contentRef={contentRef} />
        </div>
      </div>
      <div className="curveContainer mgLeft">
        <div className="borderCurveLine" />
      </div>
      <div className="mainListComponentContainer mgLeft">
        {/* <MainListComponent /> */}
        <Accordion />
      </div>
    </>
  );
}

export default ListView;
