import React, { useEffect, useRef, useState } from 'react';
import { AddCover } from './ListViewIcons';
import './ListView.css';
import OptionsComponent from './ListViewComponents/OptionsComponent';
import MainListComponent from './ListViewComponents/MainListComponent';
import { useSelector } from 'react-redux';

const ListView = () => {
  const { content }: any = useSelector((state) => state);
  let { contentRef } = content;
  const kabuniRef = useRef(null);
  // const contentRef = useRef(null);

  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    var handleScroll = () => {
      const containerTop = contentRef.getBoundingClientRect().top;
      const kabuniTop = kabuniRef.current.getBoundingClientRect().top;
      setIsSticky(kabuniTop <= 95);
      console.log(kabuniTop);
      console.log(kabuniRef.current);
    };

    contentRef?.addEventListener('scroll', handleScroll);
    return () => {
      contentRef?.removeEventListener('scroll', handleScroll);
    };
  }, [contentRef, kabuniRef]);
  return (
    <>
      <div className="listViewContainer" ref={kabuniRef}>
        <div className="addCoverContainer">
          <div className="flexCenter">
            <AddCover />
          </div>
          <p className="addCoverText">Add cover</p>
        </div>
        <div className="mgLeft">
          <div
            style={{ backgroundColor: 'var(--primary-bgc-light)' }}
            className={`kabuni ${isSticky ? 'sticky' : ''}`}
          >
            <div className={`kabuni`} style={{}}>
              <div
                className="kabuniLogo"
                style={{
                  fontSize: isSticky ? '10px' : '',
                  width: isSticky ? '14px' : '',
                  height: isSticky ? '14px' : '',
                }}
              >
                <span className={`tick ${isSticky ? 'tickStick' : ''}`}>L</span>
                <span className={`tick ${isSticky ? 'tickStick' : ''}`}>L</span>
                <span className={`tick ${isSticky ? 'tickStick' : ''}`}>L</span>
              </div>
              <p
                className="kabuniText"
                style={{ fontSize: isSticky ? '18px' : '' }}
              >
                Kabuni
              </p>
            </div>
          </div>
          <p className="kabuniBottomText">
            Make note of any appointments or meetings.
          </p>
        </div>
        <div className="optionsComponentContainer mgLeft">
          <OptionsComponent isSticky={isSticky} />
        </div>
      </div>
      <div className="curveContainer mgLeft">
        <div className="borderCurveLine"></div>
      </div>
      <div className="mainListComponentContainer mgLeft">
        <MainListComponent />
      </div>
    </>
  );
};

export default ListView;
