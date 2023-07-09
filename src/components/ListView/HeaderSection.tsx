/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editListDescription,
  editListTitle,
  setOneTime,
} from 'redux/slices/list';
import { AddCover } from './ListViewIcons';
import OptionsComponent from './ListViewComponents/OptionsComponent';
import AppModeHeader from './ListViewComponents/AppModeHeader';
import EditorHeader from 'components/EditorHeader';
import bgImg from '../EditorHeader/images/bgImage.png';
import iconImg from '../EditorHeader/images/iconImage.png';

function HeaderSection({
  view,
  updateCurrentTitle,
  title,
  databaseDescription,
  changeDatabaseView,
}: any) {
  const dispatch = useDispatch();
  const { content, list }: any = useSelector((state) => state);
  const { listTitleAndDesc, oneTime } = list;
  const { description } = databaseDescription;
  // const [oneTime, setOneTime] = useState(true);
  const { workspace }: any = useSelector((state) => state);
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
      // updateCurrentTitle(currentFileName);
    }
  }, [currentFileName]);

  const keyHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(editListTitle({ newTitle: event.target.innerText }));
      dispatch(setOneTime(false));
      updateCurrentTitle(event.target.innerText);
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
  return (
    <>
      <div className="listViewContainer">
        {!isAppMode ? (
          <>
            {/*<div style={{marginBottom: "30px"}}>*/}
            {/*<EditorHeader view={view} coverImg={bgImg} iconImg={iconImg} />*/}
            {/*</div>*/}
            <div className="mgLeft">
              <div
                style={{ backgroundColor: 'var(--bud-container-background)' }}
                className="kabuni"
              >
                <div className="kabuni" style={{}}>
                  <div
                    className="kabuniLogo"
                    style={{
                      background: `${color}`,
                    }}
                  >
                    <span className="tick">L</span>
                    <span className="tick">L</span>
                    <span className="tick">L</span>
                  </div>
                  <p
                    className="kabuniText"
                    id="editableTitle"
                    style={{
                      border: 'none',
                      outline: 'none',
                    }}
                    contentEditable
                    onKeyDown={keyHandler}
                  >
                    {title}
                  </p>
                </div>
              </div>
              <p
                id="editableDesc"
                className="kabuniBottomText"
                contentEditable
                style={{
                  border: 'none',
                  outline: 'none',
                }}
                onKeyDown={keyHandler2}
              >
                {databaseDescription}
              </p>
            </div>
            <div className="optionsComponentContainer mgLeft">
              <OptionsComponent
                view={view}
                changeDatabaseView={changeDatabaseView}
              />
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
    </>
  );
}

export default HeaderSection;
