import React from 'react';
import './Spaces.css';
import { Drag, SearchIcon, SearchShortCut } from '../MoveToIcons';
import { OtherSpaces } from './OtherSpaces';
const Spaces = () => {
  return (
    <div className="spacesContainer">
      <div className="spaceNameContainer">
        <Drag />
        <div className="spaceColor"></div>
        <p className="spaceText">Davincismen</p>
      </div>
      <div className="moveToSearchBar" style={{ marginTop: '20px', border: '1px solid #1D1D1D'}}>
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
        <OtherSpaces text="Accubits" color="#36D95A" />
        <OtherSpaces text="Bud Studio" color="#FFD966" />
        <OtherSpaces text="Private" color="#343434" />
      </div>
    </div>
  );
};

export default Spaces;
