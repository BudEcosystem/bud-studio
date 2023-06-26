import React, { useEffect, useRef } from 'react';
import './ThreeDotsOption.css'
import { RightArrow, Plus, Rename, Duplicate, Move, CopyLink, Archive, Delete } from './ThreeDotsOptionIcons';

const ThreeDotsOption = ({setShowThreeDotsOption}: any) => {
    const wrapperRef = useRef(null);

    const { } = useOutsideAlerter(
        wrapperRef
      );
    
      function useOutsideAlerter(ref: any) {
    
        useEffect(() => {
          function handleClickOutside(event: any) {
             if (
              ref.current &&
              !ref.current.contains(event.target)
            ) {
              setShowThreeDotsOption(false);
            }
          }
    
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, [ref]);
    
        return { };
      }

  return (
    <div>
        <div className="threeDotsOptionsModal" ref={wrapperRef}>

          <div className="threeDotsOptions">
            <div style={{ marginBottom: '20px' }}>
              
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
    </div>
  )
}

export default ThreeDotsOption