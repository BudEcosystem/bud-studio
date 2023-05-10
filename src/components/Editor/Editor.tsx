import React, { useEffect, useState } from 'react';
import './Editor.css';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote'
import Link from '@editorjs/link'
import CheckList from '@editorjs/checklist';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import List from '@editorjs/list';
import Raw from '@editorjs/raw';
import Code from '@editorjs/code';
import Embed from '@editorjs/embed'
import { AddCover, AddIcon } from './EditorIcons';
import { useSelector } from 'react-redux';

const Editor = () => {
    const [coverUrl, setCoverUrl] = useState();
    const [iconUrl, setIconUrl] = useState();
    const { workspace }: any = useSelector((state) => state);
    let { color } = workspace;

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
                        inlineToolbar: ['bold', 'italic', 'link', 'alignment', 'code', 'strikethrough']
                    }
                  },
            },
            data: {
                blocks: [
                  {
                    type: "header",
                    data: {
                        text: "How to evolve into a super human with your digital mind place",
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
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true
                  },
                quote: Quote,
                checklist: CheckList,
                link: Link,
                header: Header,
                table: Table,
                list: List,
                underline: Underline,
                raw: Raw,
                code: Code,
                embed: Embed,
            },
            data: {
                time: 1552744582955,
                blocks: [
                  {
                    type: "paragraph",
                    "data": {
                        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                      }
                  }
                ],
                version: "2.11.10"
              }
          });
    },[])

    const style = {'--bg-color': color}
    

  return (
    <div className='editor'>

        {!coverUrl ? 
        <div style={{backgroundImage: `linear-gradient(to bottom right, ${color}, white)`}} className='editorCover'>
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

            <div style={style} className='editorHeadingDiv'>
             <div className='editorjsHeading' id="editorjs" >
             </div>
             </div>

            <div className='editorParaDiv'>
            <div className='editorjsPara' id="editorjs2">
            </div>
            </div>


            <div className='editorMoreOptions'>
                Press “<span style={{color: "white"}}>@</span>” for bud , “<span style={{color: "white"}}>/</span>”  for editor blocks
            </div>
             
    </div>
  )
}

export default Editor