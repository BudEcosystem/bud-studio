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
} from "./WorkspaceIcons";
import TreeView from "./TreeView/TreeView";
import "./WorkspaceModal.css"

const WorkspaceModal = ({ name, color, setWorkspaceModal, workspaceModal }:any) => {
  const [showColorPin, setShowColorPin] = useState(false);
  const [showColorDots, setShowColorDots] = useState(false);
  const [isDrag, setIsDrag] = useState(true);
  let pinned = false;

  const handleOk = () => {
    setShowColorDots(false);
  };

  const handleCancel = () => {
    setShowColorDots(false);
  };

  const wrapperRef = useRef(null);
 
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target) && !pinned) {
          setWorkspaceModal(false);
          console.log("CLICKED OUSTIDE", !pinned)

      }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <Draggable id="WorkspaceModal" handle=".handle">
      <div ref={wrapperRef} className="WorkspaceModal">
        <div className="WorkspaceModalTop">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isDrag ? (<div className="handle">
              <Drag />
            </div>) : (<div style={{visibility: "hidden"}}><Drag /></div>)}
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
              <div className="WorkspaceIcon" onClick={() => {setIsDrag(!isDrag); pinned = !pinned}}>
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

        {showColorDots && (
          <Modal
            style={{ top: 355, right: 200 }}
            open={showColorDots}
            onOk={handleOk}
            onCancel={handleCancel}
            className="Modal"
          >
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
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Draggable>
  );
}

export default WorkspaceModal;
