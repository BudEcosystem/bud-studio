import React, { useEffect, useRef, useState } from 'react';
import './ListView.css';

import {
  editListTitle,
  editListDescription,
  setOneTime,
  generateInitialListState,
  updateWholeListState,
} from 'redux/slices/list';
import { updateAppData, updateAppName } from 'redux/slices/workspace';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from './ListViewComponents/Accordion/Accordion';
import AppModeHeader from './ListViewComponents/AppModeHeader';
import HeaderSection from './HeaderSection';

function ListView({ databaseData, databaseEntries }: any) {
  const dispatch = useDispatch();
  const { content, list, workspace }: any = useSelector((state) => state);
  const { listTitleAndDesc, oneTime } = list;
  // const { title, description } = listTitleAndDesc;
  // const kabuniRef = useRef(null);
  // const [isSticky, setIsSticky] = useState(false);
  // const [oneTime, setOneTime] = useState(true);
  // const { color } = workspace;
  const [currentFileName, setCurrentFileName] = useState('');
  const [isAppMode, setIsAppMode] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // if (oneTime) {
    //   setTimeout(() => {
    //     workspace.workSpaceDocs.map((doc: any) => {
    //       if (workspace.currentSelectedDocId === doc.uuid) {
    //         setCurrentFileName(doc.name);
    //       }
    //     });
    //   }, 0);
    //
    //   dispatch(setOneTime(false));
    // }
  }, []);

  useEffect(() => {
    // if (currentFileName !== '') {
    //   dispatch(editListTitle({ newTitle: currentFileName }));
    // }
  }, [currentFileName]);

  useEffect(() => {
    // const { editorApplicationsAdded } = workspace;
    // const currentApplicationId = uiDetails.split('--')[2];
    // const applicationsDataFiltered = editorApplicationsAdded?.find(
    //   (appData: any) => appData.applicatioId === currentApplicationId
    // );
    // const ListEmptyData = generateInitialListState();
    // if (applicationsDataFiltered) {
    //   const { appData, titleForDoc } = applicationsDataFiltered;
    //   setTitle(titleForDoc);
    //   if (appData) {
    //     dispatch(updateWholeListState(appData));
    //   } else {
    //     dispatch(updateWholeListState(ListEmptyData));
    //   }
    // }
  }, []);

  useEffect(() => {}, [list]);

  return (
    <div className="mainListComponentContainer">
      {/* <MainListComponent /> */}
      <Accordion
        isAppMode={false}
        title={databaseData.title}
        databaseData={databaseData}
        databaseEntries={{ databaseEntries }}
      />
    </div>
  );
}

export default ListView;
