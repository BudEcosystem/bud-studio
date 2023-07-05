import React, { useEffect, useRef, useState } from 'react';
import './GroupByComponent.css';
import ButtonName from './ButtonName';
import { Group, NameText } from './GropuByIcons';
import NameComponent from './NameComponent';
import AddGroup from './AddGroup';
import { useSelector } from 'react-redux';
import {
  setDisplayToggle,
  setGroupBy,
  setGroupByOption,
} from 'redux/slices/activestate';
import { useDispatch } from 'react-redux';

const GroupByComponent = () => {
  const { activestate }: any = useSelector((state) => state);
  const { groupByOption, displayToggle } = activestate;
  const [toggle, setToggle] = useState(groupByOption);
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const {} = useOutsideAlerter(mainRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        console.log('DISPLAY TOGGLE', displayToggle);
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !displayToggle
        ) {
          dispatch(setGroupBy(false));
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, displayToggle]);

    return {};
  }

  return (
    <div ref={mainRef} style={{ marginBottom: '10px' }}>
      <div className="gropuBymainContainer">
        <div>
          <div className="gropuByLeftContainer">
            <div className="leftButtonGropuBy">
              {groupByOption === 'Name' && (
                <ButtonName name={`Name`} icon={<NameText />} />
              )}
              {groupByOption === 'AddGroup' && (
                <ButtonName name={`1 rule`} icon={<Group />} />
              )}
            </div>
            <p className="addTextGroupBy">+ Add New</p>
          </div>
        </div>
        <div className="gropuByRightContainer">
          <p className="resetText">Reset</p>
          <div className="RightButtonGropuBy">
            <ButtonName name={`Save for everyone`} icon={null} />
          </div>
        </div>
      </div>
      {displayToggle && groupByOption === 'Name' && (
        <NameComponent displayToggle={displayToggle} />
      )}
      {displayToggle && groupByOption === 'AddGroup' && (
        <AddGroup displayToggle={displayToggle} />
      )}
      {/* <AddGroup /> */}
    </div>
  );
};

export default GroupByComponent;
