import React, { useEffect, useState } from "react";
import PanelOption from "./PanelOption/PanelOption";
import {
  Pin,
  Bookmark,
  FullScreen,
  Reload,
  Add,
  UpArrow,
  DownArrow
} from "./PanelOption/PanelSvgIcons";
import ButtonComponent from "./Button/Button";

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

const Panel = () => {
  const items = [
    { id: 1, icon: <Pin />, name: "Pin Tab", desc: "Pin in the current tab" },
    { id: 2, icon: <Bookmark />, name: "Bookmark", desc: "Create a bookmark" },
    { id: 3, icon: <FullScreen />, name: "FullScreen", desc: "Make the page fullscreen" },
    { id: 4, icon: <Reload />, name: "Reload", desc: "Reload the page" },
  ]
  const items2 = [
    { id: 5, icon: <Add />, name: "Create New Task", desc: "" },
    { id: 6, icon: <Add />, name: "Create Note", desc: "" },
    { id: 7, icon: <Add />, name: "Create Add member", desc: "" },
  ]

  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (items.length + items2.length && downPress) {
      setCursor((prevState) =>
        prevState < items.length + items2.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (items.length + items2.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (items.length && enterPress) {
      const itemsArr = [...items, ...items2]
      setSelected(itemsArr[cursor]);
      console.log(itemsArr[cursor])
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(hovered.id - 1);
    }
  }, [hovered]);
  return (
    <div className="Panel">
      <div className="PanelResults">482 results</div>

      <div className="PanelOptions">
        {items.map((item, i) => (
          <PanelOption key={item.id} active={i === cursor} item={item} setSelected={setSelected} setHovered={setHovered} />
        ))}
      </div>
      <div className="line"></div>
      <div className="action">Quick actions</div>
      <div className="PanelOptions">
        {items2.map((item, i) => (
          <PanelOption key={item.id} active={i + items.length === cursor} item={item} setSelected={setSelected} setHovered={setHovered} />
        ))}
      </div>
      <div className="bottomSuggestionContainer">
        <div className="btnContainer">
          <ButtonComponent name="Apps" />
          <ButtonComponent name="Peoples" />
          <ButtonComponent name="Files" />
          <ButtonComponent name="Commands" />
        </div>
        <div>
          <p className="bottomSuggestionText">Use arrow keys  <span className="arrowDiv">{<UpArrow />}</span> <span className="arrowDiv">{<DownArrow />}</span>  to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default Panel;
