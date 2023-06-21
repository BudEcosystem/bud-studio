import React, { useEffect, useRef, useState } from 'react';
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
    FileIcon,
    BackButton,
  } from './EditorIcons';
import { useSelector } from 'react-redux';
import './Editor.css'

const ActionMenu = () => {

    const { workspace }: any = useSelector((state) => state);
    const { color } = workspace;
    const style = { '--bg-color': color };
    const [workspaceFiles, setWorkspaceFiles] = useState(workspace.workSpaceDocs);
    const [showDatabaseOptions, setShowDatabaseOptions] = useState(false);
    const [showDocumentOptions, setShowDocumentOptions] = useState(false);
    const [showFirstOptions, setShowFirstOptions] = useState(true);
    const [render, setRender] = useState(true);
    const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(true);
    const refHoverBar = useRef();

    const [editorOptions, setEditorOptions] = useState([
        {
          key: 'database',
          icon: <TableIcon />,
          title: 'Database',
          subTitle: 'Add List, Kanban and more...',
          id: '',
        },
        {
          key: 'document',
          icon: <ListIcon />,
          title: 'Link Document',
          subTitle: 'Link to another document',
          id: '',
        },
        {
          key: 'header',
          icon: <HeadingIcon />,
          title: 'Heading',
          subTitle: 'Write a heading.',
          id: '',
        },
        {
          key: 'paragraph',
          icon: <ParagraphIcon />,
          title: 'Paragraph',
          subTitle: 'Write your words in paragraph.',
          id: '',
        },
        {
          key: 'quote',
          icon: <TextIcon />,
          title: 'Quote',
          subTitle: 'Write a quote.',
          id: '',
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
          id: '',
        },
        {
          key: 'list',
          icon: <ListIcon />,
          title: 'List',
          subTitle: 'Jot down a list.',
          id: '',
        },
        {
          key: 'raw',
          icon: <TextIcon />,
          title: 'Raw HTML',
          subTitle: 'Write down some raw HTML code.',
          id: '',
        },
        {
          key: 'code',
          icon: <TextIcon />,
          title: 'Code',
          subTitle: 'Write some code in a block.',
          id: '',
        },
      ]);
      
    const onItemsMouseEnter = (e: any) => {
        const top = e.currentTarget.offsetTop + 10;
        refHoverBar.current.style.transform = `translateY(${top}px)`;
      };

      function EditorOptionComponent({
        opt,
        icon,
        title,
        subTitle,
        id,
        onItemsMouseEnter,
      }: any) {
        // const blockIndex = ejInstance?.current?.blocks.getCurrentBlockIndex();
        return (
          <div
            style={style}
            onClick={() => insertBlock(opt, title, id)}
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

      useEffect(() => {
        if (showFirstOptions == true) {
          setEditorOptions([
            {
              key: 'database',
              icon: <TableIcon />,
              title: 'Database',
              subTitle: 'Add List, Kanban and more...',
              id: '',
            },
            {
              key: 'document',
              icon: <ListIcon />,
              title: 'Link Document',
              subTitle: 'Link to another document',
              id: '',
            },
            {
              key: 'header',
              icon: <HeadingIcon />,
              title: 'Heading',
              subTitle: 'Write a heading.',
              id: '',
            },
            {
              key: 'paragraph',
              icon: <ParagraphIcon />,
              title: 'Paragraph',
              subTitle: 'Write your words in paragraph.',
              id: '',
            },
            {
              key: 'quote',
              icon: <TextIcon />,
              title: 'Quote',
              subTitle: 'Write a quote.',
              id: '',
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
              id: '',
            },
            {
              key: 'list',
              icon: <ListIcon />,
              title: 'List',
              subTitle: 'Jot down a list.',
              id: '',
            },
            {
              key: 'raw',
              icon: <TextIcon />,
              title: 'Raw HTML',
              subTitle: 'Write down some raw HTML code.',
              id: '',
            },
            {
              key: 'code',
              icon: <TextIcon />,
              title: 'Code',
              subTitle: 'Write some code in a block.',
              id: '',
            },
          ]);
        }
      }, [showFirstOptions]);

      const insertBlock = (opt: any, title: any, id: any) => {
    
        if (opt === 'database') {
          setEditorOptions([
            {
              key: 'listview',
              icon: <HeadingIcon />,
              title: 'List View',
              subTitle: 'Choose List View',
              id: '',
            },
            {
              key: 'kanban',
              icon: <ParagraphIcon />,
              title: 'Kanban View',
              subTitle: 'Choose Kanban View',
              id: '',
            },
            {
              key: 'tableview',
              icon: <TableIcon />,
              title: 'Table View',
              subTitle: 'Choose Table View',
              id: '',
            },
            {
              key: 'timeline',
              icon: <TextIcon />,
              title: 'Timeline View',
              subTitle: 'Coming soon',
              id: '',
            },
          ]);
          setShowDatabaseOptions(true);
          setShowFirstOptions(false);
        }
        if (opt == 'document') {
          const listofFiles: any = [];
          workspaceFiles.map((file: any) => {
            let obj = {
              key: 'file',
              icon: <FileIcon />,
              title: file.name,
              subTitle: `Link ${file.name} to this block`,
              id: file.uuid,
            };
            listofFiles.push(obj);
          });
          setEditorOptions(listofFiles);
          setShowDocumentOptions(true);
          setShowFirstOptions(false);
        }
      };

  return (
    <div>
        {showEditorOptionsBlock && (
        <div
          id="editorOptionBlockID"
          className={`EditorOptionsBlock ${render ? 'show' : undefined}`}
        >
          {showFirstOptions ? (
            <div
              style={{
                marginLeft: '5px',
                marginBottom: '10px',
                marginTop: '5px',
                overflow: 'auto',
              }}
            >
              Editor Block
            </div>
          ) : (
            <div
              style={{
                marginLeft: '5px',
                marginBottom: '10px',
                marginTop: '5px',
                overflow: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => setShowFirstOptions(true)}
            >
              <BackButton />
              <span style={{marginLeft: "5px"}}>Go Back</span>
            </div>
          )}

          <div className="editorOptionDiv">
            <div className="hoverMovement" ref={refHoverBar} />
            {editorOptions.map((option) => (
              <EditorOptionComponent
                opt={option.key}
                icon={option.icon}
                title={option.title}
                subTitle={option.subTitle}
                id={option.id}
                onItemsMouseEnter={onItemsMouseEnter}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionMenu