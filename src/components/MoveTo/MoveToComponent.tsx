import React from 'react';
import './MoveTo.css';
import { SearchIcon, SearchShortCut, SideArrow } from './MoveToIcons';

const MoveToComponent = () => {
  return (
    <div className="moveToContainer">
      <div className="moveToWrapper">
        <div className="movetoMainContainer">
          <p className="movetotext">Move to</p>
          <p className="movetobelowtext">Move Human Resources to:</p>
          <div className="folderBox">
            <div className="internalBox">
              <p className="spaceText">Space</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <p className="folderName">Davinci's Men</p>
                <SideArrow />
              </div>
              <div className="moveToSearchBar">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '17px',
                  }}
                >
                  <SearchIcon />
                </div>
                <input
                  className="movetoSearchInput"
                  type="text"
                  placeholder="Search Folders Here"
                  // onInput={filterNode}
                  // ref={searchInputFieldRef}
                  id="searchFlyout"
                />
                <SearchShortCut />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveToComponent;
