import React, { useEffect, useState } from 'react';
import './Spaces.css';
import { Drag, SearchIcon, SearchShortCut } from '../MoveToIcons';
import { OtherSpaces } from './OtherSpaces';
import { useSelector } from 'react-redux';
const Spaces = ({ setIsSpacesVisible,currentWorkSpaceState, setCurrentWorkSpaceState }) => {
  const { workspace }: any = useSelector((state) => state);
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    const filtered = workspace.workSpaceItems.filter(
      (item) => item.uuid !== currentWorkSpaceState.uuid
    );
    setFilteredFiles(filtered);
  }, [currentWorkSpaceState, workspace.workspaceFiles]);
  console.log(filteredFiles);
  return (
    <div className="spacesContainer">
      <div className="spaceNameContainer">
        <Drag />
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
  );
};

export default Spaces;
