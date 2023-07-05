import React, { useEffect, useRef } from 'react';
import { DownArrowName, ThreeDotsName } from './GropuByIcons';
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayToggle } from 'redux/slices/activestate';

const NameComponent = ({displayToggle}: any) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const { } = useOutsideAlerter(
      wrapperRef
    );
  
    function useOutsideAlerter(ref: any) {
  
      useEffect(() => {
        function handleClickOutside(event: any) {
           if (
            ref.current &&
            !ref.current.contains(event.target)
          ) { dispatch(setDisplayToggle(false));
          }
        }
  
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref]);
  
      return { };
    }
  return (
    <div ref={wrapperRef} className="dropDownContainer">
      <div className="nameMainContainer">
        <div className="nameContainer">
          <div className="titleContainer">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="nameText">Name</p>
              <div style={{ display: 'flex' }}>
                <p className="containsText">contains</p>
                <div>
                  <DownArrowName />
                </div>
              </div>
            </div>
            <div>
              <ThreeDotsName />
            </div>
          </div>
          <div className="nameSearchConatiner">
            <input type='text' className='inputName' placeholder='Type a value...' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameComponent;
