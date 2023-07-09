import React from 'react';
import {
  Copy,
  Delete,
  Drag,
  Duplicate,
  Edit,
  Move,
  Plus,
  RightArrow,
} from '../WorkspaceIcons';
import { useDispatch } from 'react-redux';
import {
  setCopyOrMove,
  setCurrentMoveToItem,
  setIsMoveTo,
  setWorkspaceItem,
} from '@/redux/slices/activestate';

const OptionsTree = ({
  setShowAddFolder,
  setShowAddFile,
  setShowoptionsTree,
  node,
  workspaceItem,
}) => {
  const dispatch = useDispatch();
  console.log(node);
  const copyHandler = () => {
    // setShowDocumentOptions(false)
    dispatch(setCopyOrMove('copy'));
    dispatch(setIsMoveTo(true));
    dispatch(setCurrentMoveToItem(node));
    dispatch(setWorkspaceItem(workspaceItem));
  };

  const moveToHandler = () => {
    // setShowDocumentOptions(false)
    dispatch(setCopyOrMove('move'));
    dispatch(setIsMoveTo(true));
    dispatch(setCurrentMoveToItem(node));
    dispatch(setWorkspaceItem(workspaceItem));
  };
  return (
    <div id="optionsModal2" className="optionsModal2">
      <div className="secondWorkspaceModal">
        {/* <div className="drag">
          <Drag />
        </div> */}

        <div className="secondWorkspaceOptions">
          <div style={{ marginBottom: '20px' }}>
            <div
              className="secondWorkspaceOption"
              // onClick={showCreatePopup}
            >
              <Plus />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Create New
              </h3>
              <div className="subMenu">
                <p
                  onClick={() => {
                    setShowAddFolder(true);
                    setShowoptionsTree(false);
                  }}
                >
                  Folder
                </p>
                <p
                  onClick={() => {
                    setShowAddFile(true);
                    setShowoptionsTree(false);
                  }}
                >
                  Document
                </p>
              </div>
              {/* <ul className="subMenu">
                <li
                // onClick={() => createNewClickHandler('folder')}
                >
                  Folder
                </li>
                <li
                // onClick={() => createNewClickHandler('doc')}
                >
                  Document
                </li>
              </ul> */}
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            {/* {createPopup && <CreatePopupModal />} */}
            <div
              className="secondWorkspaceOption"
              // onClick={renameHandler}
            >
              <Edit />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Rename
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div>
              {/* {isRename && (
                <input
                  type="text"
                  value={newName}
                  onKeyUp={workSpaceNameChangeHandler}
                  onInput={workSpaceNameInputHandler}
                />
              )} */}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div
              className="secondWorkspaceOption"
              // onClick={duplicateHandler}
            >
              <Duplicate />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Duplicate Space
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="secondWorkspaceOption" onClick={copyHandler}>
              <Copy />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Copy to
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="secondWorkspaceOption" onClick={moveToHandler}>
              <Move />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Move to
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="Delete">
            <div className="secondWorkspaceOption">
              <Delete />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Delete
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsTree;
