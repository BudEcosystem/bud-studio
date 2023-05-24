import React, { useEffect, useRef, useState } from 'react';
import { DateLogo } from '../ListViewIcons';
import '../ListView.css';
import CircularImageComponent from './CircularImageComponent';
import NewTaskPanel from './NewTaskPanel';
import { useSelector } from 'react-redux';

const imagesArray: Array<any> = ['', '', ''];

function OptionsComponent({ isSticky }) {
  // const { content }: any = useSelector((state) => state);
  // const { contentRef } = content;
  const kabuniRef = useRef(null);
  // const contentRef = useRef(null);

  const [isSticky2, setIsSticky] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const containerTop = contentRef.getBoundingClientRect().top;
  //     const kabuniTop = kabuniRef.current.getBoundingClientRect().top;
  //     setIsSticky(kabuniTop <= 95);
  //   };

  //   contentRef?.addEventListener('scroll', handleScroll);
  //   return () => {
  //     contentRef?.removeEventListener('scroll', handleScroll);
  //   };
  // }, [contentRef, kabuniRef]);
  return (
    <div className="optionsComponentParentContainer" ref={kabuniRef}>
      <div className="optionsComponentParent">
        <div className="dateContainer">
          <div className="flexCenter">
            <DateLogo />
          </div>
          <p className="dateText">13 June 2023</p>
        </div>
        <div className="circularImageComponentContainer">
          <CircularImageComponent images={imagesArray} />
        </div>
      </div>
      <div className={`${isSticky2 ? 'sticky2' : ''}`}>
        <NewTaskPanel />
      </div>
    </div>
  );
}

export default OptionsComponent;
