import React, { useState } from 'react';
import './MoveTo.css';
import {
  DownArrow,
  SearchIcon,
  SearchShortCut,
  SideArrow,
  UpArrow,
} from './MoveToIcons';
import Directory from './Directory/Directory';
import Spaces from './Spaces/Spaces';
import { setIsMoveTo } from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';

const MoveToComponent = () => {
  const dispatch = useDispatch();
  const [isSpaceVisible, setIsSpacesVisible] = useState(false);
  return (
    <div className="moveToContainer">
      <div className="moveToWrapper">
        <div className="movetoMainContainer">
          <p className="movetotext">Move to</p>
          <p className="movetobelowtext">
            Move <span style={{ color: '#939AFF' }}>Human Resources</span> to:
          </p>
          <div className="folderBox">
            <div className="internalBox">
              <p className="spaceText">Space</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                  position: 'relative',
                }}
              >
                <p
                  className="folderName"
                  onClick={() => setIsSpacesVisible(!isSpaceVisible)}
                >
                  Davinci's Men
                </p>
                <div
                  style={{
                    transform: isSpaceVisible ? 'rotate(90deg)' : '',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <SideArrow />
                </div>
              </div>
              {isSpaceVisible && (
                <div
                  style={{
                    position: 'absolute',
                    marginTop: '6px',
                    marginLeft: '-5px',
                    zIndex: '10',
                  }}
                >
                  <Spaces />
                </div>
              )}

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
            <div className="foldersContainer">
              <Directory />
              <Directory />
              <Directory />
            </div>
          </div>
          <div className="buttonDiv">
            <div className="textContainer">
              <p>Use arrow keys</p>
              <div
                className="arrowContainer"
                style={{ marginLeft: '8px', transform: 'rotate(180deg)' }}
              >
                <UpArrow />
              </div>
              <div
                className="arrowContainer"
                style={{
                  marginLeft: '4px',
                  marginRight: '8px',
                  transform: 'rotate(180deg)',
                }}
              >
                <DownArrow />
              </div>
              <p>to navigate</p>
            </div>
            <div className="buttonContainer">
              <div
                className="cancelButton"
                onClick={() => dispatch(setIsMoveTo(false))}
              >
                Cancel
              </div>
              <div className="moveButton">Move</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveToComponent;
