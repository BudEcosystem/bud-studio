import React from 'react';
import './ThreeDotsOption.css'
import { RightArrow, Plus, Rename, Duplicate, Move, CopyLink, Archive, Delete } from './ThreeDotsOptionIcons';

const ThreeDotsOption = () => {
  return (
    <div>
        <div className="threeDotsOptionsModal">

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