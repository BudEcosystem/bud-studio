import React, { useEffect, useState } from 'react';
import './Editor.css';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote'
import Link from '@editorjs/link'
import CheckList from '@editorjs/checklist';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import List from '@editorjs/list';
import Raw from '@editorjs/raw';
import Code from '@editorjs/code';
import Embed from '@editorjs/embed';
import Strikethrough from '@sotaproject/strikethrough';
import { AddCover, AddIcon, TextIcon, ListIcon } from './EditorIcons';
import { useSelector } from 'react-redux';

const Editor = () => {
    const [coverUrl, setCoverUrl] = useState();
    const [iconUrl, setIconUrl] = useState();
    const { workspace }: any = useSelector((state) => state);
    const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(false)
    let { color } = workspace;
    const Header = require("editorjs-header-with-alignment");
    
    const [editorOptions,setEditorOptions] = useState([{
      key: "text",
      icon: <TextIcon/>,
      title: "Text",
      subTitle: "Write in plane text."
    },{
      key: "quote",
      icon: <TextIcon/>,
      title: "Quote",
      subTitle: 'Write a quote.'
    },{
      key: "link",
      icon: <TextIcon/>,
      title: "Link",
      subTitle: "Write a text as hyperlink."
    },{
      key: "checklist",
      icon: <TextIcon/>,
      title: "Checklist",
      subTitle: "Start a checklist."
    },{
      key: "heading",
      icon: <TextIcon/>,
      title: "Heading",
      subTitle: "Write a heading."
    },{
      key: "table",
      icon: <TextIcon/>,
      title: "Simple Table",
      subTitle: "Start a clean table."
    },
    {
      key: "list",
      icon: <ListIcon/>,
      title: "List",
      subTitle: "Jot down a list."
    },
    {
      key: "raw",
      icon: <TextIcon/>,
      title: "Raw HTML",
      subTitle: "Write down some raw HTML code."
    },
    {
      key: "code",
      icon: <TextIcon/>,
      title: "Code",
      subTitle: "Write some code in a block."
    },])

    useEffect(() => {
      const editor1 = new EditorJS({
        holder: 'editorjs',
        onReady: () => {console.log('Editor.js is ready to work!')},
        tools: { 
            header: {
                class: Header,
                inlineToolbar: true,
              },
              strikethrough: Strikethrough,
              underline: Underline,
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
            strikethrough: Strikethrough,
        },
        data: {
            time: 1552744582955,
            blocks: [
              {
                type: "paragraph",
                "data": {
                    "text": "Lorem ipsum dolor @alicia sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                  }
              }
            ],
            version: "2.11.10"
          }
      });

       
      // editor2.isReady.then(() => {
      //   const editorHolder = document.querySelector('.ce-block__content');
      //   if (editorHolder) {
      //     editorHolder.addEventListener('input', function(event) {
      //       const paragraph = event.target.closest('.ce-block__content');
      //       if (paragraph && paragraph.classList.contains('ce-block__content')) {
      //         const text = paragraph.textContent;
      //         const index = text.indexOf('@');
      //         if (index !== -1) {
      //           console.log(`@ symbol found at index ${index} in paragraph: ${text}`);
      //         }
      //       }
      //     });
      //   }
      // });

      // document.addEventListener('keydown', function(event) {
      //   if (event.code === 'Slash' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      //     setShowEditorOptionsBlock(!showEditorOptionsBlock)
      //     var blockTypes = Object.keys(editor2.configuration.tools);
      //     var selectedType = prompt('Select a block type (' + blockTypes.join(', ') + '):');
      //     if (selectedType && blockTypes.includes(selectedType)) {
      //       editor2.blocks.insert(selectedType);
      //     }
      //   }
      // });



    },[])

    const handleKeyDown = (event: any) => {
      if (event.code === 'Slash' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
        setShowEditorOptionsBlock(!showEditorOptionsBlock)
       }
    }

     const insertBlock = (opt: any) => {
        console.log("OPT IS", opt)
        var blockTypes = Object.keys(editor2.configuration.tools);
        if (opt && blockTypes.includes(opt)) {
          editor2.blocks.insert(opt);
          setShowEditorOptionsBlock(false)
        }
    }

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    },[showEditorOptionsBlock])


    const EditorOptionComponent = ({opt,icon, title, subTitle}: any) => {
      return (
        <div onClick={(e) => insertBlock(opt)} className='EditorOptionComponent'>
          <div className='optionIcon'>{icon}</div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "10px", cursor: "pointer"}}>
            <div style={{color: "white", fontSize: "16px", fontWeight: "400"}}>{title}</div>
            <div style={{color: "#BBBBBB", fontSize: "12px", fontWeight: "400"}}>{subTitle}</div>
          </div>
          
        </div>
      )
    }

    const style = {'--bg-color': color}
    

  return (
    <div className='editor'>

        {coverUrl ? 
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

            {iconUrl ? 
                <div className='editorIcon'>
                    <img src={iconUrl} />   
                </div>
                : 
                <div style={{fontSize: "14px", fontWeight: "500", marginRight: "910px", marginTop: "30px",  display: "flex", width: "fit-content", color: "#333539", cursor: "pointer"}}>
                    <div style={{marginRight: "10px"}}><AddIcon/></div> 
                    Add Icon
                </div>
            }

            <div style={style} className='editorHeadingDiv'>
             <div className='editorjsHeading' id="editorjs" >
             </div>
             </div>

            <div className='editorParaDiv'>
            <div className='editorjsPara' id="editorjs2">
            </div>
            <div className='editorMoreOptions'>
                Press “<div style={{color: "white"}}>@</div>” for bud , “<div style={{color: "white"}}>/</div>”  for editor blocks.

                {showEditorOptionsBlock && 
                <div className='EditorOptionsBlock'>
                  <div style={{marginLeft: "5px", marginBottom: "20px", marginTop: "5px", overflow:"auto"}}>Editor Block</div>
                  
                  <div className='editorOptionDiv'>
                  {editorOptions.map((option) => (
                    <EditorOptionComponent opt={option.key} icon={option.icon} title={option.title} subTitle={option.subTitle} />
                  ))}
                  </div>
              </div>}


            </div>
            </div>


             
    </div>
  )
}

export default Editor