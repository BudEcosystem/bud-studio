/* eslint-disable jsx-a11y/no-static-element-interactions */
import Draggable from 'react-draggable';
import React, { useEffect, useRef } from 'react';
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

function FlyoutMenu({ createNewClickHandler, id, setToggleFlyout }: any) {
  const optionModalRef = useRef(null);
  useEffect(() => {
    const flyOutMenu = document.getElementById('flyOutMenu');
    flyOutMenu?.addEventListener('mouseleave', function (event) {
      console.log('mouseout', event);
      setToggleFlyout(false);
    });
  });
  return (
    <Draggable bounds="body" handle=".drag">
      <div ref={optionModalRef} className="optionsModal" id="flyOutMenu">
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
                <ul className="subMenu">
                  <li onClick={() => createNewClickHandler('folder')}>
                    Folder
                  </li>
                  <li onClick={() => createNewClickHandler('file')}>
                    Document
                  </li>
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
