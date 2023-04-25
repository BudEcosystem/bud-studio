import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Panel from './Panel/Panel'


const OmniSearch = () => {
  const [themeColor, setThemeColor] = useState("aqua");
  return (
    <div className='OmniSearch'>
      <SearchBar themeColor={themeColor} />
      <Panel/>
    </div>
  )
};

export default OmniSearch