import React, { useEffect, useRef, useState } from 'react';
import { AddCover } from './ListViewIcons';
import './ListView.css';
import OptionsComponent from './ListViewComponents/OptionsComponent';
import MainListComponent from './ListViewComponents/MainListComponent';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from './ListViewComponents/Accordion/Accordion';
import { editListTitle, editListDescription } from 'redux/slices/list';

function ListView({ contentRef }) {
  const dispatch = useDispatch();
  const { content, list }: any = useSelector((state) => state);
  // // const { contentRef } = content;
  const { title, description } = list.listTitleAndDesc;
  const kabuniRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const [editingDesc, setEditingDesc] = useState(false);
  const [newDesc, setNewDesc] = useState('');

  const handleDoubleClick = () => {
    setEditing(true);
  };
  const handleDoubleClickDesc = () => {
    setEditingDesc(true);
  };
  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleChangeDesc = (event) => {
    setNewDesc(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(editListTitle({ newTitle }));
      setEditing(false);
      setNewTitle('');
    }
  };
  const handleKeyPressDesc = (event) => {
    if (event.key === 'Enter') {
      dispatch(editListDescription({ newDesc }));
      setEditingDesc(false);
      setNewDesc('');
    }
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const containerTop = contentRef.getBoundingClientRect().top;
  //     const kabuniTop = kabuniRef.current.getBoundingClientRect().top;
  //     setIsSticky(kabuniTop <= 95);
  //   };

  //   contentRef?.addEventListener('scroll', handleScroll);
  //   return () => {
  //     contentRef?.removeEventListener('scroll', handleScroll);
  //   };
  // }, [contentRef, kabuniRef]);

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
            <div className="kabuni" style={{}}>
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
              {editing ? (
                <input
                  className="titleInput"
                  type="text"
                  value={newTitle}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  onBlur={() => setEditing(false)}
                />
              ) : (
                <p
                  className="kabuniText"
                  style={{ fontSize: isSticky ? '18px' : '' }}
                  onDoubleClick={handleDoubleClick}
                >
                  {title}
                </p>
              )}
            </div>
          </div>
          {editingDesc ? (
            <input
              className="titleInputDesc"
              type="text"
              value={newDesc}
              onChange={handleChangeDesc}
              onKeyPress={handleKeyPressDesc}
              onBlur={() => setEditingDesc(false)}
            />
          ) : (
            <p className="kabuniBottomText" onDoubleClick={handleDoubleClickDesc}>
              {description}
            </p>
          )}
        </div>
        <div className="optionsComponentContainer mgLeft">
          <OptionsComponent isSticky={isSticky} contentRef={contentRef} />
        </div>
      </div>
      <div className="curveContainer mgLeft">
        <div className="borderCurveLine" />
      </div>
      <div className="mainListComponentContainer mgLeft">
        {/* <MainListComponent /> */}
        <Accordion />
      </div>
    </>
  );
}

export default ListView;
