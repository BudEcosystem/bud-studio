import React, { useEffect, useRef } from 'react';
import '../../ListView/ListViewComponents/ThreeDotsOption/ThreeDotsOption.css';
import {
  RightArrow,
  Plus,
  Rename,
  Duplicate,
  Move,
  CopyLink,
  Archive,
  Delete,
} from '../../ListView/ListViewComponents/ThreeDotsOption/ThreeDotsOptionIcons';
import Draggable from 'react-draggable';

const DragHandle = () => {
  return (
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1261155949">
        <g id="Group 1261155007">
          <circle
            id="Ellipse 7572"
            cx="1.5"
            cy="13.5"
            r="1.5"
            transform="rotate(-90 1.5 13.5)"
            fill="#242424"
          />
          <circle
            id="Ellipse 7573"
            cx="1.5"
            cy="7.5"
            r="1.5"
            transform="rotate(-90 1.5 7.5)"
            fill="#242424"
          />
          <circle
            id="Ellipse 7574"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="rotate(-90 1.5 1.5)"
            fill="#242424"
          />
        </g>
        <g id="Group 1261155015">
          <circle
            id="Ellipse 7572_2"
            cx="7.5"
            cy="13.5"
            r="1.5"
            transform="rotate(-90 7.5 13.5)"
            fill="#242424"
          />
          <circle
            id="Ellipse 7573_2"
            cx="7.5"
            cy="7.5"
            r="1.5"
            transform="rotate(-90 7.5 7.5)"
            fill="#242424"
          />
          <circle
            id="Ellipse 7574_2"
            cx="7.5"
            cy="1.5"
            r="1.5"
            transform="rotate(-90 7.5 1.5)"
            fill="#242424"
          />
        </g>
      </g>
    </svg>
  );
};

const RightClickMenu = ({ left, top, setMenuVisible }: any) => {
  const wrapperRef = useRef(null);
  const {} = useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuVisible(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
    return {};
  }
  return (
    <div 
    style={{
      position: 'fixed',
      // top: '80px',
      // left: '260px',
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      zIndex: '10',
    }}>
      <Draggable bounds="parent" handle=".handle">
      <div
        className="threeDotsOptionsModal"
        style={{ position: 'fixed', left: left, top: top, height: 'unset', pointerEvents: "auto", zIndex: "9" }}
        ref={wrapperRef}
      >
        <div className="threeDotsOptions">
          <div style={{ marginBottom: '20px' }}>
            <div
              className="handle"
              style={{ marginBottom: '10px', cursor: 'drag', marginTop: "5px" }}
            >
              <DragHandle />
            </div>

            <div className="threeDotsOption">
              <Rename />
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
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>

            <div className="threeDotsOption">
              <Plus />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Add to
              </h3>
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>
            <div />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div className="threeDotsOption">
              <Duplicate />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Duplicate
              </h3>
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>

            <div className="threeDotsOption">
              <CopyLink />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Copy Link
              </h3>
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="threeDotsOption">
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
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="Delete">
            <div className="threeDotsOption">
              <Archive />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Archive
              </h3>
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="Delete">
            <div className="threeDotsOption">
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
              <div className="threeDotsRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
      </Draggable>
    </div>
  );
};

export default RightClickMenu;
