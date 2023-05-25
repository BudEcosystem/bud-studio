/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './tools';
import './Editor.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setApplicationData,
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
  FileIcon
} from './EditorIcons';

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

function EditorWrapper({ data, setCurrentSelectedUI }: any) {
  const ejInstance = useRef();
  const editor1 = useRef<EditorJS>();
  const [editorData, setEditorData] = useState(null);
  const [coverUrl, setCoverUrl] = useState();
  const [coverUrlAvailable, setCoverUrlAvailable] = useState(true);
  const [iconUrl, setIconUrl] = useState();
  const { tree, workspace }: any = useSelector((state) => state);
  const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(false);
  console.log('###################################', workspace);
  const { color, currentWorkspace, currentSelectedDocId } = workspace;
  const [render, setRender] = useState(false);
  const cursorRect = useRef<DOMRect>();
  const refHoverBar = useRef();
  const colorRef = useRef<any>('#9068fd');
  const dispatch = useDispatch();
  const [subHeadingContent, setSubHeadingContent] = useState(
    'Edit Subheading here...'
  );
  const [showDatabaseOptions, setShowDatabaseOptions] = useState(false);
  const [showDocumentOptions, setShowDocumentOptions] = useState(false);
  const [showFirstOptions, setShowFirstOptions] = useState(true);
  const [workspaceFiles,setWorkspaceFiles] = useState(workspace.workSpaceDocs)
  const [currentFileName, setCurrentFileName] = useState(workspace.currentSelectedDocId)

  const [editorOptions, setEditorOptions] = useState([
    {
      key: 'database',
      icon: <TableIcon />,
      title: 'Database',
      subTitle: 'Add List, Kanban or Gantt Chart',
    },
    {
      key: 'document',
      icon: <ListIcon />,
      title: 'Link Document',
      subTitle: 'Link to another document',
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
  // for checking if the particular editor has somedata
  useEffect(() => {
    const {
      currentWorkspace: copycurrentWorkspace,
      currentSelectedDocId: copycurrentSelectedDocId,
      applicationData,
      editorInitialised,
    } = workspace;
    const currentApplicationData = applicationData.filter(
      (application: any) =>
        application.docId === copycurrentSelectedDocId &&
        application.workSpaceId === copycurrentWorkspace
    );
    console.log(
      '################################### - outer',
      currentApplicationData
    );
    if (currentApplicationData.length > 0) {
      console.log(
        '################################### - else',
        currentApplicationData
      );
      setEditorData(currentApplicationData[0].applicationSpecificicData);
      !editorInitialised &&
        initEditor(currentApplicationData[0].applicationSpecificicData);
      dispatch(setEditorInitialised());
    } else {
      // setEditorData(null);
      !editorInitialised &&
        initEditor({
          id: 'Ef0oiN-VMW',
          type: 'paragraph',
          data: {
            text: 'SampleData',
          },
        });
      dispatch(setEditorInitialised());
    }
    if (!currentSelectedDocId) {
      initEditor(null);
      ejInstance.current?.destroy();
      ejInstance.current = null;
    }
    setCurrentFileName(workspace.currentSelectedDocId);
    setWorkspaceFiles(workspace.workSpaceDocs)
  }, [workspace, ejInstance]);

  // This will run only once
  // useEffect(() => {
  //   if (!ejInstance.current) {
  //     initEditor();
  //   }
  //   return () => {
  //     ejInstance.current?.destroy();
  //     ejInstance.current = null;
  //   };
  // }, []);

  const checkForMentions = () => {
    const paraElements = document.querySelectorAll('.ce-paragraph');
    paraElements.forEach((paraElement) => {
      if (paraElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = paraElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current}75;"><span style="display: none;">#</span>${word}</span>`
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
        const text = headerElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        headerElement.innerHTML = savedText;
      }
    });

    const listElements = document.querySelectorAll('.cdx-list__item');
    listElements.forEach((listElement) => {
      if (listElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = listElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        listElement.innerHTML = savedText;
      }
    });

    const quoteElements = document.querySelectorAll('.cdx-quote__text');
    quoteElements.forEach((quoteElement) => {
      if (quoteElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = quoteElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        quoteElement.innerHTML = savedText;
      }
    });

    const checkListElements = document.querySelectorAll(
      '.cdx-checklist__item-text'
    );
    checkListElements.forEach((checkListElement) => {
      if (checkListElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = checkListElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        checkListElement.innerHTML = savedText;
      }
    });
  };

  console.log('TREE', tree);
  console.log('WORSPACE EDITOR', workspace);

  const initEditor = (dataPassed) => {
    console.log('###################################- initEditoe', editorData);
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
            console.log('HEADING DATA', outputData);
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

  useEffect(() => {
    const paraElements = document.querySelectorAll('.ce-paragraph');
    paraElements.forEach((paraElement) => {
      if (paraElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = paraElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${color}75;"><span style="display: none;">#</span>${word}</span>`
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
        const text = headerElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replace(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replace(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${color}75;"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        headerElement.innerHTML = savedText;
      }
    });

    const listElements = document.querySelectorAll('.cdx-list__item');
    listElements.forEach((listElement) => {
      if (listElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = listElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        listElement.innerHTML = savedText;
      }
    });

    const quoteElements = document.querySelectorAll('.cdx-quote__text');
    quoteElements.forEach((quoteElement) => {
      if (quoteElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = quoteElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        quoteElement.innerHTML = savedText;
      }
    });

    const checkListElements = document.querySelectorAll(
      '.cdx-checklist__item-text'
    );
    checkListElements.forEach((checkListElement) => {
      if (checkListElement) {
        const regex = /@(\w+)/g;
        const regex2 = /#(\w+)/g;
        const text = checkListElement?.textContent;
        let savedText = text;
        const matches = text?.match(regex);
        const matches2 = text?.match(regex2);
        if (matches) {
          matches.forEach((match) => {
            const word = match.slice(1); // Remove the "@" symbol
            // Apply styling to the matched text
            savedText = savedText?.replaceAll(
              match,
              `<span style="color: white;">@${word}</span>`
            );
          });
        }
        if (matches2) {
          matches2.forEach((match) => {
            const word = match.slice(1);
            savedText = savedText?.replaceAll(
              match,
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
            );
          });
        }
        checkListElement.innerHTML = savedText;
      }
    });
  }, [color]);

  useEffect(() => {
    colorRef.current = `${color}75`;
  }, [color]);

  const addHyperLink = (ele: any, title: any) => {
    let childDiv = document.createElement('span');
    childDiv.textContent = `${title} `;
    childDiv.style.backgroundColor = `${colorRef.current}`;
    childDiv.style.color = 'white';
    childDiv.style.textDecoration = 'underline';
    childDiv.style.cursor = 'pointer';
    const x = ele.innerHTML;
    console.log("INNER HTML", x)
    let targetElement = ele.querySelector('h2, p');
    targetElement.appendChild(childDiv)

    }

    const goToHyperLink = () => {
        
    }

  const insertBlock = (opt: any, title: any) => {
    const blockTypes = Object.keys(ejInstance?.current?.configuration?.tools);
    const currentBlockIndex =
      ejInstance?.current?.blocks.getCurrentBlockIndex();
    console.log('CURRENT BLOCK INDEX', currentBlockIndex);
    if (opt && blockTypes.includes(opt) && currentBlockIndex != -1) {
      ejInstance?.current?.blocks.insert(opt, currentBlockIndex + 1);
      setShowEditorOptionsBlock(false);
    }
    // if (opt && blockTypes.includes(opt) && currentBlockIndex == -1) {
    //   ejInstance?.current?.isReady.then(() => {
    //     ejInstance?.current?.saver
    //       .save()
    //       .then((savedData) => {
    //         const blockCount = savedData.blocks.length;
    //         console.log('Number of blocks:', blockCount);
    //         ejInstance?.current?.blocks.insert(opt, blockCount + 2);
    //         setShowEditorOptionsBlock(false);
    //       })
    //       .catch((error) => {
    //         console.error('Error getting block count:', error);
    //       });
    //   });
    // }

    if (opt == 'listview') {
      setCurrentSelectedUI('listview');
    }
    if (opt == 'kanban') {
      setCurrentSelectedUI('kanban');
    }
    if (opt == 'database') {
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
          subTitle: 'Coming soon',
        },
      ]);
      setShowDatabaseOptions(true);
      setShowFirstOptions(false);
    }
      if(opt=="document") {
        const listofFiles:any = []
        workspaceFiles.map((file: any) => {
          console.log(file.name)
          let obj = {key: 'file', icon: <FileIcon/>,title: file.name, subTitle: `Link ${file.name} to this block`}
          listofFiles.push(obj)
        })
          setEditorOptions(listofFiles)
          setShowDocumentOptions(true)
          setShowFirstOptions(false)
      }

    if(opt=="file") {
      const blockElements = document.getElementsByClassName('editorjsDiv');
      // Array.from(blockElements).forEach((blockElement) => {
      //   blockElement.addEventListener('focus', (event) => {
      //     const ele = event?.target?.closest('.ce-block');
      //     if (ele) {
      //       addHyperLink(ele, title)
      //     }
      //   });
      // });
      const blockIndex = ejInstance?.current?.blocks.getCurrentBlockIndex();
      if(currentBlockIndex >=0)
      {
        async function appendTextToBlock(blockIndex, title) {
          try {
            const savedData = await ejInstance?.current?.save();
            const currentData = savedData.blocks;
            const hyperlink = `<span onClick={${goToHyperLink}} style="font-weight: 400; color: ${colorRef.current}; text-decoration: underline; cursor: pointer;">${title}</span>`
        
            if (blockIndex >= 0 && blockIndex < currentData.length) {
              const targetBlock = currentData[blockIndex];
              targetBlock.data.text += ` ${hyperlink}`;
        
              ejInstance?.current?.render({ blocks: currentData });
              setShowEditorOptionsBlock(false)
            }
          } catch (error) {
            console.error('Error occurred while appending text:', error);
          }
        }
        appendTextToBlock(blockIndex, title);
      }
    }
  };

  useEffect(() => {
    if(showEditorOptionsBlock) {
      
    }
  }, [showEditorOptionsBlock])

  const style = { '--bg-color': color };
  // document.addEventListener('click', handleClickOutside);

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
        onClick={(e) => insertBlock(opt, title)}
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

  const { activeElement } = document;
  cursorRect.current = activeElement?.getBoundingClientRect();

  useEffect(() => {
    if (showFirstOptions == true) {
      setEditorOptions([
        {
          key: 'database',
          icon: <TableIcon />,
          title: 'Database',
          subTitle: 'Add List, Kanban or Gantt Chart',
        },
        {
          key: 'document',
          icon: <ListIcon />,
          title: 'Link Document',
          subTitle: 'Link to another document',
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
    }
  }, [showFirstOptions]);

  return (
    <div className="editor">
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
          <div style={{position: "relative", bottom:"30px", display: "flex", width: "700px", alignItems: "end", marginRight: "225px"}}>
          <div className="editorIcon">
            <img src={iconUrl} />
          </div>
          <div style={{fontSize: "23px", fontWeight: "400", height: "fit-content"}}>{currentFileName}</div>
          </div>
        ) : (
          <div style={{position: "relative", bottom:"0px", display: "flex", width: "700px", alignItems: "center", marginRight: "225px", marginBottom: "40px"}}>
          <div className="editorIcon">
            <img src={iconUrl} />
          </div>
          <div style={{fontSize: "25px", fontWeight: "400", height: "fit-content"}}>{currentFileName}</div>
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

      <div className="editorjsDiv" id={EDITTOR_HOLDER_ID} />

      {showEditorOptionsBlock && (
        <div
        id="editorOptionBlockID"
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
            right: `${cursorRect?.current?.bottom > 650 ? '160' : '120'}px`,
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
              Go Back
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
