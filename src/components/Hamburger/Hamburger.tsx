/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';


function Hamburger({ documentData = [], currentPage, setCurrentPage }) {

  // Handle Pagination
  const handleOptionClick = (index: any) => {
    if (index === '') {
      return;
    }

    // Set The Current View
    setCurrentPage(index);
  };
  return (
    <div className={'ham-container'}>
      {documentData.length > 1 && (
        <>
          {documentData.map((doc: any, index) => (
            <HamburgerItems
              key={index}
              title="Document"
              selected={index === currentPage}
              onClick={() => handleOptionClick(index)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Hamburger;
