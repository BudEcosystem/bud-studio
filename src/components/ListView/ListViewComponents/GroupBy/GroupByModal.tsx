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
import { setWorkSpaceFilterKey } from '@/redux/slices/workspace';

function GroupByModal({ setShowGroupBy, placeholder, type }: any) {
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
  const setFilterKeySelected = (value: any) => {
    dispatch(setWorkSpaceFilterKey({ keySelected: value }));
  };
  const onMenuSelect = (value: any) => {
    if (type === 'Filter') {
      setFilterKeySelected(value);
    } else {
      dispatch(setGroupBy(true));
      dispatch(setDisplayToggle(true));
      dispatch(setGroupByOption('Name'));
    }
  };

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
        <div className="GroupByOption" onClick={() => onMenuSelect('Name')}>
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

        <div className="GroupByOption" onClick={() => onMenuSelect('Assign')}>
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

        <div className="GroupByOption" onClick={() => onMenuSelect('Priority')}>
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

        <div className="GroupByOption" onClick={() => onMenuSelect('Status')}>
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

      <div className="GroupByAdd" onClick={() => onMenuSelect('Group by')}>
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
