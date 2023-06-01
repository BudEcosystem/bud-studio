import React, { useEffect, useState } from 'react';
import NewTaskPanel from './NewTaskPanel';
import { useDispatch, useSelector } from 'react-redux';
import { editListTitle, setOneTime } from 'redux/slices/list';

const AppModeHeader = () => {
  const dispatch = useDispatch();
  const { list }: any = useSelector((state) => state);
  const { listTitleAndDesc, oneTime } = list;
  const { title } = listTitleAndDesc;
  const { workspace }: any = useSelector((state) => state);
  const { color } = workspace;
  const [currentFileName, setCurrentFileName] = useState('');
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
      console.log(event.target.innerText);
      dispatch(editListTitle({ newTitle: event.target.innerText }));
      dispatch(setOneTime(false));
      const heading = document.getElementById('editableTitle');
      heading?.blur();
    }
  };
  return (
    <>
      <div className="mgLeft" style={{ marginBottom: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--primary-bgc-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          //   className={`kabuni`}
        >
          <div className="kabuni" style={{ marginLeft: '10px' }}>
            <div
              className="kabuniLogoAppMode"
              style={{
                background: `${color}`,
              }}
            >
              <span className={`tickAppMode`}>L</span>
              <span className={`tickAppMode`}>L</span>
              <span className={`tickAppMode`}>L</span>
            </div>
            <p
              className="kabuniTextAppMode"
              id="editableTitle"
              style={{
                border: 'none',
                outline: 'none',
              }}
              contentEditable={true}
              onKeyDown={keyHandler}
            >
              {title}
            </p>
          </div>
          <div style={{ marginRight: '4px' }}>
            <NewTaskPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppModeHeader;
