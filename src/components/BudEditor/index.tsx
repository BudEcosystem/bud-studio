import React, { useState } from 'react';
import { DragOutlined } from '@ant-design/icons';
import Block from './block';
import Action from './action';
import classes from './popup.module.css';

function App() {
  const CMD_KEY = '/';
  const MENU_WIDTH = 259;
  const MENU_HEIGHT = 270;

  const [html, setHtml] = useState({
    time: 1684960911998,
    blocks: [
      {
        id: 'l98dyx3yjb',
        type: 'header',
        data: {
          text: 'Key features',
          level: 3,
        },
      },
      {
        id: 'mhTl6ghSkV',
        type: 'paragraph',
        data: {
          text: 'Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓',
        },
      },
      {
        id: 'ksCokKAhQw',
        type: 'paragraph',
        data: {
          text: "Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, <mark class='cdx-marker'>Editor.js outputs JSON object</mark> with data of each Block.",
        },
      },
      {
        id: 'ksCokKAfhQw',
        type: 'paragraph',
        data: {
          text: "",
        },
      },
      {
        id: 'ksCokKAdffhQw',
        type: 'kanban',
        data: {
          text: "",
        },
      },
    ],
  });
  const [x, setX] = useState(30);
  const [y, setY] = useState(30);
  const [showPop, setShowPop] = useState(false);

  const handleChange = (e, value, uuid) => {
    // e.preventDefault();
    const tempState = html;

    console.log('Request For Update', value, uuid);

    // const updatedData = updateBlockHtml(tempState.blocks, uuid, value);
    // setHtml({
    //   blocks: updatedData,
    // });

    // setHtml(evt.target.value);
  };

  // Caret
  const getCaretCoordinates = (fromStart = true) => {
    let x;
    let y;
    const isSupported = typeof window.getSelection !== 'undefined';
    if (isSupported) {
      const selection = window.getSelection();
      console.log('Selection', selection);
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(!!fromStart);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    return { x, y };
  };

  const addBlock = () => {
    const tempState = html;

    tempState.blocks.push({
      html: '<b>Hello <i>World</i></b>',
      uuid: html.blocks.length,
    });

    // const updatedData = updateBlockHtml(tempState.blocks, uuid, value);
    setHtml(tempState);
  };

  const handleKeyDown = (e) => {
    setShowPop(false);

    // Enter -> New Block

    if (e.key === CMD_KEY) {
      // console.log('Actions Triggered!!!');

      // // Get Caret Position
      // console.log('Caret Location', getCaretCoordinates());
      // const { x, y } = getCaretCoordinates();

      // console.log('Width', x - MENU_WIDTH / 2);
      // console.log('Height', y - MENU_HEIGHT - 10);

      // setX(x - MENU_WIDTH / 2);
      // setY(y - MENU_HEIGHT - 10);

      const { x: endX, y: endY } = getCaretCoordinates(false); // fromEnd
      const { x: startX, y: startY } = getCaretCoordinates(true); // fromStart
      const middleX = startX + (endX - startX) / 2;
      console.log('XY', { x: middleX, y: startY });
      console.log('XYX', { middleX, startY });

      // setX(middleX - MENU_WIDTH);
      // setY(startY - startY / 2 + 15);

      // setX(middleX);
      // setY(startY);

      setShowPop(true);
    } else if (e.key === 'Enter') {
      addBlock();
    }
  };

  function updateBlockHtml(blocks, uuid, newHtml) {
    const updatedBlocks = blocks.map((block) => {
      if (block.uuid === uuid) {
        return { ...block, html: newHtml };
      }
      return block;
    });

    return updatedBlocks;
  }

  return (
    <>
      <div className={classes['bud-editor-container']}>
        {html.blocks.map((b) => {
          return (
            <div className="bud-block">
              {/* <div className="bud-handler">
                <DragOutlined rev={undefined} />
              </div> */}
              <Block
                key={b.id}
                data={b}
                handleChange={(e) => handleChange(e, e.target.value, b.id)}
                handleKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          );
        })}
      </div>

      {showPop && <Action top={y} left={x} />}
    </>
  );
}

export default App;
