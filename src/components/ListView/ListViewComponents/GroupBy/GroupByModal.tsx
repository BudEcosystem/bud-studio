import React from 'react';
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
import { setGroupBy, setGroupByOption } from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';

const GroupByModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="GroupByModal">
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
