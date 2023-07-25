import React, { useEffect, useRef, useState } from 'react';
import './SortByComponent.css';
import ButtonName from './ButtonName';
import { Group, NameText } from './SortByIcons';
import NameComponent from './NameComponent';
import AddGroup from './AddGroup';
import { useSelector } from 'react-redux';
import {
  setDisplayToggle,
  setSortBy,
  setSortByOption,
} from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';

const SortByComponent = () => {
  const { activestate }: any = useSelector((state) => state);
  const { sortByOption, displayToggleSortBy } = activestate;
  const [toggle, setToggle] = useState(sortByOption);
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  console.log(sortByOption, displayToggleSortBy);
  const {} = useOutsideAlerter(mainRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !displayToggleSortBy
        ) {
          dispatch(setSortBy(false));
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, displayToggleSortBy]);

    return {};
  }

  return (
    <div ref={mainRef} style={{ marginBottom: '10px' }}>
      <div className="gropuBymainContainer">
        <div>
          <div className="gropuByLeftContainer">
            <div className="leftButtonGropuBy">
              {sortByOption === 'Name' && (
                <ButtonName name={`Name`} icon={<NameText />} />
              )}
              {sortByOption === 'AddSort' && (
                <ButtonName name={`1 rule`} icon={<Group />} />
              )}
            </div>
            <p className="addTextSortBy">+ Add New</p>
          </div>
        </div>
        <div className="gropuByRightContainer">
          <p className="resetText">Reset</p>
          <div className="RightButtonGropuBy">
            <ButtonName name={`Save for everyone`} icon={null} />
          </div>
        </div>
      </div>
      {displayToggleSortBy && sortByOption === 'Name' && (
        <NameComponent displayToggle={displayToggleSortBy} />
      )}
      {displayToggleSortBy && sortByOption === 'AddSort' && (
        <AddGroup displayToggle={displayToggleSortBy} />
      )}
      {/* <AddGroup /> */}
    </div>
  );
};

export default SortByComponent;
