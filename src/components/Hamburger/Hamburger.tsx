import React, { useEffect, useState } from 'react';
import HamburgerItems from './HamburgerItems';
import './Hamburger.css';
import {
  setCurrentSelectedUI,
  setSelectedOption,
} from 'redux/slices/activestate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSelectedDocument } from 'redux/slices/workspace';

// const HamburgerOptions = ['', 'Editor', 'List View', 'Kanban View', '', ''];
const HamburgerOptions = [{ title: '' }, { title: 'Editor' }];

function Hamburger() {
  // const [selectedOption, setSelectedOption] = useState('editor');
  const dispatch = useDispatch();
  const { activestate }: any = useSelector((state) => state);
  const { selectedOption, nodeIDs } = activestate;
  const { tree, workspace }: any = useSelector((state) => state);
  const {
    color,
    currentWorkspace,
    currentSelectedDocId,
    applicationData,
    editorApplicationsAdded,
  } = workspace;
  useEffect(() => {
    let { editorApplicationsAdded, currentSelectedDocId } = workspace;
    let documentApps = editorApplicationsAdded.filter(
      (data) => data.docId === currentSelectedDocId
    );
    console.log('documentApps', documentApps);
    documentApps.forEach((document: any) => {
      const filteredArray = HamburgerOptions.filter(
        (data: any) =>
          data.docId === currentSelectedDocId &&
          data.applicatioId === document.applicatioId
      );
      if (filteredArray.length === 0) {
        HamburgerOptions.push(document);
      }
    });
  }, [workspace]);
  console.log(HamburgerOptions);
  const handleOptionClick = (option: any) => {
    if (option === '') {
      return;
    }
    dispatch(setSelectedOption(option));
    if (option === 'Editor') {
      dispatch(setCurrentSelectedUI(''));
      dispatch(setCurrentSelectedDocument(nodeIDs));
    } else if (option.includes('listview')) {
      dispatch(setCurrentSelectedUI(option));
    } else if (option.includes('kanban')) {
      dispatch(setCurrentSelectedUI(option));
    }
  };

  return (
    <div>
      {currentSelectedDocId && (
        <div className="hamBurgerParent">
          {HamburgerOptions.map(({ title, type }, i) => (
            <HamburgerItems
              key={i}
              title={type}
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
