import Draggable from 'react-draggable';
import React, { useRef } from 'react';
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

function FlyoutMenu({createNewFolderClickHandler,createNewFileClickHandler}) {
  const optionModalRef = useRef(null);
  return (
    <Draggable bounds="body" handle=".drag">
      <div ref={optionModalRef} className="optionsModal">
        <div className="secondWorkspaceModal">
          <div className="drag">
            <Drag />
          </div>

          <div className="secondWorkspaceOptions">
            <div style={{ marginBottom: '20px' }}>
              <div className="secondWorkspaceOption">
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
                <div className="secondWorkspaceRightArrow">
                  <RightArrow />
                </div>
                <ul className='subMenu'>
                    <li onClick={createNewFolderClickHandler}>Create Folder</li>
                    <li onClick={createNewFileClickHandler}>Create File</li>
                </ul>
              </div>
              <div className="secondWorkspaceOption">
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
              <div />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div className="secondWorkspaceOption">
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
              <div className="secondWorkspaceOption">
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
    </Draggable>
  );
}
export default FlyoutMenu;
