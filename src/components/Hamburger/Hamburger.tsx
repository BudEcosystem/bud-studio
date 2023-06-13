/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';
import {
  setCurrentSelectedUI,
  setSelectedOption,
} from 'redux/slices/activestate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSelectedDocument } from 'redux/slices/workspace';

function Hamburger() {
  const dispatch = useDispatch();
  const [hamburgerOptions, setHamburgerOptions] = useState([
    { title: '' },
    { title: 'Editor' },
  ]);
  const { activestate }: any = useSelector((state) => state);
  const { selectedOption, nodeIDs } = activestate;
  const { workspace }: any = useSelector((state) => state);
  const { currentSelectedDocId } = workspace;

  useEffect(() => {
    const { editorApplicationsAdded, currentSelectedDocId: csdi } = workspace;
    const documentApps = editorApplicationsAdded.filter(
      (data: any) => data.docId === csdi
    );
    const copyOfHamburgerOptions = [{ title: '' }, { title: 'Editor' }];
    documentApps.forEach((document: any) => {
      const filteredArray = copyOfHamburgerOptions.filter(
        (data: any) =>
          data.docId === csdi && data.applicatioId === document.applicatioId
      );
      if (filteredArray.length === 0) {
        copyOfHamburgerOptions.push(document);
      }
    });
    setHamburgerOptions(copyOfHamburgerOptions);
  }, [workspace]);
  const handleOptionClick = (option: any) => {
    if (option === '') {
      return;
    }
    dispatch(setCurrentSelectedUI(null));
    setTimeout(() => {
      if (option === 'Editor') {
        dispatch(setCurrentSelectedUI(''));
        dispatch(setCurrentSelectedDocument(nodeIDs));
        dispatch(setSelectedOption(option));
      } else if (option.includes('listview')) {
        dispatch(setCurrentSelectedUI(option));
        dispatch(setSelectedOption(option));
      } else if (option.includes('kanban')) {
        dispatch(setCurrentSelectedUI(option));
        dispatch(setSelectedOption(option));
      } else if (option.includes('table')) {
        dispatch(setCurrentSelectedUI(option));
        dispatch(setSelectedOption(option));
      }
    }, 500);
  };
  return (
    <div>
      {currentSelectedDocId && (
        <div className="hamBurgerParent">
          {hamburgerOptions.map(({ title, applicatioId, titleForDoc }: any) => (
            <HamburgerItems
              key={applicatioId}
              title={titleForDoc}
              selected={title === selectedOption}
              onClick={() => handleOptionClick(title)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hamburger;
