import React, { useEffect, useState } from 'react';
import './Editor.css';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import { AddCover, AddIcon } from './EditorIcons';

const Editor = () => {
    const [coverUrl, setCoverUrl] = useState();
    const [iconUrl, setIconUrl] = useState();

    useEffect(() => {
        const editor1 = new EditorJS({
            holder: 'editorjs',
            onReady: () => {console.log('Editor.js is ready to work!')},
            tools: { 
                header: {
                    class: Header,
                    inlineToolbar: true,
                    config: {
                        // Add strikethrough and code formatting options to the inline toolbar
                        inlineToolbar: ['bold', 'italic', 'link', 'strikethrough', 'code']
                    }
                  }
            },
            data: {
                time: 1552744582955,
                blocks: [
                  {
                    type: "header",
                    "data": {
                        "text": "Type your Heading here!",
                        "level": 2
                      }
                  }
                ],
                version: "2.11.10"
              }
          });

          const editor2 = new EditorJS({
            holder: 'editorjs2',
            onReady: () => {console.log('Editor.js 2 is ready to work!')},
            tools: { 
                header: {
                    class: Header,
                    inlineToolbar: true
                  }
            },
            data: {
                time: 1552744582955,
                blocks: [
                  {
                    type: "paragraph",
                    "data": {
                        "text": "Type subpara here!",
                      }
                  }
                ],
                version: "2.11.10"
              }
          });
    },[])
    

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

            {/* <div className='editorHeading'>
                <h2 contentEditable="true">Type your Heading here</h2>
            </div> */}

            <div className='editorHeadingDiv'>
             <div className='editorjsHeading' id="editorjs" >
             </div>
             </div>

            <div className='editorParaDiv'>
            <div className='editorjsPara' id="editorjs2">
            </div>
            </div>
             
    </div>
  )
}

export default Editor