import React from 'react';
import { CheckList, DownArrow, Flag, FoldedCard, FourDots, Sicon } from '../ListViewIcons';
import SkillBar from './SkillBar';
import CircularImageComponent from './CircularImageComponent';

const data = ['', ''];

const HeaderSubComp = ({title, siconNum, checkList}) => {
  let isActive = false
  return (
    <div className="flexVerticalCenter HeaderSubCompParent">
      <div className="flexVerticalCenter">
        <div className='iconsContainer'>
          <div><FourDots /></div>
          <div style={{
          transform: !isActive ? 'rotate(-90deg)' : '',
          transition: 'all 0.2s ease',
          marginLeft: '5px',
        }}><DownArrow /></div>
          <div className="textIcon22"></div>
        </div>
        <p style={{marginLeft: "16px"}}>{title}</p>
        <div className="flexVerticalCenter" style={{ marginLeft: '16px' }}>
          <Sicon />
        </div>
        <div style={{ marginLeft: '8px' }}>{siconNum}</div>
        <div style={{ marginLeft: '8px', color: 'rgba(123, 131, 136, 0.25)' }}>
          |
        </div>
        <div style={{ marginLeft: '8px' }}>+</div>
        <div style={{ marginLeft: '8px' }}>
          <CheckList />
        </div>
        <div style={{ marginLeft: '2px' }}>
          <span>{checkList?.checked}</span>/<span>{checkList?.total}</span>
        </div>
      </div>
      <div className="flexVerticalCenter">
        <div style={{ marginRight: '40px' }}>
          <SkillBar percentage={(checkList?.checked/checkList?.total)*100}/>
        </div>
        <div style={{ marginRight: '40px' }}>
          <CircularImageComponent images={data} />
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          <FoldedCard />
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          <Flag />
        </div>

        <p className='recContainer flexCenter'>Recurring</p>
      </div>
    </div>
  );
};

export default HeaderSubComp;
