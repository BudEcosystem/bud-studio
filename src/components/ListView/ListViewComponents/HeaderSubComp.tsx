import React from 'react';
import {
  BoxArrow,
  CheckList,
  DownArrow,
  Flag,
  FoldedCard,
  FourDots,
  Sicon,
  SmallerFlag,
  User,
} from '../ListViewIcons';
import SkillBar from './SkillBar';
import CircularImageComponent from './CircularImageComponent';
import CircularBorder from './CircularBorder';

const data = ['', ''];

function HeaderSubComp({
  data,
  subChild,
  provided,
  expanded,
  toggleSubAccordion,
}) {
  return (
    <div className="flexVerticalCenter HeaderSubCompParent">
      <div className="flexVerticalCenter">
        <div className="iconsContainer">
          <div
            {...provided?.dragHandleProps}
            style={{
              display: subChild ? 'none' : '',
            }}
          >
            <FourDots />
          </div>
          <div
            style={{
              transform: !expanded ? 'rotate(-90deg)' : '',
              transition: 'all 0.2s ease',
              marginLeft: '5px',
            }}
            onClick={() => toggleSubAccordion()}
          >
            <DownArrow />
          </div>
          <div className="textIcon22" />
        </div>
        <p style={{ marginLeft: '16px' }}>{data.title}</p>
        <div className="flexVerticalCenter" style={{ marginLeft: '16px' }}>
          <Sicon />
        </div>
        <div style={{ marginLeft: '8px' }}>{data.siconValue}</div>
        <div style={{ marginLeft: '8px', color: 'rgba(123, 131, 136, 0.25)' }}>
          |
        </div>
        <div style={{ marginLeft: '8px' }}>+</div>
        <div style={{ marginLeft: '8px' }}>
          <CheckList />
        </div>
        <div style={{ marginLeft: '2px' }}>
          <span>{data.checklist?.checked}</span>/
          <span>{data.checklist?.total}</span>
        </div>
      </div>
      <div className="flexVerticalCenter">
        <div style={{ marginRight: '40px' }}>
          <SkillBar
            percentage={(data.checklist?.checked / data.checklist?.total) * 100}
          />
        </div>
        <div style={{ marginRight: '40px' }}>
          {data?.imagesData?.length > 0 ? (
            <CircularImageComponent images={data.imagesData} />
          ) : (
            <CircularBorder icon={<User />} />
          )}
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          {data.page ? (
            <FoldedCard />
          ) : (
            <CircularBorder icon={<FoldedCard />} />
          )}
        </div>
        <div className="flexCenter" style={{ marginRight: '40px' }}>
          {data.flag ? <Flag /> : <CircularBorder icon={<SmallerFlag />} />}
        </div>

        {data.recurring ? (
          <p className="recContainer flexCenter">Recurring</p>
        ) : (
          <CircularBorder icon={<BoxArrow />} />
        )}
      </div>
    </div>
  );
}

export default HeaderSubComp;
