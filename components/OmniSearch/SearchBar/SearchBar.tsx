import React from 'react';
import {SearchIcon} from './SearchIcon'
const SearchBar = () => {
  return (
    <div className='SearchBarGradient'>

        <div className='SearchBar'>

            <div style={{marginLeft: "15px"}}>
            <SearchIcon />
            </div>

            <input 
            className='SearchBarInput' 
            type="text"
            placeholder='Search for Actions, People, Instruments'
            />
            
        </div>

    </div>
  )
}

export default SearchBar