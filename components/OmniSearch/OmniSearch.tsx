import React from 'react';
import TopPanel from './omniComponent/TopPanel';
import SearchBar from './SearchBar/SearchBar';

const OmniSearch = () => {
  return (
    <div className='mainLauncher'>
      <SearchBar />
      <TopPanel />
    </div>
  )
}

export default OmniSearch