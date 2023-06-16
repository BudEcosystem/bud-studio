/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './tools';
import './Editor.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWorkSpaceApplications,
  changeColor,
  setApplicationData,
  setCurrentSelectedDocument,
  setEditorInitialised,
} from 'redux/slices/workspace';
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
import {
  setCurrentSelectedUI,
  setNavigationPath,
  setNodeIDs,
  setSelectedOption,
} from 'redux/slices/activestate';
import { v4 as uuidv4 } from 'uuid';
import bgImage from './bgImage.png';
import iconImage from './iconImage.png';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'Untitled...',
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

function EditorWrapper () {
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState(null);
  const [coverUrl, setCoverUrl] = useState(bgImage);
  const [coverUrlAvailable, setCoverUrlAvailable] = useState(true);
  const [iconUrl, setIconUrl] = useState(iconImage);
  const [iconAvailable, setIconAvailable] = useState(true)
  const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(false);
  const { tree, workspace }: any = useSelector((state) => state);
  const {
    color,
    currentWorkspace,
    currentSelectedDocId,
    applicationData,
    editorInitialised,
  } = workspace;
  const [render, setRender] = useState(false);
  const cursorRect = useRef<DOMRect>();
  const refHoverBar = useRef();
  const colorRef = useRef<any>('#9068fd');
  const dispatch = useDispatch();
  const [showDatabaseOptions, setShowDatabaseOptions] = useState(false);
  const [showDocumentOptions, setShowDocumentOptions] = useState(false);
  const [showFirstOptions, setShowFirstOptions] = useState(true);
  const [workspaceFiles, setWorkspaceFiles] = useState(workspace.workSpaceDocs);
  const [workspaceItems, setWorkspaceItems] = useState(
    workspace.workSpaceItems
  );
  const [currentFileName, setCurrentFileName] = useState('');

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
  // for checking if the particular editor has somedata

  useEffect(() => {
    if (!currentSelectedDocId) {
      initEditor(null);
      ejInstance.current.destroy();
      ejInstance.current = null;
    } else {
      const currentApplicationData = applicationData.filter(
        (application: any) =>
          application.docId === currentSelectedDocId &&
          application.workSpaceId === currentWorkspace
      );

      if (currentApplicationData.length > 0) {
        setEditorData(currentApplicationData[0].applicationSpecificicData);
        initEditor(currentApplicationData[0].applicationSpecificicData);
        dispatch(setEditorInitialised());
      } else {
        initEditor({
          id: 'Ef0oiN-VMW',
          type: 'paragraph',
          data: {
            text: 'SampleData',
          },
        });
        dispatch(setEditorInitialised());
      }

      workspace.workSpaceDocs.map((doc: any) => {
        if (workspace.currentSelectedDocId == doc.uuid) {
          setCurrentFileName(doc.name);
        }
      });
      setWorkspaceFiles(workspace.workSpaceDocs);
    }
  }, [ejInstance]);

  const checkForMentions = () => {
    const paraElements = document.querySelectorAll('.ce-paragraph');
    paraElements.forEach((paraElement) => {
      if (paraElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const regex3 = /\[(.*?)\]/g;
        const regex4 = /\*\*(.*?)\*\*/;
        const text = paraElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        const matches3 = text?.match(regex3);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span contenteditable="false" style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span contenteditable="false" style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        if (matches3) {
          matches3.forEach((match) => {
            const word = match.slice(1, -1);
            const matches4 = word.match(regex4);
            const regexnew = /\*\*(.*?)\*\*/g;
            const textWithoutAsterisks = word.replace(regexnew, '');
            let textBetweenAsterisks;
            if (matches4 && matches4.length > 1) {
              textBetweenAsterisks = matches4[1];
            }
            savedText = savedText?.replaceAll(
              match,
              `<span contenteditable="false" class="hyperLinkId" style="font-weight: 400; color: ${colorRef.current}; text-decoration: underline; cursor: pointer;"><span style="display: none;">[</span><span style="display: none;">**${textBetweenAsterisks}**</span>${textWithoutAsterisks}<span style="display: none;">]</span></span>`
            );
          });
        }
        paraElement.innerHTML = savedText;
      }
    });

    const headerElements = document.querySelectorAll('.ce-header');
    headerElements.forEach((headerElement) => {
      if (headerElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const regex3 = /\[(.*?)\]/g;
        const regex4 = /\*\*(.*?)\*\*/;
        const text = headerElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        const matches3 = text?.match(regex3);
        const matches4 = text?.match(regex4);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span contenteditable="false" style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span contenteditable="false" style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        if (matches3) {
          matches3.forEach((match) => {
            const word = match.slice(1, -1);
            const matches4 = word.match(regex4);
            const regexnew = /\*\*(.*?)\*\*/g;
            const textWithoutAsterisks = word.replace(regexnew, '');
            let textBetweenAsterisks;
            if (matches4 && matches4.length > 1) {
              textBetweenAsterisks = matches4[1];
            }
            savedText = savedText?.replaceAll(
              match,
              `<span contenteditable="false" class="hyperLinkId" style="font-weight: 400; color: ${colorRef.current}; text-decoration: underline; cursor: pointer;"><span style="display: none;">[</span><span style="display: none;">**${textBetweenAsterisks}**</span>${textWithoutAsterisks}<span style="display: none;">]</span></span>`
            );
          });
        }
        headerElement.innerHTML = savedText;
      }
    });
  };

  const initEditor = (dataPassed: any) => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: dataPassed,
      onReady: () => {
        ejInstance.current = editor;
        checkForMentions();
        const blockElements = document.getElementsByClassName('editorjsDiv');
        Array.from(blockElements).forEach((blockElement) => {
          blockElement.addEventListener('focusout', () => {
            // User finished editing the block
            checkForMentions();
          });
        });
      },
      onChange: async () => {
        ejInstance?.current
          ?.save()
          .then((outputData: any) => {
            setEditorData(outputData);
            dispatch(
              setApplicationData({
                workSpaceId: currentWorkspace,
                docId: currentSelectedDocId,
                type: 'editor',
                editorObject: outputData,
              })
            );
            return true;
          })
          .catch((error: any) => {
            console.error('Error while saving data:', error);
          });
      },
      autofocus: true,
      tools: EDITOR_JS_TOOLS,
    });
  };

  // console.log("WORKSPACEGOCIND", workspace)

  useEffect(() => {
    colorRef.current = `${color}75`;
    checkForMentions();
  }, [color]);

  const insertBlock = (opt: any, title: any, id: any) => {
    const blockTypes = Object.keys(ejInstance?.current?.configuration?.tools);
    const currentBlockIndex =
      ejInstance?.current?.blocks.getCurrentBlockIndex();
    if (opt && blockTypes.includes(opt) && currentBlockIndex >= -1) {
      ejInstance?.current?.blocks.insert(opt, currentBlockIndex + 1);
      setShowEditorOptionsBlock(false);
    }

    if (opt === 'listview') {
      const newId = uuidv4();
      const { currentSelectedDocId: currentSelectedDoc } = workspace;
      const listApptitle = `${opt}--${currentSelectedDoc}--${newId}`;
      dispatch(setCurrentSelectedUI('null'));
      setTimeout(() => {
        dispatch(setCurrentSelectedUI(listApptitle));
        dispatch(setSelectedOption('List View'));
        dispatch(
          addWorkSpaceApplications({
            workspace,
            type: 'listview',
            titleGenerated: listApptitle,
            newId,
          })
        );
      }, 1500);
    }
    if (opt === 'kanban') {
      const newId = uuidv4();
      const { currentSelectedDocId: currentSelectedDoc } = workspace;
      const kanbanApptitle = `${opt}--${currentSelectedDoc}--${newId}`;
      dispatch(setCurrentSelectedUI(''));
      setTimeout(() => {
        dispatch(setCurrentSelectedUI(kanbanApptitle));
        dispatch(setSelectedOption('Kanban View'));
        dispatch(
          addWorkSpaceApplications({
            workspace,
            type: 'kanban',
            titleGenerated: kanbanApptitle,
            newId,
          })
        );
      }, 1500);
    }

    if (opt === 'tableview') {
      const newId = uuidv4();
      const { currentSelectedDocId: currentSelectedDoc } = workspace;
      const TableApptitle = `${opt}--${currentSelectedDoc}--${newId}`;
      dispatch(setCurrentSelectedUI(''));
      setTimeout(() => {
        // alert(TableApptitle);
        dispatch(setCurrentSelectedUI(TableApptitle));
        dispatch(setSelectedOption('Table View'));
        dispatch(
          addWorkSpaceApplications({
            workspace,
            type: 'tableview',
            titleGenerated: TableApptitle,
            newId,
          })
        );
      }, 1500);
    }

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

    if (opt == 'file') {
      const blockIndex = ejInstance?.current?.blocks.getCurrentBlockIndex();
      if (blockIndex >= 0) {
        async function appendTextToBlock(blockIndex: any, title: any) {
          try {
            const savedData = await ejInstance?.current?.save();
            const currentData = savedData.blocks;
            const hyperlink = `<span contenteditable="false" class="hyperLinkId" style="font-weight: 400; color: ${colorRef.current}; text-decoration: underline; cursor: pointer;"><span style="display: none;">[</span><span style="display: none;">**${id}**</span>${title}<span style="display: none;">]</span></span>`;
            if (blockIndex >= 0 && blockIndex < currentData.length) {
              const targetBlock = currentData[blockIndex];
              targetBlock.data.text += ` ${hyperlink}`;

              ejInstance?.current?.render({ blocks: currentData });
              setShowEditorOptionsBlock(false);
              setTimeout(() => {
                checkForMentions();
              }, 100);
            }
          } catch (error) {
            console.error('Error occurred while appending text:', error);
          }
        }
        appendTextToBlock(blockIndex, title);
      }
    }
  };

  const removeSlash = (blockIndex: any) => {
      if (blockIndex >= 0) {
        async function removeSlashFromText(blockIndex: any) {
          try {
            const savedData = await ejInstance?.current?.save();
            const currentData = savedData.blocks;
            if (blockIndex >= 0 && blockIndex < currentData.length) {
              const targetBlock = currentData[blockIndex];
              // targetBlock.data.text += ` ${hyperlink}`;
              console.log("TARGET BLOCK TEXT IS", targetBlock.data.text)
              const modifiedText = targetBlock.data.text.slice(0, -1);
              targetBlock.data.text = modifiedText
              ejInstance?.current?.render({ blocks: currentData });
              setTimeout(() => {
                checkForMentions()
              }, 100)
            }
          } catch (error) {
            console.error('Error occurred while appending text:', error);
          }
        }
        removeSlashFromText(blockIndex);
      }
    }

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
    id,
    onItemsMouseEnter,
  }: any) {
    const blockIndex = ejInstance?.current?.blocks.getCurrentBlockIndex();
    return (
      <div
        style={style}
        onClick={(e) => {if(opt!="database" && opt!="document"){setShowEditorOptionsBlock(false)} removeSlash(blockIndex); setTimeout(() => {insertBlock(opt, title, id);}, 100)}}
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
    setShowEditorOptionsBlock(false);
    if (
      event.code === 'Slash' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      const { activeElement } = document;
      cursorRect.current = activeElement?.getBoundingClientRect();
      setShowEditorOptionsBlock(!showEditorOptionsBlock);
    }
  };

  useEffect(() => {
    if (showEditorOptionsBlock) {
      setTimeout(() => {
        setRender(true);
      }, 100);
      const targetDiv = document.getElementById('editorOptionBlockID');
      targetDiv?.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
    } else {
      setRender(false);
    }
  }, [showEditorOptionsBlock]);

  const solveRec = (x: any) => {
    if (x?.childOf != null) {
      const temp = workspace.workspaceFolders.find(
        (y: any) => y?.uuid === x?.childOf
      );
      console.log('asdfasfsad', temp);
      dispatch(setNavigationPath(temp));
      solveRec(temp);
    }
  };

  useEffect(() => {
    const hyperLinkDiv: any = document.querySelectorAll('.hyperLinkId');
    hyperLinkDiv.forEach((linkElement: any) => {
      if (linkElement) {
        const regex4 = /\*\*(.*?)\*\*/;
        const text = linkElement?.textContent;
        let fileId: any;
        const matches4 = text.match(regex4);
        if (matches4 && matches4.length > 1) {
          fileId = matches4[1];
        }
        let idOfWorkspace: any;
        let colorofWorkspace: any;
        let fileName: any;
        let workspaceName: any;
        let workFile: any;
        workspaceFiles.map((file: any) => {
          if (file.uuid == fileId) {
            idOfWorkspace = file.workSpaceUUID;
            fileName = file.name;
            workFile = file;
          }
        });

        console.log('WORKSPACE ITEMS', workspaceFiles);

        workspaceItems.map((item: any) => {
          if (idOfWorkspace == item.uuid) {
            colorofWorkspace = item.color;
            workspaceName = item.name;
          }
        });
        if (fileId && idOfWorkspace && colorofWorkspace) {
          linkElement?.addEventListener('click', () => {
            dispatch(setCurrentSelectedDocument({ id: null }));
            setTimeout(() => {
              dispatch(
                setCurrentSelectedDocument({
                  uuid: fileId,
                  workSpaceUUID: idOfWorkspace,
                })
              );
              dispatch(
                setNodeIDs({ uuid: fileId, workSpaceUUID: idOfWorkspace })
              );
              dispatch(setCurrentSelectedUI(''));
              dispatch(setSelectedOption('Editor'));
              dispatch(changeColor({ color: colorofWorkspace }));
              dispatch(setNavigationPath(null));
              dispatch(setNavigationPath({ name: fileName }));
              solveRec(workFile);
              dispatch(setNavigationPath({ name: workspaceName }));
            }, 1000);
          });
        }
      }
    });
  });

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

  return (
    <div className="editor">
      {coverUrlAvailable ? (
        <div
          style={{
            backgroundImage: `url(${coverUrl})`,
          }}
          className="editorCover"
        >
          <div
            style={{
              position: 'relative',
              left: '81%',
              marginTop: "15px",
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

      {iconAvailable ? (
        coverUrlAvailable ? (
          <div
            style={{
              position: 'relative',
              bottom: '30px',
              display: 'flex',
              width: '700px',
              alignItems: 'end',
              marginRight: '125px',
            }}
          >
            <div className="editorIcon">
              <img src={iconUrl} />
            </div>
            <div
              style={{
                fontSize: '23px',
                fontWeight: '400',
                height: 'fit-content',
              }}
            >
              {currentFileName}
            </div>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              bottom: '0px',
              display: 'flex',
              width: '700px',
              alignItems: 'center',
              marginRight: '125px',
              marginBottom: '40px',
            }}
          >
            <div className="editorIcon">
              <img src={iconUrl} />
            </div>
            <div
              style={{
                fontSize: '25px',
                fontWeight: '400',
                height: 'fit-content',
              }}
            >
              {currentFileName}
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            fontSize: '14px',
            fontWeight: '500',
            marginRight: '810px',
            marginTop: '60px',
            display: 'flex',
            width: 'fit-content',
            color: '#333539',
            cursor: 'pointer',
            marginBottom: "20px"
          }}
        >
          <div onClick={(e) => setIconAvailable(true)} style={{ marginRight: '10px' }}>
            <AddIcon />
          </div>
          Add Icon
        </div>
      )}

      <div className="editorjsDiv" id={EDITTOR_HOLDER_ID} />

      {showEditorOptionsBlock && (
        <div
          id="editorOptionBlockID"
          style={{
            top: `${
              coverUrlAvailable
                ? cursorRect?.current.bottom > 750
                  ? '300'
                  : cursorRect?.current?.bottom - 140
                : cursorRect.current.bottom > 650
                ? '360'
                : cursorRect?.current?.bottom - 140
            }px`,
            right: `${
              cursorRect?.current.bottom > 750
                ? '450'
                : cursorRect?.current?.left
            }px`,
          }}
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
  );
}
export default EditorWrapper;
