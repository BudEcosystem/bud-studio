import React, { useEffect, useRef, useState } from 'react';
import './GroupByModal.css';
import {
  setDisplayToggle,
  setGroupBy,
  setGroupByOption,
} from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';
import {
  Rename,
  Assign,
  Priority,
  Status,
  Search,
  Shortcut,
  Plus,
  Name,
} from './GroupByModalIcons';

function GroupByModal({ setShowGroupBy, placeholder }: any) {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const {} = useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowGroupBy(false);
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
    <div className="GroupByModal" ref={wrapperRef}>
      <div className="GroupBySearchBar">
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
          className="GroupBySearchInput"
          type="text"
          placeholder={placeholder}
        />
        <Shortcut />
      </div>

      <div className="GroupByOptions">
        <div
          className="GroupByOption"
          onClick={() => {
            dispatch(setGroupBy(true));
            dispatch(setDisplayToggle(true));
            dispatch(setGroupByOption('Name'));
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

        <div className="GroupByOption">
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

        <div className="GroupByOption">
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

        <div className="GroupByOption">
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

      <div className="GroupByLine" />

      <div
        className="GroupByAdd"
        onClick={() => {
          dispatch(setGroupBy(true));
          dispatch(setDisplayToggle(true));
          dispatch(setGroupByOption('AddGroup'));
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
          Add group
        </div>
      </div>
    </div>
  );
}

export default GroupByModal;
