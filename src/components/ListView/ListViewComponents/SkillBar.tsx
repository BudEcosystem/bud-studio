import React from 'react'
import { useSelector } from 'react-redux';

const SkillBar = ({percentage}) => {
  const {workspace}:any = useSelector(state=>state)
  let { color } = workspace
  return ( 
    <div className='skillBar'>
        <div style={{width: `${percentage}%`, height: "100%", background: color, borderRadius: "21px"}}></div>
    </div>
  )
}

export default SkillBar