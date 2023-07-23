import { useEffect, useRef } from 'react';
import './SortByModal.css';
import {
  setDisplayToggleSortBy,
  setSortBy,
  setSortByOption,
} from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';
import {
  Assign,
  Priority,
  Status,
  Search,
  Shortcut,
  Name,
} from './SortByModalIcons';
import { setWorkSpaceSortKey } from '@/redux/slices/workspace';

function SortByModal({ setShowSortBy }: any) {
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
  const onMenuSelect = (value: any) => {
    dispatch(setWorkSpaceSortKey({ keySelected: value }));
    dispatch(setDisplayToggleSortBy(true));
    dispatch(setSortBy(true));
    dispatch(setSortByOption('Name'));
  };
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
            onMenuSelect('Name');
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

        <div className="SortByOption" onClick={() => onMenuSelect('Assign')}>
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

        <div className="SortByOption" onClick={() => onMenuSelect('Priority')}>
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

        <div className="SortByOption" onClick={() => onMenuSelect('Status')}>
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
    </div>
  );
}

export default SortByModal;
