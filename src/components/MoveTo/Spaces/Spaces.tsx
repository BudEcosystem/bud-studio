import React, { useEffect, useRef, useState } from 'react';
import './Spaces.css';
import { Drag, SearchIcon, SearchShortCut } from '../MoveToIcons';
import { OtherSpaces } from './OtherSpaces';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
const Spaces = ({ setIsSpacesVisible,currentWorkSpaceState, setCurrentWorkSpaceState }: any) => {
  const { workspace }: any = useSelector((state) => state);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const spacesRef = useRef(null);


  function useOutsideAlerter(ref: any) {

    useEffect(() => {
      function handleClickOutside(event: any) {
        console.log(event);
        console.log(ref);
           if (
          ref.current &&
          !ref.current.contains(event.target)
        ) {
          setIsSpacesVisible(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(spacesRef);


  useEffect(() => {
    const filtered = workspace.workSpaceItems.filter(
      (item) => item.uuid !== currentWorkSpaceState.uuid
    );
    setFilteredFiles(filtered);
  }, [currentWorkSpaceState, workspace.workspaceFiles]);
  console.log(filteredFiles);
  return (
    <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '260px',
          height: '90%',
          width: '85%',
          pointerEvents: 'none',
          zIndex: '100',
        }}
      >
    <Draggable bounds="parent" handle=".handle">
    <div className="spacesContainer" ref={spacesRef}>
      <div className="spaceNameContainer">
        <div className='handle'>
          <Drag />  
        </div>
        
        <div
          className="spaceColor"
          style={{ background: currentWorkSpaceState.color }}
        ></div>
        <p className="spaceText">{currentWorkSpaceState.name}</p>
      </div>
      <div
        className="moveToSearchBar"
        style={{ marginTop: '20px', border: '1px solid #1D1D1D' }}
      >
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
          className="spacesSearchInput"
          type="text"
          placeholder="Search"
          // onInput={filterNode}
          // ref={searchInputFieldRef}
          id="searchFlyout"
        />
        <SearchShortCut />
      </div>
      <div className="otherSpaces">
        {filteredFiles.map((item) => (
          <OtherSpaces
            text={item.name}
            color={item.color}
            item={item}
            setIsSpacesVisible={setIsSpacesVisible}
            currentWorkSpaceState={currentWorkSpaceState}
            setCurrentWorkSpaceState={setCurrentWorkSpaceState}
          />
        ))}
      </div>
    </div>
    </Draggable>
    </div>
  );
};

export default Spaces;
