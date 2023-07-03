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

const OptionsTree = ({ setShowAddFolder, setShowAddFile }) => {
  return (
    <div id="optionsModal" className="optionsModal">
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
                <p onClick={() => setShowAddFolder(true)}>Folder</p>
                <p onClick={() => setShowAddFile(true)}>Document</p>
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
            <div className="secondWorkspaceOption">
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
            <div
              className="secondWorkspaceOption"
              // onClick={moveToHandler}
            >
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
