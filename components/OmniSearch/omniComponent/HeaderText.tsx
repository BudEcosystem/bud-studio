import React from 'react';

const HeaderText: React.FC<any> = ({textString, opacity}) => {
  return (
    <>
      <p style={{opacity: `${opacity}%`}}>{textString}</p>
    </>
  )
}

export default HeaderText