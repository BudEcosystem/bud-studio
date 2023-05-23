import React from 'react';
import HeaderSubComp from '../HeaderSubComp';

const SubAccordion = ({ data }) => {
    console.log("asd", data.childs)
  return (
    <div className="subAccordionParent">
      <div className='headerSubComponentContainer'>
        <HeaderSubComp
          title={data?.title}
          siconNum={data?.siconValue}
          checkList={data?.checklist}
        />
      </div>
    </div>
  );
};

export default SubAccordion;
