import React, { useEffect, useRef, useState } from 'react';
import './ListView.css';

import Accordion from './ListViewComponents/Accordion/Accordion';
import {
  editListTitle,
  editListDescription,
  setOneTime,
  generateInitialListState,
  updateWholeListState,
} from 'redux/slices/list';
import AppModeHeader from './ListViewComponents/AppModeHeader';
import { updateAppData, updateAppName } from 'redux/slices/workspace';
import HeaderSection from './HeaderSection';
import { useDispatch, useSelector } from 'react-redux';

function ListView({ contentRef, workspaceObj, uiDetails }: any) {
  const dispatch = useDispatch();
  const { content, list, workspace }: any = useSelector((state) => state);
  const { listTitleAndDesc, oneTime } = list;
  const { title, description } = listTitleAndDesc;
  const kabuniRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  // const [oneTime, setOneTime] = useState(true);
  const { color } = workspace;
  const [currentFileName, setCurrentFileName] = useState('');
  const [isAppMode, setIsAppMode] = useState(false);

  useEffect(() => {
    if (oneTime) {
      setTimeout(() => {
        workspace.workSpaceDocs.map((doc: any) => {
          if (workspace.currentSelectedDocId === doc.uuid) {
            setCurrentFileName(doc.name);
          }
        });
      }, 0);

      dispatch(setOneTime(false));
    }
  }, []);

  useEffect(() => {
    if (currentFileName !== '') {
      dispatch(editListTitle({ newTitle: currentFileName }));
    }
  }, [currentFileName]);

  const keyHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(editListTitle({ newTitle: event.target.innerText }));
      dispatch(setOneTime(false));
      const heading = document.getElementById('editableTitle');
      heading?.blur();
    }
  };
  const keyHandler2 = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(editListDescription({ newDesc: event.target.innerText }));
      const heading = document.getElementById('editableDesc');
      heading?.blur();
    }
  };
  useEffect(() => {
    const { editorApplicationsAdded } = workspace;
    const currentApplicationId = uiDetails.split('--')[2];
    const applicationsDataFiltered = editorApplicationsAdded?.find(
      (appData: any) => appData.applicatioId === currentApplicationId
    );
    const ListEmptyData = generateInitialListState();
    if (applicationsDataFiltered) {
      const { appData } = applicationsDataFiltered;
      if (appData) {
        dispatch(updateWholeListState(appData));
      } else {
        dispatch(updateWholeListState(ListEmptyData));
      }
    }
  }, []);
  useEffect(() => {
    const currentApplicationId = uiDetails.split('--')[2];
    dispatch(updateAppData({ appID: currentApplicationId, appData: list }));
  }, [list]);

  const updateCurrentTitle = (name) => {
    const currentApplicationId = uiDetails.split('--')[2];
    dispatch(updateAppName({ appID: currentApplicationId, titleForDoc: name }));
  };
  return (
    <>
      <HeaderSection view="list" updateCurrentTitle={updateCurrentTitle} />
      <div className="mainListComponentContainer">
        {/* <MainListComponent /> */}
        <Accordion isAppMode={isAppMode} />
      </div>
    </>
  );
}

export default ListView;
