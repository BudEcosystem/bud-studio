import React, { useEffect, useRef, useState } from 'react';
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
import { AddCover, AddIcon, TextIcon, ListIcon, Plus, TableIcon, CheckListIcon, HeadingIcon, ParagraphIcon  } from './EditorIcons';
import { useSelector } from 'react-redux';

const Editor = () => {
    const [coverUrl, setCoverUrl] = useState();
    const [coverUrlAvailable, setCoverUrlAvailable] = useState(true)
    const [iconUrl, setIconUrl] = useState();
    const { workspace }: any = useSelector((state) => state);
    const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(false)
    let { color } = workspace;
    const Header = require("editorjs-header-with-alignment");
    const editor1 = useRef<EditorJS>()
    const editor2 = useRef<EditorJS>()
    const [render,setRender] = useState(false)
    const cursorRect = useRef<DOMRect>()
    
    const [editorOptions,setEditorOptions] = useState([
      {
        key: "header",
        icon: <HeadingIcon/>,
        title: "Heading",
        subTitle: "Write a heading."
      },{
      key: "paragraph",
      icon: <ParagraphIcon/>,
      title: "Paragraph",
      subTitle: "Write your words in paragraph."
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
      icon: <CheckListIcon/>,
      title: "Checklist",
      subTitle: "Start a checklist."
    },{
      key: "table",
      icon: <TableIcon/>,
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

      editor1.current = new EditorJS({
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

       editor2.current = new EditorJS({
        holder: 'editorjs2',
        autofocus: true,
        onReady: () => {console.log('Editor.js 2 is ready to work!')},
        tools: { 
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
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
                    "text": "Lorem ipsum dolor @alicia sit amet, #consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                  }
              }
            ],
            version: "2.11.10"
          }
      });

    },[]);

    const insertBlock = (opt: any) => {
      console.log("OPT IS", opt)
      var blockTypes = Object.keys(editor2?.current?.configuration?.tools);
      const currentBlockIndex = editor2?.current?.blocks.getCurrentBlockIndex();
      console.log("BLOCK TYPES", blockTypes)
      if (opt && blockTypes.includes(opt) && currentBlockIndex) {
        editor2?.current?.blocks.insert(opt, currentBlockIndex + 3)
        setShowEditorOptionsBlock(false)
      }
  }

    const handleKeyDown = (event: any) => {
      if (event.code === 'Slash' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
        setShowEditorOptionsBlock(!showEditorOptionsBlock)
       }
    }

    useEffect(()=> {
      editor2?.current?.isReady.then(() => {
        const paraElement = document.querySelector(".ce-paragraph");
        if(paraElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = paraElement?.textContent;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        console.log(text);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            console.log(`Found @${word}`);
            // Apply styling to the matched text
            const styledText = text?.replace(match, `<span style="color: white;">@${word}</span>`); 
            if (matches2) {
              matches2.forEach((match) => {
                const word = match.slice(1);
                console.log(`Found #${word}`);
                // Apply styling to the matched text
                const styledText2 = styledText?.replace(match, `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${color};"><span style="display: none;">#</span>${word}</span>`); 
                paraElement.innerHTML = styledText2;
              });
          }else {
            paraElement.innerHTML = styledText;
          }});
        }
       else if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            console.log(`Found @${word}`);
            // Apply styling to the matched text
            const styledText = text?.replace(match, `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${color};"><span style="display: none;">#</span>${word}</span>`); 
            paraElement.innerHTML = styledText;
          });
        }
        else {}

        editor1.current?.save().then((outputData) => {
          console.log("OUTPUT DATA",outputData);
        }).catch((error) => {
          console.error('Error while saving data:', error);
        });

        editor2.current?.save().then((outputData) => {
          console.log("OUTPUT DATA",outputData);
        }).catch((error) => {
          console.error('Error while saving data:', error);
        });
      }
        })
    },[color])

    useEffect(() => {
      if (showEditorOptionsBlock) {
        setTimeout(() => {
          setRender(true);
        }, 100);
      } else {
        setRender(false);
      }
    }, [showEditorOptionsBlock]);

      editor2.current?.isReady.then(() => {
        const activeElement = document.activeElement;
        cursorRect.current = activeElement?.getBoundingClientRect();
        console.log("POSITION OF CURSOR", cursorRect?.current?.left)
      })




    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    },[showEditorOptionsBlock])


    const EditorOptionComponent = ({opt,icon, title, subTitle}: any) => {
      return (
        <div style={style} onClick={(e) => insertBlock(opt)} className='EditorOptionComponent'>
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

        {coverUrlAvailable ? 
        <div style={{backgroundImage: `linear-gradient(to bottom right, ${color}, white)`}} className='editorCover'>
            <img src={coverUrl} />
            <div style={{position: "absolute", left: "70%", display: "flex", width: "150px", alignItems: "center", justifyContent: 'space-between'}}>
            <div onClick={e => setCoverUrlAvailable(false)} style={{paddingLeft: "10px", paddingRight: "10px", cursor: "pointer", width: "fit-content", height: "22px", background: "rgba(40, 39, 44, 0.28)", borderRadius: "11px", display: "grid", placeItems: "center", fontSize: "10px", fontWeight: "400"}}>Remove</div>
            <div style={{paddingLeft: "10px", paddingRight: "10px", cursor: "pointer", width: "fit-content", height: "22px", background: "rgba(40, 39, 44, 0.28)", borderRadius: "11px", display: "grid", placeItems: "center", fontSize: "10px", fontWeight: "400"}}>Change Cover</div>
            </div>
        </div> :
              <div onClick={e => setCoverUrlAvailable(true)} style={{position: "absolute", display: "flex", left: "90%", width: "fit-content", height: "fit-content", color: "#333539", cursor: "pointer"}}>
                <div style={{marginRight: "10px"}}><AddCover/></div> 
                Add Cover
              </div> }

            {!iconUrl ? 
              coverUrlAvailable ?
                (<div className='editorIcon'>
                    <img src={iconUrl} />   
                </div>) : (<div style={{top: "10px"}} className='editorIcon'><img src={iconUrl} /></div>)
                : 
                <div style={{fontSize: "14px", fontWeight: "500", marginRight: "910px", marginTop: "120px",  display: "flex", width: "fit-content", color: "#333539", cursor: "pointer"}}>
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
              <div onClick={(e) => setShowEditorOptionsBlock(!showEditorOptionsBlock)} style={{marginTop: "2px", cursor:"pointer",marginRight: "20px"}}><Plus/></div>  Press “<div style={{color: "white"}}>@</div>” for bud , “<div style={{color: "white"}}>/</div>”  for editor blocks.

                {showEditorOptionsBlock && 
                <div style={{top: `${coverUrlAvailable ? cursorRect.current.bottom > 650 ? "580": cursorRect?.current?.bottom - 140 : cursorRect.current.bottom > 650 ? "360" : cursorRect?.current?.bottom - 140 }px`, right: `${cursorRect?.current?.bottom > 650 ? undefined: "120" }px`}} className={`EditorOptionsBlock ${render ? 'show' : undefined}`}>
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