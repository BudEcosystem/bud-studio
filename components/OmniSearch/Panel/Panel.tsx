import React from 'react'
import PanelOption from './PanelOption/PanelOption'
import {Pin, Bookmark, FullScreen, Reload} from './PanelOption/PanelSvgIcons'

const Panel = () => {
  return (
    <div className='Panel'>
        <div className='PanelResults'>482 results</div>

        <div className='PanelOptions'>
            <PanelOption icon={<Pin/>} name={"Pin Tab"} description={"Pin in the current tab"} />
            <PanelOption icon={<Bookmark/>} name={"Bookmark"} description={"Create a bookmark"} />
            <PanelOption icon={<FullScreen/>} name={"Fullscreen"} description={"Make the page fullscreen"} />
            <PanelOption icon={<Reload/>} name={"Reload"} description={"Reload the page"} />
        </div>

    </div>
  )
}

export default Panel