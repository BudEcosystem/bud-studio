import React, { useEffect, useRef, useState } from 'react';
import './Editor.css';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Link from '@editorjs/link';
import CheckList from '@editorjs/checklist';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import List from '@editorjs/list';
import Raw from '@editorjs/raw';
import Code from '@editorjs/code';
import Embed from '@editorjs/embed';
import Strikethrough from '@sotaproject/strikethrough';
import { useSelector } from 'react-redux';
import TextAlign from '@canburaks/text-align-editorjs';
import Header from '@editorjs/header';
import { BlockList } from 'net';
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

function Editor() {
  const [coverUrl, setCoverUrl] = useState();
  const [coverUrlAvailable, setCoverUrlAvailable] = useState(true);
  const [iconUrl, setIconUrl] = useState();
  const { workspace }: any = useSelector((state) => state);
  const [showEditorOptionsBlock, setShowEditorOptionsBlock] = useState(false);
  const { color } = workspace;
  // const Header = require("editorjs-header-with-alignment");
  const editor1 = useRef<EditorJS>();
  const editor2 = useRef<EditorJS>();
  const [render, setRender] = useState(false);
  const cursorRect = useRef<DOMRect>();
  const refHoverBar = useRef();
  const colorRef = useRef<any>('#9068fd');
  const [subHeadingContent, setSubHeadingContent] = useState(
    'Philosophy, Life, Misc'
  );
  const [showDatabaseOptions, setShowDatabaseOptions] = useState(false)
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

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    editor1.current = new EditorJS({
      holder: 'editorjs',
      onReady: () => {},
      onChange: () => {
        editor1?.current
          ?.save()
          .then((outputData) => {
            console.log('HEADING DATA', outputData);
          })
          .catch((error) => {
            console.error('Error while saving data:', error);
          });
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        underline: Underline,
        strikethrough: Strikethrough,
        textAlign: TextAlign,
      },
      data: {
        blocks: [
          {
            type: 'header',
            data: {
              text: 'How to evolve into a super human with your digital mind place',
            },
          },
        ],
      },
    });

    editor2.current = new EditorJS({
      holder: 'editorjs2',
      autofocus: true,
      placeholder: 'Add a new block...',
      onReady: () => {
        checkForMentions();
        const blockElements = document.getElementsByClassName('editorjsPara');
        Array.from(blockElements).forEach((blockElement) => {
          blockElement.addEventListener('focusout', () => {
            // User finished editing the block
            checkForMentions();
          });
        });
      },
      onChange: () => {
        editor2?.current
          ?.save()
          .then((outputData) => {
            console.log('PARAGRAPH DATA', outputData);
          })
          .catch((error) => {
            console.error('Error while saving data:', error);
          });
      },
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
        textAlign: TextAlign,
      },
      data: {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: 'Lorem ipsum dolor @govind sit amet, #consectetur adipiscing elit, sed @rahul do eiusmod tempor #incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. ',
            },
          },
        ],
        version: '2.11.10',
      },
    });

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
                `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${colorRef.current};"><span style="display: none;">#</span>${word}</span>`
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
  }, []);

  // useEffect(() => {
  //   colorRef.current.value = color
  // },[color])

  const insertBlock = (opt: any) => {
    const blockTypes = Object.keys(editor2?.current?.configuration?.tools);
    const currentBlockIndex = editor2?.current?.blocks.getCurrentBlockIndex();
    if (opt && blockTypes.includes(opt) && currentBlockIndex) {
      editor2?.current?.blocks.insert(opt, currentBlockIndex + 3);
      setShowEditorOptionsBlock(false);
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
  const onItemsMouseEnter = (e: any) => {
    const top = e.currentTarget.offsetTop + 10;
    refHoverBar.current.style.transform = `translateY(${top}px)`;
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

  editor2.current?.isReady.then(() => {
    const { activeElement } = document;
    cursorRect.current = activeElement?.getBoundingClientRect();
  });

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
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${color};"><span style="display: none;">#</span>${word}</span>`
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
              `<span style="padding-left: 5px; padding-right: 5px; border-radius: 5px; color: white;background-color: ${color};"><span style="display: none;">#</span>${word}</span>`
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

  const handleSubHeadingChange = (event: any) => {
    setSubHeadingContent(event.target.innerHTML);
  };

  const style = { '--bg-color': color };

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
          <div className="editorIcon">
            <img src={iconUrl} />
          </div>
        ) : (
          <div style={{ top: '10px' }} className="editorIcon">
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

      <div style={style} className="editorHeadingDiv">
        <div className="editorjsHeading" id="editorjs" />
      </div>

      <div
        onBlur={handleSubHeadingChange}
        dangerouslySetInnerHTML={{ __html: subHeadingContent }}
        contentEditable
        className="editorjsSubHeading"
      />

      <div className="editorParaDiv">
        <div className="editorjsPara" id="editorjs2" />
        <div className="editorMoreOptions">
          <div
            onClick={(e) => setShowEditorOptionsBlock(!showEditorOptionsBlock)}
            style={{ marginTop: '2px', cursor: 'pointer', marginRight: '20px' }}
          >
            <Plus />
          </div>{' '}
          Press “<div style={{ color: 'white' }}>@</div>” for bud , “
          <div style={{ color: 'white' }}>/</div>” for editor blocks.
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
      </div>
    </div>
  );
}

export default Editor;
