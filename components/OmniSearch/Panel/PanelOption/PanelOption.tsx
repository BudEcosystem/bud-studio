import React from 'react'

const PanelOption = ({icon, name, description}) => {
  return (
    <div className='PanelOption'>

        <div className='PanelOptionIcon'>
            {icon}
        </div>

        <div className='PanelOptionTexts'>
        <div className='PanelOptionName'>
            {name}
        </div>
        <div className='PanelOptionDesc'>
        {description}
        </div>
        </div>
       
    </div>
  )
}

export default PanelOption