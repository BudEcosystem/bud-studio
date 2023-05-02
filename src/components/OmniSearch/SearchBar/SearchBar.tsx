import React from 'react';
import { SearchIcon } from './SearchIcon';

function SearchBar({ themeColor }) {
  return (
    <div
      className="SearchBarGradient"
      style={{
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${themeColor} 57.81%, rgba(175, 147, 218, 0.05) 100%)`,
      }}
    >
      <div className="SearchBar">
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}
        >
          <SearchIcon />
        </div>
        <input
          className="SearchBarInput"
          type="text"
          placeholder="Search for Actions, People, Instruments"
          autoFocus
        />
      </div>
    </div>
  );
}

export default SearchBar;
