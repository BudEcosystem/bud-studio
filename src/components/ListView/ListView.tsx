import React from 'react';
import { AddCover } from './ListViewIcons';
import './ListView.css';
import OptionsComponent from './ListViewComponents/OptionsComponent';
import MainListComponent from './ListViewComponents/MainListComponent';

const ListView = () => {
  return (
    <>
      <div className="listViewContainer">
        <div className="addCoverContainer">
          <div className="flexCenter">
            <AddCover />
          </div>
          <p className="addCoverText">Add cover</p>
        </div>
        <div>
          <div className="kabuni">
            <div className="kabuniLogo">
              {/* <KabuniLogo /> */}

              <span className="tick">L</span>
              <span className="tick">L</span>
              <span className="tick">L</span>
            </div>
            <p className="kabuniText">Kabuni</p>
          </div>
          <p className="kabuniBottomText">
            Make note of any appointments or meetings.
          </p>
        </div>
        <div className="optionsComponentContainer">
          <OptionsComponent />
        </div>
      </div>
      <div className="curveContainer">
        <div className="borderCurveLine"></div>
      </div>
      <div className="mainListComponentContainer">
      <MainListComponent />
        
      </div>
    </>
  );
};

export default ListView;
