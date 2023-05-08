import React, { useState } from 'react';
import './Editor.css';
import { AddCover, AddIcon } from './EditorIcons';

const Editor = () => {
    const [coverUrl, setCoverUrl] = useState();
    const [iconUrl, setIconUrl] = useState();

  return (
    <div className='editor'>

        {!coverUrl ? 
        <div className='editorCover'>
            <img src={coverUrl} />
            <div style={{position: "absolute", left: "70%", display: "flex", width: "150px", alignItems: "center", justifyContent: 'space-between'}}>
            <div style={{paddingLeft: "10px", paddingRight: "10px", cursor: "pointer", width: "fit-content", height: "22px", background: "rgba(40, 39, 44, 0.28)", borderRadius: "11px", display: "grid", placeItems: "center", fontSize: "10px", fontWeight: "400"}}>Remove</div>
            <div style={{paddingLeft: "10px", paddingRight: "10px", cursor: "pointer", width: "fit-content", height: "22px", background: "rgba(40, 39, 44, 0.28)", borderRadius: "11px", display: "grid", placeItems: "center", fontSize: "10px", fontWeight: "400"}}>Change Cover</div>
            </div>
        </div> :
              <div style={{position: "absolute", display: "flex", left: "90%", width: "fit-content", height: "fit-content", color: "#333539", cursor: "pointer"}}>
                <div style={{marginRight: "10px"}}><AddCover/></div> 
                Add Cover
              </div> }

            {!iconUrl ? 
                <div className='editorIcon'>
                    <img src={iconUrl} />   
                </div>
                : 
                <div style={{fontSize: "14px", fontWeight: "500", marginRight: "910px", marginTop: "30px",  display: "flex", width: "fit-content", color: "#333539", cursor: "pointer"}}>
                    <div style={{marginRight: "10px"}}><AddIcon/></div> 
                    Add Icon
                </div>
            }
        
    </div>
  )
}

export default Editor