import React, { useEffect, useRef, useState } from 'react';
import './SortByModal.css';
import {
  Rename,
  Assign,
  Priority,
  Status,
  Search,
  Shortcut,
  Plus,
  Name,
} from './SortByModalIcons';
import {
  setDisplayToggle,
  setDisplayToggleSortBy,
  setGroupBy,
  setSortBy,
  setSortByOption,
} from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';

const SortByModal = ({ setShowSortBy }: any) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const {} = useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSortBy(false);
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
    <div className="SortByModal" ref={wrapperRef}>
      <div className="SortBySearchBar">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '15px',
          }}
        >
          <Search />
        </div>
        <input
          className="SortBySearchInput"
          type="text"
          placeholder="Sort by..."
        />
        <Shortcut />
      </div>

      <div className="SortByOptions">
        <div
          className="SortByOption"
          onClick={() => {
            dispatch(setDisplayToggleSortBy(true));
            dispatch(setSortBy(true));
            dispatch(setSortByOption('Name'));
          }}
        >
          <Name />
          <h3
            style={{
              left: '60px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
              position: 'absolute',
            }}
          >
            Name
          </h3>
        </div>

        <div className="SortByOption">
          <Assign />
          <h3
            style={{
              left: '60px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
              position: 'absolute',
            }}
          >
            Assign
          </h3>
        </div>

        <div className="SortByOption">
          <Priority />
          <h3
            style={{
              left: '60px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
              position: 'absolute',
            }}
          >
            Priority
          </h3>
        </div>

        <div className="SortByOption">
          <Status />
          <h3
            style={{
              left: '60px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
              position: 'absolute',
            }}
          >
            Status
          </h3>
        </div>
      </div>

      <div className="SortByLine"></div>

      <div
        className="SortByAdd"
        onClick={() => {
          dispatch(setSortBy(true));
          dispatch(setGroupBy(false));
          dispatch(setDisplayToggleSortBy(true));
          dispatch(setSortByOption('AddSort'));
        }}
      >
        <Plus />
        <div
          style={{
            color: '#3D4047',
            fontSize: '14px',
            fontWeight: '400',
            marginLeft: '20px',
          }}
        >
          Add Sort
        </div>
      </div>
    </div>
  );
};

export default SortByModal;
