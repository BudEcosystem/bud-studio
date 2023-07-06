import React, { useEffect, useRef, useState } from 'react';
import './SortByComponent.css';
import { DownArrowName, NameText, ThreeDotsName } from './SortByIcons';
import { useDispatch } from 'react-redux';
import { setDisplayToggleSortBy } from 'redux/slices/activestate';

const AddGroup = ({ displayToggle }: any) => {
  const containsArr = [
    'Is',
    'Is not',
    'Contains',
    'Does not contain',
    'Starts with',
    'End with',
    'Is empty',
    'Is empty',
  ];
  const [isContainsOption, setIsContainsOption] = useState(false);
  const [hoverElement, setHoverElement] = useState(-1);

  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const {} = useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(setDisplayToggleSortBy(!displayToggle));
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
    <div ref={wrapperRef} className="addGroupContainer">
      <div className="topLine">
        <p className="whereText">where</p>
        <div className="darkButton">
          <div style={{ marginRight: '5px' }}>
            <NameText />
          </div>
          <p className="darkbtnName">Name</p>
          <div
            style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
          >
            <DownArrowName />
          </div>
        </div>
        <div
          className="containsButton"
          style={{ background: isContainsOption ? '#0C0C0C' : '' }}
          onClick={() => setIsContainsOption(!isContainsOption)}
        >
          <p className="darkbtnName">Contains</p>
          <div
            style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
          >
            <DownArrowName />
          </div>
        </div>
        <div className="valueButton">
          <input className="valueInput" type="text" placeholder="Value" />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <ThreeDotsName />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <p className="filterText">+ Add filter rule</p>
        <div
          style={{
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '4px',
          }}
        >
          <DownArrowName />
        </div>
      </div>
      <div className="hrLine"></div>
      <p className="deleteFilterText">Delete filter</p>
      {isContainsOption && (
        <div className="containsOption">
          <div className="containsOptionMain">
            {containsArr.map((item, i) => (
              <div
                className={`optionsWrapper ${i === hoverElement && 'active'}`}
                onMouseOver={() => setHoverElement(i)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGroup;
