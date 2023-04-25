import React, { useState } from 'react';
import { Pin, Dots, Drag, SearchIcon } from './WorkspaceIcons';

const WorkspaceModal = ({name,color}) => {

    const [showColorPin, setShowColorPin] = useState(false);
    const [showColorDots, setShowColorDots] = useState(false);
    
  return (
    <div className="WorkspaceModal">

        <div className='WorkspaceModalTop'>
            <div style={{display: "flex", alignItems: "center"}}>
                <Drag/>
                <div style={{backgroundColor: `${color}`, width: "12px",  height:"12px", borderRadius: "4px", marginRight: "10px", marginLeft: "10px"}}></div>
                <div style={{width: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color:  "#C6C6C6", fontWeight: "400", fontSize: "14px"}}>{name}</div>
            </div>

            <div style={{display: "flex", alignItems: "center"}}>
                <div onClick={() => {setShowColorPin(!showColorPin)}} style={{background : `${showColorPin ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${color} 57.81%, rgba(175, 147, 218, 0.05) 100%)` : ""}`}}  className="WorkspaceIconBox">
                    <div className='WorkspaceIcon'><Pin/></div>
                </div>
                
                <div onClick={() => {setShowColorDots(!showColorDots)}} style={{background : `${showColorDots ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${color} 57.81%, rgba(175, 147, 218, 0.05) 100%)` : ""}`}}  className="WorkspaceIconBox">
                    <div className='WorkspaceIcon'><Dots/></div>
                </div>
            </div>
            
        </div>

        <div className='WorkspaceSearchBar'>
        <div style={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
            <SearchIcon />
            </div>
            <input 
            className='WorkspaceSearchInput' 
            type="text"
            placeholder='Search'
            />
            </div>
        
    </div>
  )
}

export default WorkspaceModal