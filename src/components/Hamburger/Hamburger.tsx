/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';

function Hamburger({
  documentData = [],
  currentPage,
  setCurrentPage,
  currentDatabase,
}) {
  console.log(documentData, 'documentData=');
  // Handle Pagination
  const handleOptionClick = (index: any) => {
    if (index === '') {
      return;
    }

    // Set The Current View
    setCurrentPage(index);
    console.log(currentPage, 'llllll');
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
              currentDatabase={currentDatabase}
              databaseID={doc.databaseID}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Hamburger;
