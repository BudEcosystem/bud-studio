import React from 'react'

const SkillBar = ({percentage}) => {
  return (
    <div className='skillBar'>
        <div style={{width: `${percentage}%`, height: "100%", background: "#939AFF", borderRadius: "21px"}}></div>
    </div>
  )
}

export default SkillBar