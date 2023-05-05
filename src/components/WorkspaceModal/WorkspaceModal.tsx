import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Modal } from 'antd';
import {
  Pin,
  Dots,
  Drag,
  SearchIcon,
  Copy,
  Delete,
  Duplicate,
  Edit,
  Move,
  Plus,
  RightArrow,
} from './WorkspaceIcons';
import TreeView from './TreeView/TreeView';
import './WorkspaceModal.css';

const WorkspaceModal = ({
  name,
  color,
  setWorkspaceModal,
  workspaceModal,
}: any) => {
  const [showColorPin, setShowColorPin] = useState(false);
  const [showColorDots, setShowColorDots] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (workspaceModal) {
      setTimeout(() => {
        setRender(true);
      }, 100);
    } else {
      setRender(false);
    }
  }, [workspaceModal]);
  let pinned = false;

  const handleOk = () => {
    setShowColorDots(false);
  };

  const handleCancel = () => {
    setShowColorDots(false);
  };

  const wrapperRef = useRef(null);
  const optionModalRef = useRef(null);

  function useOutsideAlerter(ref: any) {
    const [isDrag, setIsDrag] = useState(true);

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target) && isDrag) {
          setWorkspaceModal(false);
          setIsDrag(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, isDrag, setWorkspaceModal]);

    function handleIsDrag() {
      setIsDrag(!isDrag);
    }

    return { isDrag, handleIsDrag };
  }

  const { isDrag, handleIsDrag } = useOutsideAlerter(wrapperRef);

  return (
    <Draggable bounds={{ top: -72, left: -20, right: 1330, bottom: 440 }} handle=".handle">
      <div
        ref={wrapperRef}
        className={`WorkspaceModal ${render ? 'show' : undefined}`}
      >
        <div className="WorkspaceModalTop">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isDrag ? (
              <div className="handle">
                <Drag />
              </div>
            ) : (
              <div style={{ visibility: 'hidden' }}>
                <Drag />
              </div>
            )}
            <div
              style={{
                backgroundColor: `${color}`,
                width: '12px',
                height: '12px',
                borderRadius: '4px',
                marginRight: '10px',
                marginLeft: '10px',
              }}
            />
            <div
              style={{
                width: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: '#C6C6C6',
                fontWeight: '400',
                fontSize: '14px',
              }}
            >
              {name}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              onClick={() => {
                setShowColorPin(!showColorPin);
              }}
              style={{
                marginRight: '6px',
                background: `${
                  showColorPin
                    ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${color} 57.81%, rgba(175, 147, 218, 0.05) 100%)`
                    : ''
                }`,
              }}
              className="WorkspaceIconBox"
            >
              <div className="WorkspaceIcon" onClick={handleIsDrag}>
                <Pin />
              </div>
            </div>

            <div
              onClick={() => {
                setShowColorDots(!showColorDots);
              }}
              style={{
                background: `${
                  showColorDots
                    ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${color} 57.81%, rgba(175, 147, 218, 0.05) 100%)`
                    : ''
                }`,
              }}
              className="WorkspaceIconBox"
            >
              <div className="WorkspaceIcon">
                <Dots />
              </div>
              </div>
              {showColorDots && (
                <div className="optionsModal">
                  <div className="secondWorkspaceModal">
                    <Drag />

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
                          <div className='secondWorkspaceRightArrow'><RightArrow/></div>
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
                          <div className='secondWorkspaceRightArrow'><RightArrow/></div>
                        </div>
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
                          <div className='secondWorkspaceRightArrow'><RightArrow/></div>
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
                          <div className='secondWorkspaceRightArrow'><RightArrow/></div>
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
                          <div className='secondWorkspaceRightArrow'><RightArrow/></div>
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
                          <div className='secondWorkspaceRightArrow'><RightArrow/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        <div className="WorkspaceSearchBar">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '15px',
            }}
          >
            <SearchIcon />
          </div>
          <input
            className="WorkspaceSearchInput"
            type="text"
            placeholder="Search"
          />
        </div>

        <TreeView color={color} />
      </div>
    </Draggable>
  );
};

export default WorkspaceModal;
