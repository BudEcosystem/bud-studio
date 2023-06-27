import React, { useEffect, useRef, useState } from 'react';
import './GroupByModal.css';
import {
  Rename,
  Assign,
  Priority,
  Status,
  Search,
  Shortcut,
  Plus,
} from './GroupByModalIcons';
import {
  setDisplayToggle,
  setGroupBy,
  setGroupByOption,
} from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';

const GroupByModal = ({ setShowGroupBy }: any) => {
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
          placeholder="Group by..."
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
          <Rename />
          <h3
            style={{
              marginLeft: '20px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
            }}
          >
            Name
          </h3>
        </div>

        <div className="GroupByOption">
          <Assign />
          <h3
            style={{
              marginLeft: '20px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
            }}
          >
            Assign
          </h3>
        </div>

        <div className="GroupByOption">
          <Priority />
          <h3
            style={{
              marginLeft: '20px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
            }}
          >
            Priority
          </h3>
        </div>

        <div className="GroupByOption">
          <Status />
          <h3
            style={{
              marginLeft: '20px',
              color: 'white',
              fontWeight: '400',
              fontSize: '14px',
            }}
          >
            Status
          </h3>
        </div>
      </div>

      <div className="GroupByLine"></div>

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
};

export default GroupByModal;
