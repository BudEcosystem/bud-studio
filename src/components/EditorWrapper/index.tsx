/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './tools';
import './Editor.css';
import {
  AddCover,
  AddIcon,
  TextIcon,
  ListIcon,
  Plus,
  TableIcon,
  CheckListIcon,
  HeadingIcon,
  ParagraphIcon,
} from './EditorIcons';
import { useSelector } from 'react-redux'

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'This is my awesome editor!',
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

function EditorWrapper(props) {
  const ejInstance = useRef();
  const editor1 = useRef<EditorJS>();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);
  const [coverUrl, setCoverUrl] = useState();
  const [coverUrlAvailable, setCoverUrlAvailable] = useState(true);
  const [iconUrl, setIconUrl] = useState();
  const { workspace }: any = useSelector((state) => state);
  const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(false);
  const { color } = workspace;
  const [render, setRender] = useState(false);
  const cursorRect = useRef<DOMRect>();
  const refHoverBar = useRef();
  const colorRef = useRef<any>('#9068fd');
  const [subHeadingContent, setSubHeadingContent] = useState(
    'Edit Subheading here...'
  );
  const [showDatabaseOptions, setShowDatabaseOptions] = useState(false)
  const [addNewEditorData, setAddNewEditorData] = useState("Untitled...")
  
  const [editorOptions, setEditorOptions] = useState([
    {
      key: 'database',
      icon: <TableIcon />,
      title: 'Database',
      subTitle: 'Add List, Kanban or Gantt Chart',
    },
    {
      key: 'header',
      icon: <HeadingIcon />,
      title: 'Heading',
      subTitle: 'Write a heading.',
    },
    {
      key: 'paragraph',
      icon: <ParagraphIcon />,
      title: 'Paragraph',
      subTitle: 'Write your words in paragraph.',
    },
    {
      key: 'quote',
      icon: <TextIcon />,
      title: 'Quote',
      subTitle: 'Write a quote.',
    },
    // ,{
    //   key: "link",
    //   icon: <TextIcon/>,
    //   title: "Link",
    //   subTitle: "Write a text as hyperlink."
    // }
    // ,{
    //   key: "checklist",
    //   icon: <CheckListIcon/>,
    //   title: "Checklist",
    //   subTitle: "Start a checklist."
    //  }
    {
      key: 'table',
      icon: <TableIcon />,
      title: 'Simple Table',
      subTitle: 'Start a clean table.',
    },
    {
      key: 'list',
      icon: <ListIcon />,
      title: 'List',
      subTitle: 'Jot down a list.',
    },
    {
      key: 'raw',
      icon: <TextIcon />,
      title: 'Raw HTML',
      subTitle: 'Write down some raw HTML code.',
    },
    {
      key: 'code',
      icon: <TextIcon />,
      title: 'Code',
      subTitle: 'Write some code in a block.',
    },
  ]);

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await ejInstance.current.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      tools: EDITOR_JS_TOOLS,
    });
  };

  const insertBlock = (opt: any) => {
    const blockTypes = Object.keys(ejInstance?.current?.configuration?.tools);
    const currentBlockIndex = ejInstance?.current?.blocks.getCurrentBlockIndex();
    console.log("CURRENT BLOCK INDEX", currentBlockIndex)
    if (opt && blockTypes.includes(opt) && currentBlockIndex!=-1) {
      ejInstance?.current?.blocks.insert(opt, currentBlockIndex+1);
      setShowEditorOptionsBlock(false);
    }
    if (opt && blockTypes.includes(opt) && currentBlockIndex==-1) {
      ejInstance?.current?.isReady.then(() => {
        ejInstance?.current?.saver.save().then(savedData => {
          const blockCount = savedData.blocks.length;
          console.log('Number of blocks:', blockCount);
          ejInstance?.current?.blocks.insert(opt, blockCount+2);
          setShowEditorOptionsBlock(false);
        }).catch(error => {
          console.error('Error getting block count:', error);
        });
      });
    }
    if(opt=="database") {
      setEditorOptions([
        {
          key: 'listview',
          icon: <HeadingIcon />,
          title: 'List View',
          subTitle: 'Choose List View',
        },
        {
          key: 'kanban',
          icon: <ParagraphIcon />,
          title: 'Kanban View',
          subTitle: 'Choose Kanban View',
        },
        {
          key: 'gantt',
          icon: <TextIcon />,
          title: 'Gantt Chart',
          subTitle: 'Choose Gantt Chart',
        },])
        setShowDatabaseOptions(true)
    }
  };

  const style = { '--bg-color': color };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showEditorOptionsBlock]);

  function EditorOptionComponent({
    opt,
    icon,
    title,
    subTitle,
    onItemsMouseEnter,
  }: any) {
    return (
      <div
        style={style}
        onClick={(e) => insertBlock(opt)}
        className="EditorOptionComponent"
        onMouseEnter={onItemsMouseEnter}
      >
        <div className="optionIcon">{icon}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          <div style={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>
            {title}
          </div>
          <div
            style={{ color: '#BBBBBB', fontSize: '12px', fontWeight: '400' }}
          >
            {subTitle}
          </div>
        </div>
      </div>
    );
  }

  const onItemsMouseEnter = (e: any) => {
    const top = e.currentTarget.offsetTop + 10;
    refHoverBar.current.style.transform = `translateY(${top}px)`;
  };

  const handleKeyDown = (event: any) => {
    if (
      event.code === 'Slash' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      setShowEditorOptionsBlock(!showEditorOptionsBlock);
    }
  };

  useEffect(() => {
    if (showEditorOptionsBlock) {
      setTimeout(() => {
        setRender(true);
      }, 100);
    } else {
      setRender(false);
    }
  }, [showEditorOptionsBlock]);

    const { activeElement } = document;
    cursorRect.current = activeElement?.getBoundingClientRect();

    useEffect(() => {
      if(showDatabaseOptions==false) {
        setEditorOptions([
          {
            key: 'database',
            icon: <TableIcon />,
            title: 'Database',
            subTitle: 'Add List, Kanban or Gantt Chart',
          },
          {
            key: 'header',
            icon: <HeadingIcon />,
            title: 'Heading',
            subTitle: 'Write a heading.',
          },
          {
            key: 'paragraph',
            icon: <ParagraphIcon />,
            title: 'Paragraph',
            subTitle: 'Write your words in paragraph.',
          },
          {
            key: 'quote',
            icon: <TextIcon />,
            title: 'Quote',
            subTitle: 'Write a quote.',
          },
          // ,{
          //   key: "link",
          //   icon: <TextIcon/>,
          //   title: "Link",
          //   subTitle: "Write a text as hyperlink."
          // }
          // ,{
          //   key: "checklist",
          //   icon: <CheckListIcon/>,
          //   title: "Checklist",
          //   subTitle: "Start a checklist."
          //  }
          {
            key: 'table',
            icon: <TableIcon />,
            title: 'Simple Table',
            subTitle: 'Start a clean table.',
          },
          {
            key: 'list',
            icon: <ListIcon />,
            title: 'List',
            subTitle: 'Jot down a list.',
          },
          {
            key: 'raw',
            icon: <TextIcon />,
            title: 'Raw HTML',
            subTitle: 'Write down some raw HTML code.',
          },
          {
            key: 'code',
            icon: <TextIcon />,
            title: 'Code',
            subTitle: 'Write some code in a block.',
          },
        ])
      }
    }, [showDatabaseOptions])


  return (

  <div className='editor'>
    {coverUrlAvailable ? (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${color}, white)`,
          }}
          className="editorCover"
        >
          <img src={coverUrl} />
          <div
            style={{
              position: 'relative',
              left: '82%',
              display: 'flex',
              width: '150px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              onClick={(e) => setCoverUrlAvailable(false)}
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                cursor: 'pointer',
                width: 'fit-content',
                height: '22px',
                background: 'rgba(40, 39, 44, 0.28)',
                borderRadius: '11px',
                display: 'grid',
                placeItems: 'center',
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              Remove
            </div>
            <div
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                cursor: 'pointer',
                width: 'fit-content',
                height: '22px',
                background: 'rgba(40, 39, 44, 0.28)',
                borderRadius: '11px',
                display: 'grid',
                placeItems: 'center',
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              Change Cover
            </div>
            {/* <div onClick={addNewEditorBlock} style={{cursor: "pointer", marginLeft: "100px"}}>Add New</div> */}
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => setCoverUrlAvailable(true)}
          style={{
            position: 'absolute',
            display: 'flex',
            left: '90%',
            width: 'fit-content',
            height: 'fit-content',
            color: '#333539',
            cursor: 'pointer',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <AddCover />
          </div>
          Add Cover
        </div>
      )}

      {!iconUrl ? (
        coverUrlAvailable ? (
          <div className="editorIcon">
            <img src={iconUrl} />
          </div>
        ) : (
          <div style={{ top: '10px', marginRight: "933px", marginBottom: "20px" }} className="editorIcon">
            <img src={iconUrl} />
          </div>
        )
      ) : (
        <div
          style={{
            fontSize: '14px',
            fontWeight: '500',
            marginRight: '910px',
            marginTop: '120px',
            display: 'flex',
            width: 'fit-content',
            color: '#333539',
            cursor: 'pointer',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <AddIcon />
          </div>
          Add Icon
        </div>
      )}

    <div className='editorjsDiv' id={EDITTOR_HOLDER_ID}></div>

    {showEditorOptionsBlock && (
            <div
              style={{
                top: `${
                  coverUrlAvailable
                    ? cursorRect.current.bottom > 750
                      ? '300'
                      : cursorRect?.current?.bottom - 140
                    : cursorRect.current.bottom > 650
                    ? '360'
                    : cursorRect?.current?.bottom - 140
                }px`,
                right: `${
                  cursorRect?.current?.bottom > 650 ? '160' : '120'
                }px`,
              }}
              className={`EditorOptionsBlock ${render ? 'show' : undefined}`}
            >
              {!showDatabaseOptions ? (<div
                style={{
                  marginLeft: '5px',
                  marginBottom: '10px',
                  marginTop: '5px',
                  overflow: 'auto',
                }}
              >
                Editor Block
              </div>) : (<div
                style={{
                  marginLeft: '5px',
                  marginBottom: '10px',
                  marginTop: '5px',
                  overflow: 'auto',
                  cursor: "pointer"
                }}
                onClick={() => setShowDatabaseOptions(false)}
              >
                Go Back
              </div>)} 

              <div className="editorOptionDiv">
                <div className="hoverMovement" ref={refHoverBar} />
                {editorOptions.map((option) => (
                  <EditorOptionComponent
                    opt={option.key}
                    icon={option.icon}
                    title={option.title}
                    subTitle={option.subTitle}
                    onItemsMouseEnter={onItemsMouseEnter}
                  />
                ))}
              </div>
            </div>
          )}
  </div>


  )
}
export default EditorWrapper;