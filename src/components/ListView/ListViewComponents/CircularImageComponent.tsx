import React from 'react'

const CircularImageComponent = ({images = []}) => {
  return (
    <div className='circularImageContainer'>
    {images.map(item => (<div className='imgCircular'></div>))}
    <div className='imgCircular imgCircularTxt'>+8</div>
    </div>
  )
}

export default CircularImageComponent