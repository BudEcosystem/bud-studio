import React from 'react';
import NewTaskPanel from './NewTaskPanel';

const AppModeHeader = () => {
  return (
    <>
      <div className="mgLeft" style={{marginBottom: "20px"}}>
        <div
          style={{
            backgroundColor: 'var(--primary-bgc-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          //   className={`kabuni`}
        >
          <div className="kabuni" style={{marginLeft:"10px"}}>
            <div
              className="kabuniLogoAppMode"
              style={{
                background: `#939AFF`,
              }}
            >
              <span className={`tickAppMode`}>L</span>
              <span className={`tickAppMode`}>L</span>
              <span className={`tickAppMode`}>L</span>
            </div>
            <p
              className="kabuniTextAppMode"
              id="editableTitle"
              style={{
                border: 'none',
                outline: 'none',
              }}
              contentEditable={true}
              //   onKeyDown={keyHandler}
            >
              Kabuni
              {/* {currentFileName} */}
            </p>
          </div>
          <div style={{marginRight: "4px"}}>
          <NewTaskPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppModeHeader;
