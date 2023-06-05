import React, { useState } from 'react';
import './ListView.css';

import Accordion from './ListViewComponents/Accordion/Accordion';
import HeaderSection from './HeaderSection';

function ListView({ contentRef, workspaceObj }: any) {
  const [isAppMode, setIsAppMode] = useState(false);

  return (
    <>
      {/* <div className="listViewContainer" ref={kabuniRef}>
        {!isAppMode ? (
          <>
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
                      background: `${color}`,
                    }}
                  >
                    
                    <span className={`tick ${isSticky ? 'tickStick' : ''}`}>
                      L
                    </span>
                    <span className={`tick ${isSticky ? 'tickStick' : ''}`}>
                      L
                    </span>
                    <span className={`tick ${isSticky ? 'tickStick' : ''}`}>
                      L
                    </span>
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
          </>
        ) : (
          <AppModeHeader />
        )}
      </div>
      {!isAppMode && (
        <div className="curveContainer">
          <div className="borderCurveLine" />
        </div>
      )} */}
      <HeaderSection view="list" />
      <div className="mainListComponentContainer">
        {/* <MainListComponent /> */}
        <Accordion isAppMode={isAppMode} />
      </div>
    </>
  );
}

export default ListView;
