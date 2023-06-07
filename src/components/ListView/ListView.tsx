import React, { useEffect, useRef, useState } from 'react';
import { AddCover, KabuniLogo } from './ListViewIcons';
import './ListView.css';
import OptionsComponent from './ListViewComponents/OptionsComponent';
import MainListComponent from './ListViewComponents/MainListComponent';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from './ListViewComponents/Accordion/Accordion';
import {
  editListTitle,
  editListDescription,
  setOneTime,
  generateInitialListState,
  updateWholeListState,
} from 'redux/slices/list';
import AppModeHeader from './ListViewComponents/AppModeHeader';
import { updateAppData } from 'redux/slices/workspace';

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
    const applicationsDataFiltered = editorApplicationsAdded.find(
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
  return (
    <>
      <div className="listViewContainer" ref={kabuniRef}>
        {!isAppMode ? (
          <>
            <div className="addCoverContainer">
              <div className="flexCenter">
                <AddCover />
              </div>
              <p className="addCoverText">Add cover</p>
            </div>
            <div className="mgLeft">
              <div
                style={{ backgroundColor: 'var(--primary-bgc-light)' }}
                className={`kabuni ${isSticky ? 'sticky' : ''}`}
              >
                <div className="kabuni" style={{}}>
                  <div
                    className="kabuniLogo"
                    style={{
                      fontSize: isSticky ? '10px' : '',
                      width: isSticky ? '14px' : '',
                      height: isSticky ? '14px' : '',
                      background: `${color}`,
                    }}
                  >
                    {/* <KabuniLogo /> */}
                    <span className={`tick ${isSticky ? 'tickStick' : ''}`}>
                      L
                    </span>
                    <span className={`tick ${isSticky ? 'tickStick' : ''}`}>
                      L
                    </span>
                    <span className={`tick ${isSticky ? 'tickStick' : ''}`}>
                      L
                    </span>
                  </div>
                  <p
                    className="kabuniText"
                    id="editableTitle"
                    style={{
                      fontSize: isSticky ? '18px' : '',
                      border: 'none',
                      outline: 'none',
                    }}
                    contentEditable={true}
                    onKeyDown={keyHandler}
                  >
                    {title}
                  </p>
                </div>
              </div>
              <p
                id="editableDesc"
                className="kabuniBottomText"
                contentEditable={true}
                style={{
                  border: 'none',
                  outline: 'none',
                }}
                onKeyDown={keyHandler2}
              >
                {description}
              </p>
            </div>
            <div className="optionsComponentContainer mgLeft">
              <OptionsComponent isSticky={isSticky} contentRef={contentRef} />
            </div>
          </>
        ) : (
          <AppModeHeader />
        )}
      </div>
      {!isAppMode && (
        <div className="curveContainer">
          <div className="borderCurveLine" />
        </div>
      )}
      <div className="mainListComponentContainer">
        {/* <MainListComponent /> */}
        <Accordion isAppMode={isAppMode} />
      </div>
    </>
  );
}

export default ListView;
