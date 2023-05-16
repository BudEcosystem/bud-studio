import React from 'react';
import { CheckList, Flag, FoldedCard, Sicon } from '../ListViewIcons';
import SkillBar from './SkillBar';
import CircularImageComponent from './CircularImageComponent';

const data = ['', ''];

const HeaderSubComp = ({name}) => {
  return (
    <div className="flexVerticalCenter HeaderSubCompParent">
      <div className="flexVerticalCenter">
        <p>Check for any appointments or meetings</p>
        <div className="flexVerticalCenter" style={{ marginLeft: '16px' }}>
          <Sicon />
        </div>
        <div style={{ marginLeft: '8px' }}>2</div>
        <div style={{ marginLeft: '8px', color: 'rgba(123, 131, 136, 0.25)' }}>
          |
        </div>
        <div style={{ marginLeft: '8px' }}>+</div>
        <div style={{ marginLeft: '8px' }}>
          <CheckList />
        </div>
        <div style={{ marginLeft: '2px' }}>
          <span>2</span>/<span>{name}</span>
        </div>
      </div>
      <div className="flexVerticalCenter">
        <div style={{ marginRight: '40px' }}>
          <SkillBar />
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
